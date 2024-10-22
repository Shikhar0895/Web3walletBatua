import { Router } from "express";
import { Account } from "../models/account.model.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const router = Router();

router.route("/").post(async (req, res) => {
  try {
    const { token } = req.body;
    const decodedData = await jwt.decode(token);
    const user = await User.findOne({ email: decodedData.email });
    if (!user) {
      throw new Error("No user found");
    }
    if (!user.accounts) {
      user.accounts = [];
    }

    let count = await Account.countDocuments({ email: decodedData.email });
    if (count >= 1) return;
    const newAccount = await Account.create({
      email: decodedData.email,
      wallets: [],
    });
    const savedAccount = await newAccount.save();

    // console.log("before populate", user);
    user.accounts.push(newAccount._id);
    await user.populate("accounts");
    const updatedUsers = await user.save();

    const isAccountCreated = await Account.findOne({
      email: decodedData.email,
    });
    if (isAccountCreated) {
      await isAccountCreated.save();
    }

    if (isAccountCreated) {
      res.status(201).send({
        message: "Account Created Successfully",
      });
    }
  } catch (error) {
    console.error("Error whle a/c creation", error);
  }
});

export { router };
