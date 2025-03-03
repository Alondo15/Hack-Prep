import { check } from "express-validator";

export const bookValidator = [
    check("isbn", "ISBN is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("authorName", "Author is required").not().isEmpty(),
    check("publisherName", "Publisher is required").not().isEmpty(),
    check("genreName", "Genre is required").not().isEmpty(),
    check("year", "Publication year is required").isNumeric(),
];
