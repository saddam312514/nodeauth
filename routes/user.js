const express = require('express')
const {check} = require('express-validator')

const router = express()


const {addUserController, getAllUsers,getUserController,login,logout} = require('../controllers/userController')
const {auth} = require('../middleware/auth')
const {admin} = require('../middleware/admin')


router.post('/user', 
[
    check('firstName', 'First Name is Required').notEmpty(),
    check('lastName', 'last Name is Required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email Must be valid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'password must contain 6 character').isLength({min:6}),
    check('confirmPassword', 'confirmPassword is required').notEmpty(),
    check('confirmPassword').custom((value , {req}) => {
        if(value !== req.body.password){
            throw new Error('Confirm password don\'t match')
        }else{
            return true
        }
    })
],
addUserController)

router.get('/users', getAllUsers)
router.get('/me', auth, getUserController)
router.post('/login', login)
router.post('/logout', auth,logout)


module.exports = router