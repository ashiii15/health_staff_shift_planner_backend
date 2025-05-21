import { Request, Response } from "express";
import { Staff } from "../models/Staff";

export const createStaff = async (req: Request, res: Response) => {
  try {
    console.log("Received data:", req.body);

    const { name, role, department, phone, email } = req.body;

    if (!name || !role || !department || !phone || !email) {
       res.status(400).json({ message: "All fields are required" });
    }

    const newStaff = new Staff({ name, role, department, phone, email });
    await newStaff.save();

     res.status(201).json({
      message: "Staff added successfully",
      staff: newStaff,
    });
  } catch (error: any) {
    console.error("Error in createStaff:", error);
     res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get staff
export const getStaffDetails = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const staffDetails = await Staff.find().skip(skip).limit(limit);

    const totalDocuments = await Staff.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    const results = {
      data: staffDetails,
      pageCount: totalPages,
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
