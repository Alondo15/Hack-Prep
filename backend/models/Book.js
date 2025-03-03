import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        isbn: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
            required: true,
        },
        publisher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Publisher",
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        coverImage: {
            type: String,
            default: "",
        },
        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
