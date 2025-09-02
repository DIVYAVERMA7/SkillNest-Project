require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const app = express()
const mongoUrl = process.env.MONGO_URL
const port = process.env.PORT

const courserouter= require('./routes/course')
const userrouter= require('./routes/user')
const adminrouter = require('./routes/admin')

app.use('/user',userrouter)
app.use('/course',courserouter)
app.use('/admin',adminrouter)

async function main(){
    await mongoose.connect(mongoUrl)
    app.listen(port)
    console.log("listening to port 3000")
}

main()