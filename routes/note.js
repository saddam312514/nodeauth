const express = require('express')


const router = express()


const {addNote,getAllNotes, updateNote} = require('../controllers/noteController')
const {auth} = require('../middleware/auth')

router.post('/note', auth, addNote)
router.get('/notes', getAllNotes)
router.put('/note/:noteId',auth, updateNote)


module.exports = router