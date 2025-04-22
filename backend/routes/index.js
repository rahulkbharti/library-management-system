import express from "express";

import departmentRoutes from "./departmentRoutes.js";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./bookRoutes.js";
import bookCopyRoutes from "./bookCopiesRoutes.js";
import transactionRoutes from "./transactionRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import reservationRoutes from "./reservationRoutes.js";
import ebookRotues from "./eBookRoutes.js"

import userAuthRoutes from "./userAuthRoutes.js"
const router = express.Router();

router.use("/departments", departmentRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/bookCopies", bookCopyRoutes);
router.use("/transactions", transactionRoutes);
router.use("/reviews", reviewRoutes);
router.use("/reservations", reservationRoutes);
router.use("/ebooks", ebookRotues);

router.use("/auth", userAuthRoutes);

export default router;