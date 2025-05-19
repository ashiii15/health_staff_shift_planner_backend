import mongoose, { Document, Schema, Model } from "mongoose";

// Define the interface for Staff documents
export interface StaffDocument extends Document {
  _id: string;
  name: string;
  role: string;
  department: string;
    phone: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Staff collection
const staffSchema = new Schema<StaffDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
      phone: { type: String, required: true }
  },
  {
    timestamps: true 
  }
);

// Create the model
export const Staff: Model<StaffDocument> = mongoose.model<StaffDocument>("Staff", staffSchema);
