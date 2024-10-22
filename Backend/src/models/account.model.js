import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    accountIndex: {
      type: Number,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    wallets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
      },
    ],
  },
  { timestamps: true },
);

export const Account = model("Account", accountSchema);
