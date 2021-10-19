const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports.auth = async(req,res,next) => {
    if(req.signedCookies){
        const token = req.signedCookies['auth']

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)
            req.user = user
            next()

        }catch(err){
            return res.status(401).json({
                err: 'unthorized token'
            })
        }
       
    }else{
       return res.status(401).send('No token Unathorized')
    }
  
     
}