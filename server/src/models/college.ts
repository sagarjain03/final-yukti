import mongoose, { Document, Schema } from 'mongoose';
import type { ICollege } from "../interfaces/Icollege.js";



const collegeSchema = new Schema<ICollege>(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ek naam ka ek hi college hoga
      trim: true
    },
    totalElo: {
      type: Number,
      default: 0, 
      index: true // Sorting fast karne ke liye (Leaderboard ke liye zaroori)
    },
    studentCount: {
      type: Number,
      default: 0
    },
    location: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// 3. Model Export karein
export const College = mongoose.model<ICollege>('College', collegeSchema);