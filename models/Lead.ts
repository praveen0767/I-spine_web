import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this lead."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email for this lead."],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number."],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
