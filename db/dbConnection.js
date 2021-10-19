
const mongoose = require('mongoose')
module.exports.connectDB = async() => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@new-project.rtp3t.mongodb.net/kochuri`, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        })
        console.log('Database connection')



    }catch(err){
        console.log(err)
    }
}