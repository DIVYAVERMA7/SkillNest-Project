require('dotnev').config()

function userMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token,process.env.JWT_USER_Password)

    if(decoded){
        req.userId = decoded.userId
        next()
    }else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }

}

module.exports={
    userMiddleware
}