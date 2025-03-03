import express from "express";
import { check } from "express-validator";
import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";

const router = express.Router();

// Register Route
router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({
            min: 6,
        }),
        check("passwordConfirmation", "Confirm Password is required")
            .not()
            .isEmpty(),
    ],
    registerUser
);

// Login Route
router.post(
    "/login",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").not().isEmpty(),
    ],
    loginUser
);

export default router;
