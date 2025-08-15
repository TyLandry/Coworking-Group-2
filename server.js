//Node server will be created here
//Installed express package
//It handles the connection or create routes and handles HTTP requests without making it harder
import express from "express";
//Import connect db inside of the database js file.
import { connectDB } from "./database.js";

//Load environment variables from .env
import dotenv from "dotenv";
dotenv.config();

//Enable CORS so Postman/Frontend can call the API
import cors from "cors";

// Import routes
import router from "./routes.js";

const app = express();
//For project purposes, PORT will be hardcoded inside of the backend.
//Additional security purposes if PORT will be added inside of env which is a good practice.
const PORT = process.env.PORT || 3000;

connectDB();

// (Added) Global middlewares
app.use(cors());         
app.use(express.json());   

// (Added) Root route to avoid "Cannot GET /"
app.get("/", (req, res) => {
  res.send("API is up. Try GET /health");
});

// (Added) Health check route for quick testing
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Server alive" });
});

// Hook in all routes from routes.js
// All routes like /register, /login, /profile will now work under /api
app.use("/api", router);

//Adding the route for the server to be established
app.listen(PORT, () => {
  //For debug purposes to know if the server is being run on the correct port
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
