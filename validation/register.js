import Validator from "validator";
import isEmpty from "is-empty";

export const check = async (req, res, next) => {
  try {
    const userEmail = await User.findOne({ where: { email: req.body.email } });
    if (userEmail)
      return res
        .status(409)
        .json({ status: 409, error: "email is already exist." });
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

function validateRegisterInput(data) {
  let errors = {};
  //  convert null for empty field to empty string
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (
    !data.password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/g
    )
  ) {
    errors.password =
      "Password must contain atleast 8 characters with atleast one number and a special character";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors), //if errors is empty, then its valid so its set to true
  };
}

export default validateRegisterInput;
