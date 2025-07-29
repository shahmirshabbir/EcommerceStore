const Product  = require('../models/products')
const express = require("express")


exports.getProduct = (req , res)=>{
    const id = req.params.id;
    Product.getProduct(id , (err, product)=>{
        if(err) return res.status(500).json({error:'Database Error'});
        if(!product) return res.status(404).json({error:"Products not found"});

        res.json(product);
    })
}

exports.addProduct = (req , res)=>{
    const {name , cat , description , price } = req.body;
    
    const img = req.file;
    const imgPath = img.path;
    
    Product.addProduct(name , cat , description , price , imgPath ,(err , result)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"Database error"});
        }

        res.json(result);
    })
}

exports.getAllProducts = (req , res)=>{
    Product.getAllProducts(req.query.page , (err , result)=>{
        if(err){
            res.json(err)
        }

        res.json(result)
    })
}

exports.deleteProduct = (req , res)=>{
    const id = req.params.id
    Product.deleteProduct(id , (err , result)=>{
        if(err){
            res.json(err)
        }

        res.json(result);
    })
}

exports.updateProduct = (req , res)=>{
    const id = req.params.id
    Product.updateProduct(id , (err , result)=>{
        if(err){
            res.json(err)
        }

        res.json(result);
    })
}