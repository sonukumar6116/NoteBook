import React, { useState, useContext } from 'react'
import AlertContext from '../Context/Alert/AlertContext';
import NoteContext from '../Context/notes/NoteContext'

export default function Addnote() {

      const context = useContext(NoteContext);
      const { addnote } = context;
      
      const alecontext = useContext(AlertContext);
      const { showalert } = alecontext;

      const [note, setNote] = useState({ title: "", description: "", tag: "" })

      const handleclick = (e) => {
            e.preventDefault();
            addnote(note.title, note.description, note.tag);
            showalert("Note Added Successefully","success");
            setNote({title: "", description: "", tag: "" })
      }

      const onChange = (e) => {
            setNote({ ...note, [e.target.name]: e.target.value })
      }

      return (
            <>
                  <form className='container my-3'>
                        <h2 className='text-center'>Add Notes</h2>
                        <div className="mb-3">
                              <label htmlFor="title" className="form-label">
                                    Title
                              </label>
                              <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={note.title}
                                    onChange={onChange}
                              />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="description" className="form-label">
                                    Description
                              </label>
                              <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={note.description}
                                    onChange={onChange}
                              />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="tag" className="form-label">
                                    Tag
                              </label>
                              <input
                                    type="text"
                                    className="form-control"
                                    id="tag"
                                    name="tag"
                                    value={note.tag}
                                    onChange={onChange}
                              />
                        </div>
                        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>
                              Add Note
                        </button>
                  </form>
            </>
      )
}
