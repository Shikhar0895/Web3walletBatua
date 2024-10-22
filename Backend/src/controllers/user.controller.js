import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await User.find({ name, email });

    if (isUserExist.length !== 0) {
      console.log("user exists in DB");
      res.status(201).send({
        message: "User already exists",
      });
      return;
    }
    await User.create({ ...req.body });
    res.status(201).send({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({
      message: "Something went wrong",
    });
  }
};

export default registerUser;
