import { Router } from "express";
const router = Router();

router.route("/").get(authUser, (req, res) => {});

export { router };
