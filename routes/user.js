const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Usermodel} = require('../db')

const userrouter = express.Router()

const jwt_key = process.env.JWT_USER_Password
userrouter.post('/login',async(req,res)=>{
    const {email, password}=req.body

    const user = await Usermodel.findOne({
        email:email
    })

    
    if(!user){
        res.status(403).json({
            message:"User does not exist in our db"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password,user.password)


    if(passwordMatch){
            const token = jwt.sign({
                id:user._id.toString()
            },jwt_key)
            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                message:'Incorrect credentials'
            })
        }
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