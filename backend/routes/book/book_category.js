import express from 'express';
import db from '../../config/db.js';
import BookCategoryModel from '../../models/book/book_category_model.js';

const router = express.Router();
const bookCategories = new BookCategoryModel(db);

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

router.get("/getAllCategories", async (req, res) => {
    const categories = await bookCategories.getAllBookCategory();
    res.send({ categories });
});

router.post("/addCategory", async (req, res) => {
    const { name } = req.body;
    const category = await bookCategories.addBookCategory(name);
    // console.log("Category Added Successfully");
    if (category.status === "failed") {
        res.json({ message: category.error });
    }
    res.json({ message: "Category Added Successfully", category: category.category });
});

router.get("/getCategory", async (req, res) => {
    const { category_id } = req.body;
    const category = await bookCategories.getBookCategory(category_id);
    console.log("Category Retrieved Successfully");
    res.json({ message: "Category Retrieved Successfully", category });
});

router.put("/updateCategory", isAuthenticated, async (req, res) => {
    const { category_id, newValue } = req.body;
    const category = await bookCategories.updateBookCategory(category_id, newValue);
    console.log("Category Updated Successfully");
    res.json({ message: "Category Updated Successfully", category });
});

router.delete("/deleteCategory", isAuthenticated, async (req, res) => {
    const { category_id } = req.body;
    const category = await bookCategories.deleteBookCategory(category_id);
    console.log("Category Deleted Successfully");
    res.json({ message: "Category Deleted Successfully", category });
});

export default router;