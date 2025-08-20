import mongoose from "mongoose";
// this is the workplace schema
// it defines the structure of the workplace documents in the database
// it includes fields for property, name, unit, and other relevant information
// it also includes fields for sqft, seats, price, availability, smoking, term, and images

//Changed the schema flow in order to align the frontend demand
const workspaceSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["Private Office","Dedicated Desk","Hot Desk","Meeting Room","Other"] }, // <-- add
  seats: { type: Number, default: 0 },
  smokingAllowed: { type: Boolean, default: false },
  availability: { type: String},
  leaseOption: { type: String, enum: ["Day","Week","Month"] },
  price: { type: Number, default: 0 }
}, { timestamps: true }
);

// const workspaceSchema = new mongoose.Schema(
//     {   
//         property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }, // this is a reference to the Property model
//         name: { type: String, required: true },
//         unit: String,
//         sqft: Number,
//         seats: Number,
//         price: Number,
//         //Changed the availability to date to align it with frontend demand
//         availability: String,
//         smoking: Boolean,
//         term: { type: String, enum: ["day", "week", "month"] },
//         images: [{ type: String }]
//     },
//     { timestamps: true }
// );
// this creates the Workplace model
// it will be used to interact with the workplace collection in the database
const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;