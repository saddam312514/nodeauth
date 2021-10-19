
const Note = require('../models/noteds')
const {chech,  validationResult} = require('express-validator')
exports.addNote = async(req,res)  => {

   const note = new Note({...req.body, owner: req.user._id})
   await note.save()
   res.json(note)

    
}

exports.getAllNotes = async(req,res) => {
    console.log(req.user)
    const notes = await Note.find().populate('owner', 'firstName')
    res.json(notes)
}


exports.updateNote = async(req,res) => {
    const id = req.params.noteId
    const gotNoteInput = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isAllouwed = gotNoteInput.every(update => {
        allowedUpdates.includes(update)
    })
    if(!isAllouwed) return res.status(400).send('Invalid updates')
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return res.status(400).send(errors.array())
    }
    try{
        const note = await Note.findOneAndUpdate({
            _id: id,
            owner: req.user._id
        }, req.body,{
            new: true,
            runValidators: true
        })
        if(!note) return res.status(404).send('Not found id')

    }catch(err){
        res.status(500).send('Not found')
    }
   
    
}