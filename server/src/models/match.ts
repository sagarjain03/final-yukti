import type { IMatch } from "../interfaces/Imatch.js";
import mongoose, { Schema } from "mongoose";
// 2. Mongoose Schema
const matchSchema = new Schema<IMatch>(
  {
    roomId: {
      type: String,
      required: true,
      unique: true 
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    winner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['ONGOING', 'COMPLETED', 'DRAW'],
      default: 'ONGOING',
    },
    winningCode: {
      type: String,
      default: '', 
    },
  },
  { timestamps: true } 
);

// 3. Model Export
export const Match = mongoose.model<IMatch>('Match', matchSchema);