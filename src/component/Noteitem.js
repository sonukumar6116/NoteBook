import React, { useContext } from 'react'
import AlertContext from '../Context/Alert/AlertContext';
import NoteContext from '../Context/notes/NoteContext'

export default function Noteitem(props) {
 
      const {updatenote,note} = props;
      const context = useContext(NoteContext);
      const alecontext = useContext(AlertContext);
      const { deleteNote } = context;
      const { showalert } = alecontext;

      const delclick = () =>{
            deleteNote(note._id)
            showalert("Note Deleted Successfully","danger")
      }

      return (
            <div className="card my-2 border border-warning-subtle rounded" >
                  <div className="card-body">
                        <div className="d-flex justify-content-between">
                              <h4 className="card-title">{note.title}</h4>
                              <div>
                                    <i className="fa-regular fa-trash-can" style={{ marginRight: "2rem" }} onClick={delclick}></i>
                                    <i className="fa-solid fa-file-pen" onClick={()=>{updatenote(note)}}></i>
                              </div>
                        </div>
                        <p className="card-text my-2">{note.description}</p>
                  </div>
            </div>
      )
}
