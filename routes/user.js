const express = require('express')
const bcrypt = require('bcrypt')
const { Usermodel} = require('../db')

const userrouter = express.Router()

userrouter.post('/login',async(req,res)=>{
     res.json({
        message:"login endpoint"
    })
})

userrouter.post('/signup',async(req,res)=>{
    const {email,password, first_name,last_name} = req.body
    const hashedPassword = await bcrypt.hash(password,5)

    await Usermodel.create({
        email:email,
        password:hashedPassword,
        first_name:first_name,
        last_name:last_name
    })

    res.json({
        message:"signed Up successfully"
    })
})

userrouter.get('/Courses',(req,res)=>{
    
})

userrouter.get('/purchases',(req,res)=>{
    
})

userrouter.post('/purchase',(req,res)=>{
    
})

module.exports= userrouter