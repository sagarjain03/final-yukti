import mongoose, { Document, Schema } from 'mongoose';

// 1. Interface Define karein (Type Safety ke liye)
export interface ICollege extends Document {
  name: string;
  totalElo: number;      
  studentCount: number;  
  location?: string;  
  createdAt: Date;
  updatedAt: Date;
}