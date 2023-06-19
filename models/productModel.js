import mongoose from "mongoose";

const prooductSchema = mongoose.Schema({
name:{type:String, required:true},
slug:{type:String},
description:{type:String, required:true },
price:{type:Number, required:true },
category:{type:mongoose.ObjectId, ref:'Category', required:true},
quantity:{type:Number, required:true},
photo: {data: Buffer,contentType: String,},
shipping:{type:Boolean}
},{timeStamps:true});

export default mongoose.model("products", prooductSchema)