import express from "express";
import { login, getUser,sendOtp,verifyOtp } from "../controllers/authController.js"; // ✅ Import getUser

const router = express.Router();

// Define the POST route for login
router.post("/login", login);

// Define the GET route for fetching user details
router.get("/getuser", getUser); // ✅ Changed from POST to GET (more appropriate for fetching data)

router.post("/sendotp",sendOtp);

router.post("/verifyotp",verifyOtp);

export default router;
