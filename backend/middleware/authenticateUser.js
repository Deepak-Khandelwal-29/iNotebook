const jwt = require('jsonwebtoken')
const jwtSec = "deepak2907@@"

const authenticateUser = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if (authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,jwtSec,(err,data)=>{
            if (err){
                return res.status(403).json({message: "Access Denied"})
            }
            req.user = data.user
            console.log(req.user)
            next()
        })
    } else {
        return res.status(401).json({ message: "Authentication failed" });
    }
}

module.exports = {authenticateUser, jwtSec}