import express from "express";
import { createStaff, getStaffDetails } from "../controllers/staffController";

const router = express.Router();

router.post("/addstaff",createStaff);
router.get("/staff",getStaffDetails);


export default router;
