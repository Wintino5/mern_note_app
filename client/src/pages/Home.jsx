import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import {useStore} from '../store'

function Home() {
    const {state, setState} = useStore()

    useEffect(() => {
        axios.get('/api/notes')
            .then((res) => {
                setState({
                    ...state,
                    notes: res.data
                })
            })
    }, [])

    const handleEditNote = (note) => {
        setState({
            ...state,
            editNote: note,
            showNoteForm: true
        })
    }

    const deleteNote = async (note_id, index) => {

        const confirmDelete = window.confirm('Are you sure you want to delete this note?')

        if (confirmDelete) {
            await axios.delete('/api/note/' + note_id)

            state.notes.splice(index, 1)

            setState({
                ...state,
                notes: [...state.notes]
            })
        } else {
            console.log('Deletion canceled by user')
        }

        setState({
            ...state,
            editNote: null
        })
    }

    return (
        <div>
            <h1>Welcome Note Taker</h1>

            <main className="notes-output">
                {!state.notes.length && <h2>Add some notes!!</h2>}

                {state.notes.map((note, index) => (
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