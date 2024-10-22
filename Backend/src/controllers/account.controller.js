import { Account } from "../models/account.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
const createAccount = async (req) => {
  try {
    //flag:"signin" | "addAccount"
    const { flag, email, network } = req.body;

    const user = await User.findOne({ email });
    let count = await Account.countDocuments({ email });
    console.log("count", count);
    if (flag === "signin" && count >= 1) return;
    else if ((flag === "signin" && count === 0) || flag === "addAccount") {
      console.log("entered add account block");
      const newAccount = await Account.create({
        email,
        accountIndex: ++count,
        wallets: [],
        network,
      });

      const savedAccount = await newAccount.save();
      console.log("newAccount created", newAccount);

      // console.log("before populate", user);
      user.accounts.push(newAccount._id);
      await user.save();

      const isAccountCreated = await Account.findOne({
        email,
      });
      if (isAccountCreated) {
        await isAccountCreated.save();
        console.log(isAccountCreated);
        return { status: "success", data: isAccountCreated };
      }
    }
  } catch (error) {
    console.error("Error whle a/c creation", error);
    return { errorMessagefromCreateAccount: error };
  }
};

export { createAccount };
