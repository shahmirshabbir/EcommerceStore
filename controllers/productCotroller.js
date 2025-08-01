const Product  = require('../models/products')
const express = require("express")


exports.getProduct = async (req , res)=>{
    try{
        const id = req.params.id;
    const result = await Product.getProduct(id) 
    res.json(result[0])
    }
    catch(err){
            res.status(500).json({ message: 'Something went wrong' , error : err});
    }
}

exports.addProduct = async (req , res)=>{
   try{
     const {name , cat , description , price, val } = req.body;
    
    const img = req.file;
    const imgPath = img.path;
    // console.log(name , cat , description , price, val)
    const result = await Product.addProduct(name , cat , description , price , imgPath,val)
    console.log(result)
    res.json(result[0])
   }
   catch(err){
    res.status(500).json({ message: 'Something went wrong' , error : err});
   }
}

exports.getAllProducts = async (req , res)=>{
    try{
        const result = await Product.getAllProducts(1)
        res.json(result[0])
    }
    catch(err){
res.status(500).json({ message: 'Something went wrong' , error : err});
    }
}

exports.deleteProduct = async (req , res)=>{
    try{
        const id = req.params.id
        const result = await Product.deleteProduct(id)
        res.json(result)
    }
    catch(err){
res.status(500).json({ message: 'Something went wrong' , error : err});
    }
}

exports.updateProduct = async (req , res)=>{
    try{
        const id = req.params.id
    const {name , cat , description , price, val } = req.body;
    
    const img = req.file;
    const imgPath = img.path;
    
    const result = await Product.updateProduct(id,name , cat , description , price , imgPath,val)
    res.json(result[0])
    }
    catch(err){
res.status(500).json({ message: 'Something went wrong' , error : err});
    }
}

exports.checkApi = async (req , res)=>{
    console.log(req.body)
    return res.json("yes")
}