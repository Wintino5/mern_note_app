const Note = require('../models/Note')

module.exports = {
    async createNote(req, res) {
        const note = await Note.create(req.body)

        res.json(note)
    },
    async getNotes(req, res) {
        const notes = await Note.find()

        res.json(notes)
    },
    async getNote(req, res) {
        const note_id = req.params.id

        const note = await Note.findById(note_id)

        res.json(note)
    },
    async updateNote(req, res) {
        const updateNote = await Note.findByIdAndUpdate({
            _id: req.params.id
        }, {
            text: req.body.text
        }, { new: true })

        res.json(updateNote)
    },
    async deleteNote(req, res) {
        await Note.deleteOne({
            _id: req.params.id
        })

        res.json({
            Message: "Note deleted Successfully"
        })
    }
}