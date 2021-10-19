 const express = require('express')

 const mongoose = require('mongoose')
 const cors = require('cors')
 const {connectDB} = require('./db/dbConnection')
 const cookieParser = require('cookie-parser')


 const userRoute = require('./routes/user')
 const noteRoute = require('./routes/note')
 const testRoute = require('./routes/test')

 require('dotenv').config({
    path: './config/key.env'
})




 const app = express()


 const PORT = process.env.PORT || 3000



 app.use(cors())
 app.use(express.json())
 app.use(cookieParser(process.env.COOKIES_SECRET))

 // Connection database


app.use('/api', userRoute)

app.use('/api', noteRoute)
app.use('/api', testRoute)

// connection to database

connectDB()






 app.listen(PORT, () => {
     console.log(`Server is running on port: ${PORT}`)
 })

