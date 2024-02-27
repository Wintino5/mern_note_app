import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

function Home({
    setShowNoteForm,
    setEditNote,
    notes,
    setNotes }) {

    useEffect(() => {
        axios.get('/api/notes')
            .then((res) => {
                setNotes(res.data)
            })
    }, [])

    const handleEditNote = (note) => {
        setEditNote(note)
        setShowNoteForm(true)
    }

    const deleteNote = async (note_id, index) => {

        const confirmDelete = window.confirm('Are you sure you want to delete this note?')

        if (confirmDelete) {
            await axios.delete('/api/note/' + note_id)

            notes.splice(index, 1)

            setNotes([...notes])
        } else {
            console.log('Deletion canceled by user')
        }

        setEditNote(null)
    }

    return (
        <div>
            <h1>Welcome Note Taker</h1>

            <main className="notes-output">
                {!notes.length && <h2>Add some notes!!</h2>}
                
                {notes.map((note, index) => (
                    <div key={note._id} className="note">
                        <h3>{note.text}</h3>
                        <p>Created On: {dayjs(note.createdAt).format('MM/DD/YYYY hh:mm a')}</p>
                        <div>
                            <button onClick={() => handleEditNote(note)} className="edit-btn">Edit Note</button>
                            <button onClick={() => deleteNote(note._id, index)} className="delete-btn">Delete Note</button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}

export default Home