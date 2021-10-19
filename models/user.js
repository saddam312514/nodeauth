const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      
    },
    lastName: {
        type: String,
        required: true
       
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator(value){
                return validator.isEmail(value)
            },
            message: 'Must be a valid Email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator(value){
                return !value.toLowerCase().includes('password')
            },
            message: "Password must not contain password"
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
  
}, {timestamps: true})

userSchema.pre('save', async function(next){
    const hashedPassword = await bcrypt.hash(this.password, 10)
   if(this.isModified){
    this.password = hashedPassword
   
   }
   next()
})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateAuthToken = function(){
   const token =  jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, {expiresIn: '4h'})
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User