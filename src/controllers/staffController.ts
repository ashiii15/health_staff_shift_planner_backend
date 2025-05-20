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
    contact: { // Create the contact object
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
