import mongoose, { Document, Schema, Model } from "mongoose";

interface Contact {
  email?: string; // Make it optional if truly needed, but consider making it required
  phone?: string;
}
// Define the interface for Staff documents
export interface StaffDocument extends Document {
  _id: string;
  name: string;
  role: string;
  department: string;
  contact: Contact;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the Staff collection
const staffSchema = new Schema<StaffDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    contact: {
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
      phone: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
export const Staff: Model<StaffDocument> = mongoose.model<StaffDocument>(
  "Staff",
  staffSchema
);
