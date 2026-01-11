import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMatch extends Document {
  roomId: string;
  problemId: Types.ObjectId; // Problem ka ID
  players: Types.ObjectId[]; // Users ki IDs ka array
  winner: Types.ObjectId | null; // Null ho sakta hai agar Draw ho ya match chal raha ho
  status: 'ONGOING' | 'COMPLETED' | 'DRAW'; // Sirf ye 3 values allow hongi
  winningCode?: string; // Optional field (?)
  createdAt: Date;
  updatedAt: Date;
}