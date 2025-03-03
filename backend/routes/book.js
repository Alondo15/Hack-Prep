import express from "express";
import { createBook, getAllBooks } from "../controllers/bookController.js";
import { bookValidator } from "../middlewares/bookValidation.js";

const router = express.Router();

// Create a new book

router.get("/", getAllBooks);

router.post("/create", bookValidator, createBook);

export default router;
