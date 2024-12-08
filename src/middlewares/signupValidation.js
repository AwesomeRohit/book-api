import { body} from "express-validator";

export const signUpValidation = [
    body("username").notEmpty().withMessage("User name cannot be empty!"),
    body("email").isEmail().withMessage("invalid email address!"),
    body("password").isLength({min : 8}).withMessage("Password Must be 8 Characters Long")
]

