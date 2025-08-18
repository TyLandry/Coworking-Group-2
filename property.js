// property.js
import mongoose from "mongoose";


// for the workspace
const workspaceSchema = new mongoose.Schema(
  {
    name: String,           
    unit: String,          
    sqft: Number,
    seats: Number,
    price: Number,          
    availability: Boolean,
    smoking: Boolean,
    term: { type: String, enum: ["day", "week", "month"] },
  },
  { _id: true } // it is used to edi/ delete the subdocument
);

const propertySchema = new mongoose.Schema(
  {
    //the owner manages this part
    address: String,
    neighborhood: String,
    sqft: Number,
    parking: Boolean,
    publicTransportation: Boolean,
    seats: Number,          
    smoking: Boolean,
    availability: Boolean, 
    term: { type: String, enum: ["day", "week", "month"] },
    price: Number,         
    ownerEmail: String,

    
    //workspaces then attached to the owner's info
    workspaces: [workspaceSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);

