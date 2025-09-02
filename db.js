const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const User = new Schema({
    email:{type:String, unique:true},
    password:String,
    first_name:String,
    last_name:String
})

const Admin = new Schema({
    email:{type:String, unique:true},
    password:String,
    first_name:String,
    last_name:String
})

const Course = new Schema({
    title:String,
    description:String,
    price:Number,
    imageurl:String,
    creator_id:ObjectId
})

const Purchases = new Schema({
    course_id:ObjectId,
    user_id:ObjectId
})

const Usermodel = mongoose.model('user',User)
const Adminmodel = mongoose.model('admin',Admin)
const Coursemodel = mongoose.model('course',Course)
const Purchasesmodel = mongoose.model('purchase',Purchases)

module.exports={
   Usermodel,
   Adminmodel,
    Coursemodel,
    Purchasesmodel
}