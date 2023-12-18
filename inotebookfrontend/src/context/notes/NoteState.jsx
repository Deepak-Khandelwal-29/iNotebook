import NoteContext from "./NoteContext";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Loader from "../../components/Loader";
import {useNavigate} from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/notes";
const JWT_TOKEN = localStorage.getItem('token')

const NoteState = (props) => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (JWT_TOKEN === null){
            navigate('/login')
        }
        (async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/allnotes`, {
                    headers: {
                        Authorization: `Bearer ${JWT_TOKEN}`,
                    },
                });
                const data = response.data;
                setNotes(data.notes);
                setLoading(false)
            } catch (error) {
                console.error("Error occurred:", error);
            }
        })();
    }, []);

    // Add a Note
    const addNote = async (title, description, tag) => {
        console.log("Note Added")
        try {
            const response = await axios.post(
                `${API_BASE_URL}/addnotes`,
                {
                    title: title,
                    description: description,
                    tag: tag,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JWT_TOKEN}`
                    },
                }
            );
            const data = response.data;
            setNotes([...notes, data.savedNote])
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    // update a Note
    const deleteNote = async (id) => {

        try {
            const response = await axios.delete(
                `${API_BASE_URL}/deletenotes/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JWT_TOKEN}`
                    },
                }
            );
            const data = response.data;
            console.log(data.message);
            setNotes(notes.filter((note) => note._id !== id))
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
    // update a Note
    const updateNote = async (id, title, description, tag) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/updatenotes/${id}`,
                {
                    title: title,
                    description: description,
                    tag: tag,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JWT_TOKEN}`
                    },
                }
            );
            const data = response.data;
            const updatedNote = data.updatedNote
            const noteIndex = notes.findIndex((note) => note._id === id);

            if (noteIndex !== -1) {
                // Create a copy of the current notes state
                const updatedNotes = [...notes];
                // Update the note at the found index
                updatedNotes[noteIndex] = updatedNote;
                // Set the state with the updated notes array
                setNotes(updatedNotes);
            }

        } catch (error) {
            console.error("Error occurred:", error);
        }
    }


    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <NoteContext.Provider value={{notes, addNote, updateNote, deleteNote}}>
                    {props.children}
                </NoteContext.Provider>
            )}
        </>
    )
}

export default NoteState;
