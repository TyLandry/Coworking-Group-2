import express from "express";
import User from "./user.js";
import { generateToken, authMiddleware } from "./authentication.js";// JWT file

// Create a router object to define routes
const router = express.Router();


//---------- Register a new user ----------
//Method: POST /register
// As mentioned in server.js all routes will work under api
// URL: "http://localhost:3000/api/register"

router.post("/register", async (req, res) => {
  try {
    // Get user details from the request body
    const { firstName, lastName, email, phone, password, role } = req.body;
    
    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
     
    
    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role
    });
    
    // Save the user to database
    await user.save();

    // Send success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//---------- Login user ----------
//Method: POST/ login
//URL:"http://localhost:3000/api/login"

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    //Reinforce the password when making an API request
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "User not found" });
    
    // Compare the password with hashed password in database
   // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Authentication failed" });
    
    // Generate a JWT token
    const token = generateToken(user);

    // Send the token
    res.json({ token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//---------- Profile route ----------
//Method: GET/profile
//URL: "http://localhost:3000/api/profile"
//This requires a valid JWT token and it will be received from login 

router.get("/profile", authMiddleware, async (req, res) => {
  try {
     // Fetches user details from database, exclude password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});



//----------------------- CRUD Operation -----------------------

//---------- Create user ----------
// Method: POST
//URL: http://localhost:3000/api/users
router.post("/users",authMiddleware, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    //Generate a token after creating the user
    const token = generateToken(user);


    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//---------- READ - Get users by ID ----------
//Method: GET
//URL: http://localhost:3000/api/users
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching the users" });
  }
});


//---------- UPDATE - Updates users details by ID ----------
//Method: PUT
//URL: http://localhost:3000/api/users/:id
router.put("/users/:id", authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, role } = req.body;

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phone, role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//---------- DELETE - Delete the user from database ----------
//Method: DELETE
//URL: http://localhost:3000/api/users/:id
router.delete("/users/:id", authMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Export router so it can be used in server.js
export default router;