import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120, unique: true },
    phone: { type: String, required: true, trim: true, minlength: 7, maxlength: 20 },
    course: {
      type: String,
      required: true,
      enum: ["Web Development", "Cyber Security", "Data Science", "Graphic Design"]
    }
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model("Student", studentSchema);