const {Schema, model} = require('mongoose')

const noteSchema = new Schema({
    text: {
        type: String,
        required: true,
        minLength: [4, '4 characters minimum needed for your note']
    }
}, {
    timestamps: true
})

const Note = model('Note', noteSchema)

module.exports = Note