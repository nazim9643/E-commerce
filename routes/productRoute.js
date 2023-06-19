import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { braintreePaymentsController, braintreeTokenController, createproductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable'

const router = express.Router();

router.post('/create-product', formidable(),  createproductController);
//routes
router.put("/update-product/:pid",   formidable(),  updateProductController);
  

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
 
// filter product
router.post('/product-filters', productFilterController);

// count products
router.get('/product-count', productCountController);

// product per page
router.get('/product-list/:page', productListController);

// seaarch product
router.get('/search/:keyword', searchProductController);

// related product
router.get('/related-product/:pid/:cid', relatedProductController);

// related product
router.get('/product-category/:slug', productCategoryController);

// Braintree Token
router.get('/braintree/token', braintreeTokenController)

// Payments
router.post('/braintree/payments', braintreePaymentsController)


export default router;