import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedData = await jwt.decode(token);
    const user = await User.findOne({ email: decodedData.email });
    if (!user) {
      return res.status(404).send({ message: "No user found" });
    }
    req.body = { ...req.body, email: decodedData.email };
    next();
  } catch (error) {
    console.error("Error in auth Middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { authUser };
