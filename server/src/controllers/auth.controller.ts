import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { College } from '../models/college.js';
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '7d',
  });
};

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, college } = req.body;

  // 1. Validation
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(409, "User with email already exists");
  }

  // 3. Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. COLLEGE LOGIC (The Fix 🛠️)
  // Agar user ne college provide kiya hai, to College stats update karo
  if (college) {
    await College.findOneAndUpdate(
      { name: college }, // Naam se dhoondo
      {
        $inc: { 
          studentCount: 1,   // Ek student badhao
          totalElo: 1200     // Default User ELO (1200) college ke total mein jodo
        }
      },
      { upsert: true, new: true } // Upsert: True (Agar college nahi exist karta, to create kar do)
    );
  }

  // 5. Create User
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    college: college || null, 
    rating: 1200, // Explicitly default set kar rahe hain clarity ke liye
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // 6. Send Response
  return res.status(201).json(
    new ApiResponse(
      201, 
      { 
        user: createdUser, 
        token: generateToken(user._id.toString()) // .toString() safe side ke liye
      }, 
      "User registered successfully"
    )
  );
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Username and password is required");
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isMatch = await bcrypt.compare(password, user.password || '');
  if (!isMatch) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  return res.status(200).json(
    new ApiResponse(200, { user: loggedInUser, token: generateToken(user.id) }, "User logged In Successfully")
  );
});

// Get current authenticated user
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  // req.user is set by auth middleware
  const userId = (req as any).user?.id;

  if (!userId) {
    throw new ApiError(401, "Not authorized");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { user }, "User fetched successfully")
  );
});