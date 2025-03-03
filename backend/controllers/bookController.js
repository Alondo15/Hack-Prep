import Book from "../models/Book.js";
import Author from "../models/Author.js";
import Publisher from "../models/Publisher.js";
import Genre from "../models/Genre.js";
import { validationResult } from "express-validator";

// Create a new Book
export const createBook = async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { isbn, title, authorName, publisherName, year, cover, genreName } =
        req.body;

    try {
        // Check if the author exists, else create a new one
        let author = await Author.findOne({ name: authorName });
        console.log(authorName);

        if (!author) {
            author = new Author({ name: authorName });
            await author.save();
        }

        // Check if the publisher exists, else create a new one
        let publisher = await Publisher.findOne({ name: publisherName });
        if (!publisher) {
            publisher = new Publisher({ name: publisherName });
            await publisher.save();
        }

        // Check if genre exists, else create a new one
        let genre = await Genre.findOne({ name: genreName });
        if (!genre) {
            genre = new Genre({ name: genreName });
            await genre.save();
        }

        //  Create the book with the found/created author, publisher and genre IDs
        const newBook = new Book({
            isbn: isbn,
            title: title,
            author: author._id,
            publisher: publisher._id,
            year: year,
            coverImage: cover,
            genre: genre._id,
        });
        await newBook.save();

        res.status(201).json({ message: "Book created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Edit Book

const editBook = async (req, res) => {};

// Delete Book

const deleteBook = async (req, res) => {};

// Get All Books

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate("author", "name")
            .populate("publisher", "name")
            .populate("genre", "name");
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
