import {useContext, useRef, useState} from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Note = (props) => {
    const {notes, updateNote} = useContext(noteContext)
    const ref = useRef(null)
    const refclose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updatenote = (updatedNote) => {
        ref.current.click();
        setNote({
            id: updatedNote._id,
            etitle: updatedNote.title,
            edescription: updatedNote.description,
            etag: updatedNote.tag
        })

    }

    const handleclick = () => {
        console.log(note)
        updateNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Logged in Successfully", "success" )
        refclose.current.click()

    }
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                Launch modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name={"etitle"}
                                       value={note.etitle} onChange={onchange} placeholder="Title"/>
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name={"etag"}
                                       value={note.etag} onChange={onchange} placeholder="tag"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea className="form-control" id="edescription" name={"edescription"}
                                          value={note.edescription} placeholder="Description" onChange={onchange}
                                          rows="3"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary d-none"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row my-3"}>
                <h2>Your Notes</h2>
                {notes.length === 0 && <div className={"container my-3"}>
                    <h3>No Notes to Display</h3>
                </div>}
                {notes.map((note) => {
                    return (
                        <div key={note._id} className={"row"}>
                            <NoteItem showAlert={props.showAlert} updatenote={updatenote} note={note}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Note