import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Context/Alert/AlertContext';
import NoteContext from '../Context/notes/NoteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';

export default function Note() {
      const context = useContext(NoteContext);
      const { notes, getallnote, editnote } = context;

      const alecontext = useContext(AlertContext);
      const { showalert } = alecontext;

      const Navigate = useNavigate();

      useEffect(() => {
            if (localStorage.getItem('token')) { getallnote(); }
            else { Navigate("/login"); }

      }, [])

      const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

      const ref = useRef(null)
      const Closeref = useRef(null)

      const updatenote = (currentnote) => {
            setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
            ref.current.click();
      }

      const handleclick = (e) => {
            e.preventDefault();
            editnote(note.id, note.etitle, note.edescription, note.etag);
            Closeref.current.click();
            showalert("Note Updates Successefully", "warning");
      }

      const onChange = (e) => {
            setNote({ ...note, [e.target.name]: e.target.value })
      }

      return (
            <>
                  <Addnote />
                  <>
                        {/* Button trigger modal */}
                        <button
                              ref={ref}
                              type="button"
                              className="btn btn-primary d-none"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                        >
                              Launch demo modal
                        </button>
                        {/* Modal */}
                        <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                        >
                              <div className="modal-dialog">
                                    <div className="modal-content">
                                          <div className="modal-header">
                                                <h1 className="modal-title fs-8 text-warning" id="exampleModalLabel">
                                                      Edit Note
                                                </h1>
                                                <button
                                                      type="button"
                                                      className="btn-close"
                                                      data-bs-dismiss="modal"
                                                      aria-label="Close"
                                                />
                                          </div>
                                          <div className="modal-body">
                                                <div className="mb-3">
                                                      <label htmlFor="etitle" className="form-label text-primary">
                                                            Title
                                                      </label>
                                                      <input
                                                            type="text"
                                                            className="form-control"
                                                            id="etitle"
                                                            name="etitle"
                                                            value={note.etitle}
                                                            onChange={onChange}
                                                      />
                                                </div>
                                                <div className="mb-3">
                                                      <label htmlFor="edescription" className="form-label text-primary">
                                                            Description
                                                      </label>
                                                      <input
                                                            type="text"
                                                            className="form-control"
                                                            id="edescription"
                                                            name="edescription"
                                                            value={note.edescription}
                                                            onChange={onChange}
                                                      />
                                                </div>
                                                <div className="mb-3">
                                                      <label htmlFor="etag" className="form-label text-primary">
                                                            Tag
                                                      </label>
                                                      <input
                                                            type="text"
                                                            className="form-control"
                                                            id="etag"
                                                            name="etag"
                                                            value={note.etag}
                                                            onChange={onChange}
                                                      />
                                                </div>
                                          </div>
                                          <div className="modal-footer">
                                                <button
                                                      ref={Closeref}
                                                      type="button"
                                                      className="btn btn-secondary"
                                                      data-bs-dismiss="modal"
                                                >
                                                      Close
                                                </button>
                                                <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleclick}>
                                                      Save changes
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </>

                  <div className='my-3 container'>
                        <h2>Your Notes</h2>
                        {notes.length === 0 && "No notes :("}
                        {notes.map((note) => { return <Noteitem key={note._id} note={note} updatenote={updatenote} /> })}
                  </div>
            </>
      )

}
