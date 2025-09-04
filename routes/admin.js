const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminrouter = express.Router()
const {Adminmodel} = require('../db')
const JWT_ADMIN_PASSWORD = "256ad"

adminrouter.post('/login',async(req,res)=>{
    const {email, password}=req.body

    const admin = await Adminmodel.findOne({
        email:email
    })

    
    if(!admin){
        res.status(403).json({
            message:"Admin does not exist in our db"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password,admin.password)


    if(passwordMatch){
            const token = jwt.sign({
                id:admin._id.toString()
            },JWT_ADMIN_PASSWORD)
            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                message:'Incorrect credentials'
            })
        }
})

adminrouter.post('/signup',async(req,res)=>{
   const {email,password, first_name,last_name} = req.body
    const hashedPassword = await bcrypt.hash(password,5)

    await Adminmodel.create({
        email:email,
        password:hashedPassword,
        first_name:first_name,
        last_name:last_name
    })

    res.json({
        message:"signed Up successfully"
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