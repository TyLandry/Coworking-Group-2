  import dotenv from "dotenv";
  //Establishing the connection to the MOngoDB database using mongoose.
  dotenv.config();

  //Database will be uploaded here
  import mongoose  from "mongoose";

  //Connect the sensitive key here.
  const uri = process.env.MONGODB_URI;

  export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("Database using MongoDB connected successfully");
    } catch (err) {
      console.error("There's a connection error:", err);
      //Exit process on failure
      process.exit(1);
    }
  };

  //  export async function connectDB(){
  //    try {
  //      await mongoose.connect(uri, {
  //        useNewUrlParser: true,
  //        useUnifiedTopology: true,
  //      });
  //      console.log("Database using MongoDB connected successfully");
  //    } catch (err) {
  //      console.error("There's a connection error:", err);
  //       //Exit on failure
  //      process.exit(1);
  //    }
  // }