import express from 'express';
import db from '../../config/db.js';
import BookCopyModel from '../../models/book/book_copy_model.js';

const router = express.Router();
const bookCopies = new BookCopyModel(db);

// authenticated user and user is admin can access this 
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        // User is authenticated, proceed to the next middleware or routes
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
        res.json({ message: "Bad Credentials" }); // You can redirect to a login page, for example
    }
};

router.get("/getAllBookCopies", async (req, res) => {
    const copies = await bookCopies.getAllBookCopy();
    console.log("book Copies" + copies);
    res.send({ message: "Book Copies", copies });
});

router.post("/getBookCopy", async (req, res) => {
    const { copy_id } = req.body;
    const copy = await bookCopies.getBookCopy(copy_id);
    console.log("book Copy" + copy);
    res.send({ message: "Book Copy", copy });
});

router.post("/addBookCopy", isAuthenticated, async (req, res) => {
    const { book_id, unique_identifier } = req.body;
    const copy = await bookCopies.addBookCopy(book_id, unique_identifier);
    console.log("Added book copy" + copy);
    res.send({ message: "Added Book copy", copy });
});

router.put("/updateBookCopy", isAuthenticated, async (req, res) => {
    const { copy_id, unique_identifier } = req.body;
    const copy = await bookCopies.updateBookCopy(copy_id, unique_identifier);
    console.log("Updated book copy" + copy);
    res.send({ message: "Updated Book copy", copy });
});

router.delete("/deleteBookCopy", async (req, res) => {
    const { copy_id } = req.body;
    const copy = await bookCopies.deleteBookCopy(copy_id);
    console.log("Deleted book copy" + copy);
    res.send({ message: "Deleted Book copy", copy });
});

export default router;
