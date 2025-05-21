import mongoose from "mongoose";
import { Staff } from "./models/Staff"; // adjust the path if needed

const dropIndex = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/staffshift"); // update DB name if different
    console.log("Connected to MongoDB");

    await Staff.collection.dropIndex("contact.email_1");
    console.log("Index 'contact.email_1' dropped successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error dropping index:", error);
  }
};

dropIndex();
