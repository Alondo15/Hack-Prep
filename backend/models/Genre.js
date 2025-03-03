import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    icon: {
        type: String,
        default: "",
    },
});

export default mongoose.model("Genre", genreSchema);
