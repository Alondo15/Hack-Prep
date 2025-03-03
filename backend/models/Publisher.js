import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

export default mongoose.model("Publisher", publisherSchema);
