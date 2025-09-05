require('dotenv').config()
const jwt = require('jsonwebtoken')

function adminMiddleware(req,res,next){
    try{ const token = req.headers.token
    const decoded = jwt.verify(token,process.env.JWT_ADMIN_PASSWORD)

    if(decoded){
        req.adminId = decoded.adminId
        next()}
   
    }catch(e){
        res.status(403).json({
            message:"You are not signed in"
        })
    }

}

module.exports={
    adminMiddleware
}