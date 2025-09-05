require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminrouter = express.Router()
const {Adminmodel, Coursemodel} = require('../db')
const { adminMiddleware } = require('../middleware/admin')

const jwt_admin_key = process.env.JWT_ADMIN_PASSWORD

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
            },jwt_admin_key )
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

adminrouter.post('/course',adminMiddleware, async(req,res)=>{
    const adminId = req.adminId
    const {title,description,price,imageurl} = req.body

   const course =  await Coursemodel.create({
        title:title,
        description:description,
        price:price,
        imageurl:imageurl,
        creator_id:adminId
    })

    res.json({
        message:"Course created",
        courseId:course.id
    })
})

adminrouter.put('/course',adminMiddleware, async (req,res)=>{
    const adminId = req.adminId
    const {title,description,price,imageurl,courseId} = req.body

   const course =  await Coursemodel.updateOne({
    _id:courseId,
    creator_id:adminId},{
        title:title,
        description:description,
        price:price,
        imageurl:imageurl,
    })

    res.json({
        message:"Course updated",
        courseId:course.id
    })
})

adminrouter.get('/course/bulk',adminMiddleware, async(req,res)=>{
   const adminId = req.adminId

   const courses =  await Coursemodel.find({
    creator_id:adminId})

    res.json({
        message:"Courses fetched",
        courses
    })
})

module.exports= adminrouter