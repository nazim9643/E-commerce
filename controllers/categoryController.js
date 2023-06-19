import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify'


export const CreateCategoryController = async (req,res) =>{
try {
    const {name} = req.body;
    if(!name){
      return  res.status(401).send({message:"Name is Required"})
    }
    const existingCategory = await categoryModel.findOne({name:name});
    if(existingCategory){
      return  res.status(200).send({
            success:true,
            message:"Category Already Exist"
        })
    }
    const category = await new categoryModel({name, slug:slugify(name)}).save();
    res.status(201).send({
        success: true,
        message:"new Category Created",
        category
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message:"Error In Category"
    })
}
}

export const updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"category updated successflly",
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Update"
        })
    }
};

// GET ALL CATEGORY
export const categoryController = async(req,res)=>{
try {
    const category = await categoryModel.find({})
    res.status(200).send({
        success:true,
        message:"All category List",
        category
    })
} catch (error) {
    res.status(500).send({
        success:false,
        error,
        message:"Error While Geting All categories"
    })
}
}
// GET SINGLE CATEGORY
export const singlecategoryController = async(req,res)=>{
try {
    const category = await categoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
        success:true,
        message:"Get Single category List successfully",
        category
    })
} catch (error) {
    res.status(500).send({
        success:false,
        error,
        message:"Error While Geting SINGLE categories"
    })
}
}

// delete SINGLE CATEGORY
export const deletecategoryController = async(req,res)=>{
try {
    const {id} = req.params
     await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        success:true,
        message:"category deleted successfully",
        
    })
} catch (error) {
    res.status(500).send({
        success:false,
        error,
        message:"Error in delete a categories"
    })
}
}