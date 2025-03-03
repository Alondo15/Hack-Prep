import User from "../models/User.js";
import Book from "../models/Book.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// Register a new user
export const registerUser = async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, passwordConfirmation } = req.body;

    try {
        // Check if passwords match
        if (password !== passwordConfirmation) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set HTTP-only cookie
        res.cookie("auth_token", token, {
            httpOnly: true, // Prevents JavaScript access (XSS protection)
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour
        });

        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Logout User
export const logoutUser = (req, res) => {
    res.cookie("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "Strict",
        expires: new Date(0), // Expire immediately
        path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
};

// Add A Book To The Collection

export const addBookToCollection = async (req, res) => {
    try {
        const { userId, bookId } = req.body; // Get user and book IDs

        // Validate user and book existence
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        // Check if book is already in the user's collection
        if (user.books.includes(bookId)) {
            return res
                .status(400)
                .json({ message: "Book already in collection" });
        }

        // Add book to user's collection
        user.books.push(bookId);
        await user.save();

        return res
            .status(200)
            .json({ message: "Book added to collection", user });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
};

// Remove A Book From The Collection

export const removeBookFromCollection = async (req, res) => {};
