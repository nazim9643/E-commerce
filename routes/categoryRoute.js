import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { CreateCategoryController, categoryController, deletecategoryController, singlecategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

// ?routes
// Create Category
router.post('/create-category',  CreateCategoryController);

// uppdate Category
router.put('/update-category/:id',  updateCategoryController);

// GET all Category
router.get('/get-category', categoryController);

// GET single Category
router.get('/single-category/:slug', singlecategoryController );

// GET single Category
router.delete('/delete-category/:id', deletecategoryController);

export default router;
