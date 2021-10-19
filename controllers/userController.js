const User = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

exports.addUserController = async(req,res)  => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }
    const pickedProperty = _.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'confirmPassword'])
    const user = new User(pickedProperty)
    try{
        const foundUser = await User.findOne({email: req.body.email})
        if(foundUser) return res.status(400).send('User Allready Register')
    await user.save()
    res.send(user)

    }catch(err){
        res.status(500).send(err)
    }
    
}


exports.getAllUsers = async(req,res) => {
    try{
        const users = await User.find({}, '-password')
        res.send(users)

    }catch(err){
        res.status(400).send(err)
    }
}

exports.getUserController = async(req,res) => {
    const id = req.user._id
   try{
       const user = await User.findById(id, '-password')
       if(!user) return res.status(404).send('User not Exit')
       res.send(user)

   }catch(err){
       res.status(400).send(err)
   }
}

exports.login = async(req,res,next) => {
    const {email , password} = req.body
    if(!email || !password ) {
        res.json({message: 'Credential not found'})
    }

    const user = await User.findOne({email})
    if(!user) {
        res.json({message: "Invalid email or password"})
    }
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        res.json({message: "Don't match"})
    }

   const token =  user.generateAuthToken()
  res.cookie('auth', token , {
      httpOnly: true,
      sameSite: true,
      signed: true,
      maxAge: 4* 60*60*1000
  })
   //res.header('x-auth-token',token)
    res.status(400).json({
        user,
        token
    })




}

exports.logout = async(req,res) => {
    res.clearCookie('auth')
    res.send('Successfully Logout')
}

