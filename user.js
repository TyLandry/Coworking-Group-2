import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//Add a schema to make sure that everything will be in line
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String },
  password:  { type: String, required: true, select: false },
  role:      { type: String, default: "user" }
});

export default mongoose.model("User", userSchema);