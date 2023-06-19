import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
name:{type:String, required:true, unique:true },
slug:{type:String, lowercase:true }


},{timeStamps:true});

export default mongoose.model("Category", categorySchema)