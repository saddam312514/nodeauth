const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
      
    },
    description: {
        type: String,
       
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note