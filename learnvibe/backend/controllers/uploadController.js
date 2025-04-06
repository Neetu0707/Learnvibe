import multer from "multer";
import pool from "../db.js";
import nodemailer from "nodemailer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists in your project root
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const jsonData = JSON.parse(req.file.buffer.toString()); // Parse JSON from file buffer
  const fileName = req.file.originalname;

  // Insert JSON into database
  await pool.query(
    "INSERT INTO json_files (file_name, file_data) VALUES ($1, $2::jsonb)",
    [fileName, jsonData]
  );

  console.log("Uploaded file:", req.file); // Check if file is being logged

  return res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
  });
};

export const getfile = async (req, res) => {
  const files = await pool.query("SELECT * FROM json_files");
  res.status(200).json(files.rows);
};

export const addcourse = async (req, res) => {
  try {
    const { email, coursename, status, completed } = req.body;

    // Check if the course already exists for the user
    const existingCourse = await pool.query(
      "SELECT * FROM usercourse WHERE user_email = $1 AND course_id = $2",
      [email, coursename]
    );

    if (existingCourse.rows.length > 0) {
      return res.status(400).json({ message: "Course already added" });
    }

    // If not exists, insert new course
    await pool.query(
      "INSERT INTO usercourse (user_email, course_id, status, completed) VALUES ($1, $2, $3, $4)",
      [email, coursename, status, completed]
    );

    res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getcourse = async (req, res) => {
  try {
    const { email } = req.body;
    const courses = await pool.query(
      "SELECT * FROM usercourse WHERE user_email = $1",
      [email]
    );
    res.status(200).json(courses.rows);
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendemail = async (req, res) => {
  const { name, email, message } = req.body;
  // Email options
  console.log(req.body);

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use "gmail" or any SMTP service
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email app password
      },
    });

    const mailOptions2 = {
      from: process.env.EMAIL, // Sender email
      to: "kashyaphemantk@gmail.com", // Recipient email
      subject: `Query Recevied For ${email}`, // Email subject
      text: message, // Email content in plain text
    };

    const mailOptions = {
      from: process.env.EMAIL, // Sender email
      to: email, // Recipient email
      subject: "Thank You for Contacting Us!", // Email subject
      text: `Dear ${email},

          Thank you for reaching out to us! We have received your message and appreciate you taking the time to contact us. Our team is reviewing your inquiry and will get back to you as soon as possible.

          Here are the details you submitted:
          Email: ${email}
          Message: ${message}
          
          If your inquiry is urgent, feel free to reply to this email, and we'll prioritize your request. Otherwise, we will get back to you within [response time, e.g., 24-48 hours].

          In the meantime, you can check our FAQ section or explore our website for more information.

          We appreciate your patience and look forward to assisting you.

          Best regards,
          Team Learnvibe`, // Email content in plain text
    };

    // Send email
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);
    console.log("Email sent to", email);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};


export const updateIndex = async (req, res) => {
  try {
    const { email, course_id } = req.body;

    if (!email || !course_id) {
      return res.status(400).json({ message: "Email and Course ID are required" });
    }

    await pool.query(
      "UPDATE usercourse SET completed = completed + 1 WHERE user_email = $1 AND course_id = $2",
      [email, course_id]
    );

    res.status(200).json({ message: "Index incremented successfully" });
  } catch (error) {
    console.error("Error updating index:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getusercourse = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM usercourse");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching user courses:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteCourseFile = async (req, res) => {
  try {
    const { fileName } = req.body;

    // Check if file exists
    const file = await pool.query(
      "SELECT * FROM json_files WHERE file_name = $1",
      [fileName]
    );

    if (file.rows.length === 0) {
      return res.status(404).json({ message: "Course file not found" });
    }

    // Delete file
    await pool.query(
      "DELETE FROM json_files WHERE file_name = $1",
      [fileName]
    );

    return res.status(200).json({ message: "Course file deleted successfully" });
  } catch (error) {
    console.error("Error deleting course file:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
