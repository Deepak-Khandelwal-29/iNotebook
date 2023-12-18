import {useContext, useState} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const {addNote} = useContext(noteContext)
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleclick = () => {
        addNote(note.title, note.description, note.tag)
        props.showAlert("Note added Successfully", "success" )
        setNote({title: "", description: "", tag: ""})

    }
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})

    }
    return (
        <>
            <div className={"container my-3"}>
                <h2>iNotebook</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name={"title"}
                           value={note.title} onChange={onchange} placeholder="Title"/>
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name={"tag"}
                           value={note.tag} onChange={onchange} placeholder="tag"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name={"description"} placeholder="Description"
                              value={note.description} onChange={onchange} rows="5"></textarea>
                </div>
                <button type={"submit"} className={"btn btn-primary"} onClick={handleclick}>Add Note</button>
            </div>
        </>
    )
}

export default AddNote