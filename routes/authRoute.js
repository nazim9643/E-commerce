import express from "express";
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routing
// REGISTER || POST
router.post("/register", registerController);

// REGISTER || POST
router.post("/login", loginController);

// FORGOT PASSWORD || POST
router.post("/forgot-password",  forgotPasswordController);


router.get("/test", requireSignIn, isAdmin, testController);

// PROTECTED ROUTE AUTH
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
})

// PROTECTED ROUTE AUTH
router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
})

// Copy from here ===================>
//update profile
router.put("/profile",  updateProfileController);

//orders
router.get("/orders",  getOrdersController);

//all orders
router.get("/all-orders",  getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


export default router;