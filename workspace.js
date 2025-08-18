import mongoose from "mongoose";
// this is the workplace schema
// it defines the structure of the workplace documents in the database
// it includes fields for property, name, unit, and other relevant information
// it also includes fields for sqft, seats, price, availability, smoking, term, and images
const workspaceSchema = new mongoose.Schema(
    {   
        property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }, // this is a reference to the Property model
        name: { type: String, required: true },
        unit: String,
        sqft: Number,
        seats: Number,
        price: Number,
        availability: Boolean,
        smoking: Boolean,
        term: { type: String, enum: ["day", "week", "month"] },
        images: [{ type: String }]
    },
    { timestamps: true }
);
// this creates the Workplace model
// it will be used to interact with the workplace collection in the database
const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;