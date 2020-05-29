import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import models from "../models/index";
import loginvalidation from "../validation/login";
import signupvalidation from "../validation/register";

dotenv.config();
const User = models.user;
const secretKey = process.env.secretOrKey;
const expirationTime = {
  expiresIn: "1day",
};

dotenv.config();

/**
 * @user controller
 * @exports
 * @class
 */
class UserController {
  /**
   * Sign up a new user
   * @param {Object} req - Requests from a user
   * @param {Object} res - Response to the user
   * @returns {Object} Response
   */
  async signup(req, res) {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password ? req.body.password : "", 10), //salt password
    };

    const { errors, isValid } = signupvalidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const userEmail = await User.findOne({ where: { email: req.body.email } });
    const name = await User.findOne({ where: { username: req.body.username } });
    if (userEmail)
      return res
        .status(409)
        .json({ status: 409, error: "email is already exist." });
    if (name)
      return res
        .status(409)
        .json({ status: 409, error: "username seems to be taken" });
    try {
      const { dataValues: user } = await User.create(newUser);
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      const token = jwt.sign(payload, secretKey, expirationTime);
      const registeredUser = {
        email: user.email,
        username: user.username,
      };
      if (process.env.NODE_ENV === "test") registeredUser.token = token;
      return res.status(201).json({ registeredUser });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * user login
   * @param {Object} req -requesting from user
   * @param {Object} res -responding from user
   * @returns {Object} Response with status of 201
   */
  login(req, res) {
    const user = { email: req.body.email, password: req.body.password };
    const { errors, isValid } = loginvalidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    return User.findOne({ where: { email: user.email } })
      .then((foundUser) => {
        if (
          foundUser &&
          bcrypt.compareSync(user.password, foundUser.password)
        ) {
          if (foundUser.isActivated === false) {
            return res.status(403).send({
              status: 403,
              error: "Verify your email account before login.",
            });
          }
          const payload = {
            id: foundUser.id,
            email: foundUser.email,
          };
          const token = jwt.sign(payload, secretKey, expirationTime);
          res.status(200).json({ status: 200, token, user: payload });
        } else {
          res
            .status(400)
            .json({ status: 400, error: "Incorrect username or password" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
}

export default UserController;
