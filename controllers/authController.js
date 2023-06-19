import userModel from '../models/userModel.js'
import {comparePassword, hashPassword} from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken';

// REGISTER CONTROLLER============>>>>>>>>>>>>>>>>>
export const registerController = async (req,res) =>{
    try {
        const {name, email, password, phone, address, answer}= req.body;
        // validations
        if(!name || !email || !password || !phone || !address || !answer){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        // existing user
        const existingUser  = await userModel.findOne({email})
        if(existingUser){ 
             return res.status(200).send({
                success: false,
                message:"Already Register Please Login",
             })
        }
        // register user
        const hashedPassword = await hashPassword(password);
        // save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
            answer
        }).save();
        
        res.status(201).send({
            success: true,
            message:"User Registered Successfully", 
            user,
        });
        console.log(user)
    
    } catch (error) {
        console.log(error)
         res.status(500).send({
            success:false,
            message:'error in registration',
            error
         })
    }
    };

// LOGIN CONTROLLER============>>>>>>>>>>>>>>>>>
    export const loginController = async (req,res) =>{
        try {
            const {email, password}= req.body
            // validations
            if(!email || !password){
                return res.status(404).send({
                    success:false,
                    message:"Invalid email and password"
                })
            }
                 //   check user 
      const user = await userModel.findOne({email})
      if(!user){
return res.status(404).send({
  success: false,
  message:"Email is not registered",
})
      }
   
      const match = await comparePassword(password,user.password);
      if(!match){
        return res.status(200).send({
            success:false,
            message:"invailid Password"
        });
      } 
               //   token
               const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{
                expiresIn: "7d",
            });
            res.status(200).send({
                success:true,
                message:"User Logged In Successfully",
                user:{
                    name:user.name,
                    email:user.email,
                     phone:user.phone,
                     address:user.address, 
                     role: user.role,
                    },
                 token,
            });
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:"Error In Login",
                error
            })
        }
    }

    // FORGOT PASSWORD CONTROLLER=================>
    export const forgotPasswordController = async (req,res)=>{
try {
    const {email, answer, newPassword} = req.body
    if(!email){
        res.status(400).send({message:"Email is required"})
    }
    if(!answer){
        res.status(400).send({message:"Answer is required"})
    }
    if(!newPassword){
        res.status(400).send({message:"New Password is required"})
    }
    // check
    const user = await userModel.findOne({email, answer});
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Email and Answer is not matched"
        })
    };
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {password: hashed});
    res.status(200).send({
        success:true,
        message:"Reset Password Successfully"
    });
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Something went wrong in reset password"
    })
}
    }

    export const testController = (req,res) =>{
        res.send("PROTECTED")
    }


    
//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  
  //orders
  export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };