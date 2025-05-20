import express from "express";
import { createStaff } from "../controllers/staffController";

const router = express.Router();

router.post("/addstaff",createStaff);

export default router;
