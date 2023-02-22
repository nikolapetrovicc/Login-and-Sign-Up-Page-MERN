import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
