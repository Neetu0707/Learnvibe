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
  const { name, image, topics } = req.body;

  // Check if the course already exists
  try {
    const courseQuery = 'SELECT * FROM course WHERE course_name = $1';
    const courseResult = await pool.query(courseQuery, [name]);

    if (courseResult.rows.length > 0) {
      return res.status(400).json({ message: 'Course with this name already exists.' });
    }

    // Insert new course
    const insertCourseQuery = 'INSERT INTO course(course_name, image_src) VALUES($1, $2) RETURNING id';
    const courseInsertResult = await pool.query(insertCourseQuery, [name, image]);
    const courseId = courseInsertResult.rows[0].id;

    // Iterate through topics and insert them
    for (const topic of topics) {
      const { topic_name, subtopic_name, paragraphs, quiz } = topic;

      // Check if the topic already exists for the course
      const topicQuery = 'SELECT * FROM topics WHERE course_name = $1 AND topic_name = $2';
      const topicResult = await pool.query(topicQuery, [name, topic_name]);

      if (topicResult.rows.length > 0) {
        return res.status(400).json({ message: `Topic "${topic_name}" already exists for this course.` });
      }

      // Insert topic
      const insertTopicQuery = 'INSERT INTO topics(course_name, topic_name, subtopic_name, paragraphs, quiz) VALUES($1, $2, $3, $4, $5) RETURNING id';
      const topicInsertResult = await pool.query(insertTopicQuery, [
        name,
        topic_name,
        subtopic_name,
        JSON.stringify(paragraphs),
        JSON.stringify(quiz),
      ]);

      // Check for subtopic duplication in the same topic
      const subtopicQuery = 'SELECT * FROM topics WHERE course_name = $1 AND topic_name = $2 AND subtopic_name = $3';
      const subtopicResult = await pool.query(subtopicQuery, [name, topic_name, subtopic_name]);

      if (subtopicResult.rows.length > 0) {
        return res.status(400).json({ message: `Subtopic "${subtopic_name}" already exists for topic "${topic_name}".` });
      }

      // Insert subtopic
      await pool.query('INSERT INTO topics(course_name, topic_name, subtopic_name) VALUES($1, $2, $3)', [
        name,
        topic_name,
        subtopic_name,
      ]);
    }

    return res.status(200).json({ message: 'Course added successfully!' });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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
