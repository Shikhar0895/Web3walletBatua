// import { Router } from "express";
// const router = Router();
// export { router };

import { Router } from "express";
import { User } from "../models/user.model.js";

import { Account } from "../models/account.model.js";
import { Wallet } from "../models/wallet.model.js";
import { generateAccessToken } from "../utils/index.js";

const router = Router();

router.route("/").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if account and wallet already exists , if yes then send those first
    const accountwithwalletsdata = await Account.find(
      { email },
      { accountIndex: 1, seed: 1, network: 1, _id: 0 },
    )
      .populate("wallets", "addressIndex -_id")
      .exec();
    const isAccountExist = await Account.find({ email });
    const isWalletExist = await Wallet.find({ email });

    console.log({
      message: "from signin route",
      accountwithwalletsdata,
    });

    if (isAccountExist.length !== 0 && isWalletExist.length !== 0) {
      console.log("Entering account and wallet exist block");
      const accessToken = generateAccessToken({ email });

      res.status(201).send({
        message: "Account and wallet already exists",
        flag: "accountandWalletExist",
        token: accessToken,
        data: accountwithwalletsdata,
      });
    } else {
      console.log("Entering fresh account creation block");
      const user = await User.findOne({ email });
      if (!user) {
        res.status(201).send({
          message: "No such user exists",
        });
        return;
      } else {
        const isMatched = await user.isPasswordCorrect(password);
        if (isMatched) {
          const accessToken = generateAccessToken({ email });
          res.status(201).send({
            message: "Signed In successfully",
            token: accessToken,
            flag: "freshAccount",
          });
        } else {
          res.status(201).send({
            message: "Wrong password",
          });
        }
      }
    }
  } catch (error) {
    res.status(401).send({
      message: "Something went wrong",
    });
  }
});

export { router };
