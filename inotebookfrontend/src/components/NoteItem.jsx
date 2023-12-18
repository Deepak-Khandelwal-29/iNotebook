import {useContext} from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const {note, updatenote, showAlert} = props
    const {deleteNote} = useContext(noteContext)
    return (
        <div>
            <div className="card my-3" style={{borderRadius: "15px"}}>
                <div className="card-body">
                    <h3 className="card-title">{note.title}</h3>
                    <h6 className="card-title">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                        updatenote(note)
                    }} style={{color: "#3d75d6"}}></i>
                    <i className="fa-solid fa-trash" style={{color: "#3d75d6"}} onClick={() => {
                        deleteNote(note._id); showAlert("Note deleted Successfully", "success" )
                    }}></i>
                </div>
            </div>
        </div>
    )
}
export default NoteItem