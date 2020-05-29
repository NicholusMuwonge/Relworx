import express from "express";

// @controller
import User from "../../controllers/user";

const user = new User();

const router = express.Router();

// @POST
// @description creating user
router.post("/register", user.signup);
router.post("/login", user.login);

export default router;
