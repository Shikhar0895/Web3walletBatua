import { Schema, model } from "mongoose";

const walletSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
      trim: true,
    },
    addressIndex: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  { timestamps: true },
);

export const Wallet = model("Wallet", walletSchema);
