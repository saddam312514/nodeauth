const express = require('express')
const {check} = require('express-validator')

const router = express()

router.get('/devs',(res,res) => {
    res.status(400).json({
        msg: 'Success'
    })
})


module.exports = router