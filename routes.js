import express from "express";
import bcrypt from "bcryptjs";
import User from "./user.js";
import { generateToken, authMiddleware } from "./authentication.js";// JWT file

// Create a router object to define routes
const router = express.Router();

// Register a new user
//Method: POST /register
router.post("/register", async (req, res) => {
  try {
    // Get user details from the request body
    const { firstName, lastName, email, phone, password, role } = req.body;
    
    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
     
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role
    });
    
    // Save the user to the database
    await user.save();

    // Send success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login a user
//Method: POST/ login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
    // Compare the password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    
    // Generate a JWT token
    const token = generateToken(user);

    // Send the token
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Protected example route
//Method: GET/profile

//This requires a valid JWT token
router.get("/profile", authMiddleware, async (req, res) => {
  try {
     // Fetch user details from database, exclude password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Export router so it can be used in server.js
export default router;
