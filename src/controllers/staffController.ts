import { Request, Response } from "express";
import { Staff } from "../models/Staff";

// Create Staff
export const createStaff = async (req: Request, res: Response) => {
  const { name, role, department, phone,email  } = req.body;
  // console.log(req.body);

  const existingStaff = await Staff.find({ name });

  const existingStaffWithEmail = await Staff.findOne({ email });

if (existingStaffWithEmail) {
   res.status(400).json({
    message: "Staff with this email address already exists",
    success: false,
  });
}
try{

  const newStaff = await Staff.create({
    name,
    role,
    department,
    contact: { 
      email: email || undefined, // Handle cases where email might be optional
      phone,
    },
  });
  if (newStaff) {
    res.status(200).json({
      success: true,
      message: "Succesfully created new Staff",
    });
  } 
  else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}catch(err:any){
  if (err.code === 11000 && err.keyPattern && err.keyPattern['contact.email']) {
     res.status(400).json({
      success: false,
      message: "Staff with this email address already exists",
    });
  }
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

