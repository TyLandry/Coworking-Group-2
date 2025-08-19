// property.js
import mongoose from "mongoose";
//import Workspace from "./workspace.js";

// for the workspace
// const workspaceSchema = new mongoose.Schema(
//   {
//     name: String,           
//     unit: String,          
//     sqft: Number,
//     seats: Number,
//     price: Number,          
//     availability: Boolean,
//     smoking: Boolean,
//     term: { type: String, enum: ["day", "week", "month"] },
//   },
//   { _id: true } // it is used to edi/ delete the subdocument
// );

const propertySchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    neighborhood: String,
    sqft: Number,
    parking: Boolean,
    publicTransportation: Boolean,
    seats: Number,
    smoking: Boolean,
    availability: Boolean,
    term: { type: String, enum: ["day", "week", "month"] },
    price: Number,
    ownerEmail: { type: String, required: true },
    //workspaces then attached to the owner's info
    //workspaces: [Workspace], 
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.model("Property", propertySchema);

