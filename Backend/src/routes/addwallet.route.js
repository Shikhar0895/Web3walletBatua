import { Router } from "express";
import { Account } from "../models/account.model.js";
import { Wallet } from "../models/wallet.model.js";
import { createAccount } from "../controllers/account.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").post(authUser, async (req, resp) => {
  console.log("add wallet route reached");
  console.log("from add wallet route", { dataFromReq: req.body });
  try {
    const isAccountCreated = await createAccount(req);

    if (isAccountCreated.status !== "success") {
      resp.status(401).send({ message: "Account creation failed" });
      console.log("Account creation failed");
      return;
    } else {
      console.log("Add wallet function ran");
      const { email, network, accountIndex, walletData } = req.body;

      const { addressIndex } = walletData;

      //   //this wallet needs to be attached to the account whose email matches the one sent from frontend
      const account = await Account.findOne({ email, accountIndex });
      console.log(account);

      if (!account) {
        console.error("Account not found");
        return;
      }

      const newWallet = new Wallet({
        email: email,
        addressIndex,
        network,
      });
      const savedWallet = await newWallet.save();

      account.wallets.push(savedWallet._id);
      const updatedAccount = await account.save();
      console.log("Updated Account with new wallet:", updatedAccount);
      resp.status(201).send({
        message: "wallet created successfully",
      });
    }
  } catch (error) {
    console.error("Error adding wallet to account:", error);
  }
});

export { router };
