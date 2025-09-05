const express=require('express')
const courserouter = express.Router()
const {Purchasesmodel,Coursemodel} = require('../db')
const { userMiddleware } = require('../middleware/user')

courserouter.post('/purcahse',userMiddleware,async (req,res)=>{
    const userId = req.userId
    const courseId = req.body.courseId

    await Purchasesmodel.create({
        userId,courseId
    })

    res.json({
        message:"you have successfully bought the course"
    })
})

courserouter.get('/preview',async (req,res)=>{
    const courses = await Coursemodel.find({})
    res.json({
        courses
    })
})

module.exports=courserouter