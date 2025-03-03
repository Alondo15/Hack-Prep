import express from "express";
import {
    addBookToCollection,
    removeBookFromCollection,
} from "../controllers/userController";

const router = express.Router();

// Get User's Profile
// router.get("/profile", getUserProfile);

// Update User's Profile
// router.put("/profile/update", updateUserProfile);

// Get User's Collection
// router.get("/collection", getUsersCollection);

// Add Book To Collection
router.post("/collection/add", addBookToCollection);

// Remove Book From Collection
router.delete("/collection/remove", removeBookFromCollection);

export default router;
