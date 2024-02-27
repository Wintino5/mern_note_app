const router = require('express').Router()
const api_controller = require('../controllers/api_controller')

// Create Note
router.post('/notes', api_controller.createNote)

// Get All Notes
router.get('/notes', api_controller.getNotes)

// Get One Note By ID
router.get('/note/:id', api_controller.getNote)
// Update Note
// PUT Route that gets passed a note id and a json body that contains a text property with the new text value
router.put('/note/:id', api_controller.updateNote)

// Delete Note
router.delete('/note/:id', api_controller.deleteNote)

module.exports = router