const Category  = require('../models/category')
const express = require("express")

exports.addCategory = (req , res)=>{
    const {name , count } = req.body;
    
    const img = req.file;
    const imgPath = img.path;
    // console.log(name , cat , description , price, val)
    Category.addCategory(name ,count, imgPath ,(err , result)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"Database error"});
        }

        res.json(result);
    })
}

exports.getAllCategory = (req , res)=>{
    Category.getAllCategory((err , result)=>{
        if(err){
            res.json(err)
        }

        res.json(result)
    })
}

exports.deleteCategory = (req , res)=>{
    const id = req.params.id
    Category.deleteCategory(id , (err , result)=>{
        if(err){
            res.json(err)
        }

        res.json(result);
    })
}

exports.updateCategory = (req , res)=>{
    const id = req.params.id
    const {name ,count } = req.body;
    
    const img = req.file;
    const imgPath = img.path;
    
    Category.updateCategory(id,name , count ,imgPath,(err , result)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"Database error"});
        }

        res.json(result);
    })
}