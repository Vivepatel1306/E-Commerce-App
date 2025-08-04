import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // lowercase: true // helps normalize for lookup
    },
    address: {
      type: String,
      required: true
    },
    phone: { // ✅ Fixed: changed from `phonee` to `phone`
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // ✅ adds createdAt and updatedAt
  }
);

const userModel = mongoose.model("User", userSchema); // ✅ renamed model to PascalCase (recommended)
export default userModel;
