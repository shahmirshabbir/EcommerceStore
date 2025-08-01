const user = require("../models/user")
const bcrypt = require("bcrypt")
const express = require("express")

exports.signUp = async (req , res)=>{
    try{
         
        const {email, password ,name} = req.body
        // console.log(email, password ,name)
        const temp = await user.isThere(email)
          
        if(temp !== undefined){
            return res.status(409).json({ 
                success : false,
                message: "Email already taken"
            })
        }
        // let name = "me" 
        
        const hash = await bcrypt.hash(password , 10)
        // console.log(email, hash ,name)
        const result = await user.signUp(email, hash, name)
        res.json(result)

        // return  
       }
    catch(err){
        // console.log(err)  
        res.status(500).json({
                success : false,
                message: "Yes I am here",
                error : err
            })
    }
    
}

exports.deleteUser = async (req , res)=>{
    try{
        const id = req.params.id;
        const result = await user.deleteUser(id)
        res.json(result)
    }
    catch(err){
        res.status(500).json({
                success : false,
                message: "Internal Server error",
                error : err
            })
    }
    
}

exports.updateUser = async (req , res)=>{
    try{
        const id = req.params.id
        const {email , password , name} = req.body
        const hash = await bcrypt.hash(password , 10)
        const result = await user.updateUser(id, email, hash, name )
        res.json(result)
    }
    catch(err){
        res.status(500).json({
                success : false,
                message: "Internal Server error",
                error : err
            })
    }
    
}

exports.getUser = async (req , res)=>{
    try{
        const id = req.params.id
        const result = await user.getUser(id)
        // console.log(result[0][0].password)
        res.json(result[0])
    }
    catch(err){
                res.status(500).json({
                success : false,
                message: "Internal Server error",
                error : err
            })
    }

}

exports.login = async (req , res)=>{
    try{
        const {email , password} = req.body 
        // const hash = await bcrypt.hash(password,10)
        const result = await user.isThere(email)
        if(result === undefined){
            return res.status(404).json({
                success : false,
                message: "Wrong username ,or you dont have an account",
            })
        }
        
        const flag = await bcrypt.compare(password, result.password)
        // console.log(flag)
        if(flag){
            // console.log(flag)
            res.json({
                id : result.id,
                name : result.name
            })
        }
        else {
            return res.status(401).json({
                success : false,
                message: "Invalid password",
            })
        }
    }
    catch(err){
                res.status(500).json({
                success : false,
                message: "Internal Server error",
                error : err
            })
    }

}

exports.getAllUser = async (req , res)=>{
    try{
        // const id = req.params.id
        const result = await user.getAllUser()
        res.json(result[0])
    }
    catch(err){
        res.status(500).json({
                success : false,
                message: "Internal Server error",
                error : err
            })
    }

}