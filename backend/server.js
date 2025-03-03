import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
// Connect to MongoDB
connectDB();

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "*",
};
app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
