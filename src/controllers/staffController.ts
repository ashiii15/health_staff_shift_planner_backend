import { Request, Response } from "express";
import mongoose from "mongoose";
import { Staff, StaffDocument } from "../models/Staff";

// Create Staff
export const createStaff = async (req: Request, res: Response) => {
  const { name, role, department,phone } = req.body;

  try {
    const newStaff = await Staff.create({
      name,
      role,
      department,
      phone,
    });

    res.status(200).json({
      success: true,
      message: "Successfully created new staff member",
      data: newStaff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

