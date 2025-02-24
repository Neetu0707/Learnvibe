import nodemailer from "nodemailer";
import {
  createUser,
  updateUser,
  findUserByEmail,
} from "../services/authService.js";
import pool from "../db.js";

const otpStore = new Map(); // Temporary in-memory store for OTPs

// Generate a random 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const login = async (req, res) => {
  const { name, email, provider } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const username = email.split("@")[0]; // Create username from email prefix

  try {
    // Check if the user already exists
    const existingUser = await createUser(email, username, name);

    if (existingUser) {
      // Update existing user timestamp
      await updateUser(email);
      return res
        .status(200)
        .json({ message: "User already exists, updated timestamp" });
    } else {
      // Insert a new user into the database
      await createUser(email, username, name);
      await sendEmail(email);
      return res.status(201).json({ message: "User saved successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.query; // Get email from query params

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendEmail = async (email) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // Sender email
      to: email, // Recipient email
      subject: "Welcome to LearnVibe!",
      text: `Dear User,

Thank you for joining LearnVibe! We appreciate your interest and look forward to supporting you.

If you have any questions, feel free to reach out to us.

Best regards,
Team LearnVibe`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const otp = generateOtp(); // Generate a random 6-digit OTP
    otpStore.set(email, otp); // Store OTP in memory (use Redis or DB for production)
    await sendEmailOtp(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const sendEmailOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for Email Verification",
      text: `Dear User,

Your OTP for email verification is: ${otp}

This OTP is valid for 5 minutes. Do not share it with anyone.

Best regards,
Team LearnVibe`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP ${otp} sent to`, email);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  const storedOtp = otpStore.get(email);

  if (storedOtp === otp) {
    otpStore.delete(email); // Remove OTP after verification
    try {
      await pool.query("UPDATE users SET isverified = true WHERE email = $1", [
        email,
      ]);
      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Error verifying email:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
};
