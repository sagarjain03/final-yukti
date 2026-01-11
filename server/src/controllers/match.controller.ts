import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { Match } from '../models/match.js'; // Ensure filename casing matches your system
import { User } from '../models/User.js';
import { College } from '../models/college.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

// Constants for scoring
const WIN_POINTS = 10;
const PARTICIPATION_POINTS = 0; // Agar haarne wale ko kuch dena ho to yahan change karein

// @desc    Record a completed match
// @route   POST /api/matches/complete
// @access  Private
export const completeMatch = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { roomId, problemId, winnerId, players, code } = req.body;

  // 1. Match History Create karo
  const match = await Match.create({
    roomId,
    problemId,
    players,  // Array of User IDs [id1, id2]
    winner: winnerId,
    status: 'COMPLETED',
    winningCode: code
  });

  // 2. Winner Logic (User Stats + College Stats Update) 🏆
  if (winnerId) {
    // A. Winner User ko update karo (ELO badhao!)
    const winner = await User.findByIdAndUpdate(
      winnerId,
      { 
        $inc: { 
          matchesWon: 1, 
          matchesPlayed: 1, 
          elo: WIN_POINTS // 👈 Important: ELO badhega tabhi rank badhegi
        } 
      },
      { new: true } // Updated user wapas milega taaki hum college check kar sakein
    );

    // B. Agar Winner kisi College ka hai, to College ka score bhi badhao
    if (winner?.college) {
      await College.findOneAndUpdate(
        { name: winner.college },
        { $inc: { totalElo: WIN_POINTS } } // College ko bhi points do
      );
    }
  }

  // 3. Losers Logic (Sirf Played badhao) 😢
  const losers = players.filter((id: string) => id !== winnerId);
  
  if (losers.length > 0) {
    await User.updateMany(
      { _id: { $in: losers } },
      { 
        $inc: { 
            matchesPlayed: 1,
            // elo: -5 // Optional: Agar haarne par points kaatne hain to ye uncomment karo
        } 
      }
    );
  }

  res.status(201).json({
    success: true,
    data: match
  });
});

// @desc    Get User Match History
// @route   GET /api/matches/history
export const getMyHistory = asyncHandler(async (req: AuthRequest, res: Response) => {
    const matches = await Match.find({ players: req.user?.id })
        .populate('winner', 'username') // Winner ka naam dikhane ke liye
        .populate('problemId', 'title') // Problem title dikhane ke liye
        .sort({ createdAt: -1 }); // Latest pehle

    res.status(200).json({ success: true, data: matches });
});