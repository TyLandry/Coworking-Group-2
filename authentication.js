import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

//Function to generate the token
export function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role }, // payload
    process.env.JWT_SECRET,
  );
}

//Function to verify the token, I used AI to assist me in verifying the bearer, and splitting the bearer
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user info for later use
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}