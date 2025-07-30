const Category  = require('../models/category')
const express = require("express")

exports.addCategory = async (req , res)=>{
    try{const {name , count } = req.body;
    
    const img = req.file;
    const imgPath = img.path;
    // console.log(name , cat , description , price, val)
    const result = await Category.addCategory(name ,count, imgPath )

    res.json(result);}
    catch(err){
res.status(500).json({ message: 'Something went wrong' , error : err});
    }
}

exports.getAllCategory = async (req , res)=>{
    try{
        const result = await Category.getAllCategory()
        res.json(result[0])
    }
    catch(err){
res.status(500).json({ message: 'Something went wrong' , error : err});
    }
}

exports.deleteCategory = async (req , res)=>{
    try{
        const id = req.params.id
    const result = await Category.deleteCategory(id)
        res.json(result);
    }
    catch(err){
res.status(500).json({ message: 'Something went wrong' , error : err});
    }
}

exports.updateCategory = async (req , res)=>{
    try{
        const id = req.params.id
    const {name ,count } = req.body;
    
    const img = req.file;
    const imgPath = img.path;
    
    const result = await Category.updateCategory(id,name , count ,imgPath)
    res.json(result[0]);
    }
    catch(err){
        res.status(500).json({ message: 'Something went wrong' , error : err});
    }
}