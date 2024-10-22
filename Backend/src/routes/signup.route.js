//@ts-check
import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

const router = Router();

router.route("/").post(registerUser);

export { router };
