import mongoose from "mongoose";
import crypto from "node:crypto";

function generateUUID() {
  return crypto.randomBytes(16).toString("hex");
}

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: generateUUID,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  idade: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Usuario = mongoose.model("Usuario", UserSchema);
export default Usuario;
