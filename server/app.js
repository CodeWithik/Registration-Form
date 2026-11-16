import express from "express";
import { connectDB } from "./db.js";
import Student from "./models/Student.js";

const app = express();
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Student Registration API is running." });
});

app.post("/api/students", async (req, res) => {
  try {
    const { fullName, email, phone, course } = req.body || {};

    if (![fullName, email, phone, course].every(
      (value) => typeof value === "string" && value.trim()
    )) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: "Enter a valid email address." });
    }

    await connectDB();

    const student = await Student.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      course: course.trim()
    });

    return res.status(201).json({
      success: true,
      message: "Student registered successfully.",
      student: {
        _id: student._id,
        fullName: student.fullName,
        email: student.email,
        course: student.course,
        createdAt: student.createdAt
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "This email is already registered." });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: "Please check the submitted information." });
    }
    console.error("Registration error:", error.message);
    return res.status(500).json({ success: false, message: "Server error. Check your database connection." });
  }
});

export default app;