import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  bio: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  follow: { type: [String], default: [] },
  forgotPasswordToken: String,
  forgotPasswordExpiry: String,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

export default mongoose.models.users || mongoose.model("users", userSchema);
