const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports.admin = async(req,res,next) => {
    
     if(!req.user.isAdmin)
     return res.status(403).json({
         error: 'you are not allowed to acccess'
     })
     next()
}