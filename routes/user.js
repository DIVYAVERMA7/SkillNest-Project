const express = require('express')
const { Usermodel} = require('../db')

const userrouter = express.Router()
userrouter.post('/login',async(req,res)=>{
     res.json({
        message:"login endpoint"
    })
})

userrouter.post('/signup',(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

userrouter.get('/Courses',(req,res)=>{
    
})

userrouter.get('/purchases',(req,res)=>{
    
})

userrouter.post('/purchase',(req,res)=>{
    
})

module.exports= userrouter