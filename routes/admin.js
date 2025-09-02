const express = require('express')
const adminrouter = express.Router()
const { Adminmodel} = require('../db')

adminrouter.post('/login',(req,res)=>{
     res.json({
        message:"login endpoint"
    })
})

adminrouter.post('/signup',(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

adminrouter.post('/course',(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

adminrouter.put('/course',(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

adminrouter.get('/course/bulk',(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

module.exports= adminrouter