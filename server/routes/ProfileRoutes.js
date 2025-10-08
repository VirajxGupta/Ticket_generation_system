import express from "express";
import { updateProfile, getProfile } from "../controllers/ProfileController.js";

const router = express.Router();

router.post("/updateProfile", updateProfile);
router.get("/getProfile/:uid", getProfile);

export default router;
