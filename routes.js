//LIzzy's note: I used ChatGpt to guide me

import express from "express";
import bcrypt from "bcryptjs";
import User from "./user.js";
import { generateToken, authMiddleware } from "./authentication.js";// JWT file
import Property from "./property.js";

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
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
    // Compare the password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    
    // Generate a JWT token
    const token = generateToken(user);

    // Send the token and user info
    res.json({
      token,
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


// Protected example route
//Method: GET/profile
<<<<<<< HEAD
//URL: "http://localhost:3000/api/profile"
//This requires a valid JWT token and it will be recieved from login 
=======
>>>>>>> 8f65bda6199adf9929957ad4a33a4fd358be06cc

//This requires a valid JWT token
router.get("/profile", authMiddleware, async (req, res) => {
  try {
     // Fetches user details from database, exclude password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});



//----------------------------------------------------------------------

//this will help to check if it the owner
async function ensureOwner(req, res, next) {
  try {
   //because authMiddleware has being used before this part will run
    const user = await User.findById(req.user?.id).select("role email");
    if (!user || user.role !== "owner") {
      return res.status(403).json({ message: "Owner only" });
    }
    req.ownerEmail = user.email; // <-- ADDED for ownership check
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//Coworker search 
// GET /api/properties?neighborhood=Downtown&garage=true&price=1000
//Read with filters

router.get("/properties", async (req, res) => {
try{
  const query = {};

  if(req.query.address) query.address = { $regex: req.query.address, $options: "i"};
  if(req.query.neighborhood) query.neighborhood = { $regex: req.query.neighborhood, $options: "i"};
  if(req.query.sqft) query.sqft = { $gte: Number(req.query.sqft)};
  if(req.query.parking) query.parking = req.query.parking === "true";
  if(req.query.publicTransportation) query.publicTransportation = req.query.publicTransportation === "true";
  if(req.query.seats) query.seats = { $gte: Number(req.query.seats)};
  if(req.query.smoking) query.smoking = req.query.smoking === "true";
  if(req.query.availability) query.availability = req.query.availability === "true";
  if(req.query.term) query.term = req.query.term; // day, week or month here
  if(req.query.price) query.price = {$gte: Number(req.query.price)};

  const properties = await Property.find(query);
  res.json(properties);
}catch(err) {
  res.status(500).json({message: err.message});
}
});




// OWNER CRUD ----------------------------------------------------------------------
//CREATE

router.post("/properties", authMiddleware, ensureOwner, async (req, res) => {
try{
  // <-- ADDED ownerEmail assignment
  const prop = await Property.create({ ...req.body, ownerEmail: req.ownerEmail });
  res.status(201).json(prop);
}catch (err) {
  res.status(400).json({message: err.message });
}
});


//READ
router.get("/properties/:id", async (req, res) => {
try{
  const prop = await Property.findById(req.params.id);
  if(!prop) return res.status(404).json({message: "Property not found"});
  res.json(prop);
}catch (err) {
  res.status(400).json({message: err.message });
}
});


//UPDATE
router.put("/properties/:id", authMiddleware, ensureOwner, async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
    // <-- ADDED ownership check
    if (prop.ownerEmail !== req.ownerEmail) {
      return res.status(403).json({ message: "You don't own this property." });
    }
    Object.assign(prop, req.body);
    await prop.save();
    res.json(prop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//DELETE
router.delete("/properties/:id", authMiddleware,  ensureOwner, async (req, res) => {
try{
  const prop = await Property.findById(req.params.id);
  if(!prop) return res.status(404).json({message: "Property not found"});
  // <-- ADDED ownership check
  if (prop.ownerEmail !== req.ownerEmail) {
    return res.status(403).json({ message: "You don't own this property." });
  }
  await prop.deleteOne();
  res.json({message: "Property deleted" });
}catch (err) {
  res.status(400).json({message: err.message });
}
});


// ========================= OWNER: CRUD for workspaces (subdocuments cited above)============

// GET all workspaces for a property
router.get("/properties/:id/workspaces", async(req, res) => {
  try {
      const prop = await Property.findById(req.params.id).select("workspaces");
      if (!prop) return res.status(404).json({ message: "Property not found" });
      res.json(prop.workspaces);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//CREATE workspace
router.post("/properties/:id/workspaces", authMiddleware, ensureOwner, async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
    // <-- ADDED ownership check
    if (prop.ownerEmail !== req.ownerEmail) {
      return res.status(403).json({ message: "You don't own this property." });
    }
    prop.workspaces.push(req.body);
    await prop.save();

    const created = prop.workspaces[prop.workspaces.length - 1];
    res.status(201).json(created);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//UPDATE workspace
router.put("/properties/:id/workspaces/:workspaceId", authMiddleware, ensureOwner, async(req, res) => {
  try {
      const prop = await Property.findById(req.params.id);
      if (!prop) return res.status(404).json({ message: "Property not found" });
      // <-- ADDED ownership check
      if (prop.ownerEmail !== req.ownerEmail) {
        return res.status(403).json({ message: "You don't own this property." });
      }
      const ws = prop.workspaces.id(req.params.workspaceId);
      if(!ws) return res.status(404).json({message: "Workspace not found"});
  
      Object.assign(ws, req.body);
      await prop.save();
      res.json(ws);
  
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//DELETE workspace
router.delete("/properties/:id/workspaces/:workspaceId", authMiddleware, ensureOwner, async(req, res) => {
  try {
      const prop = await Property.findById(req.params.id);
      if (!prop) return res.status(404).json({ message: "Property not found" });
      // <-- ADDED ownership check
      if (prop.ownerEmail !== req.ownerEmail) {
        return res.status(403).json({ message: "You don't own this property." });
      }
      const ws = prop.workspaces.id(req.params.workspaceId);
      if(!ws) return res.status(404).json({message: "Workspace not found"});
  
      ws.deleteOne();
      await prop.save();
      res.json({message: "Workspace deleted"});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


// Export router so it can be used in server.js
export default router;