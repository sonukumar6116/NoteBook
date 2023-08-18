import React, { useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import NoteContext from '../Context/notes/NoteContext';

export default function Navbar() {

      const context = useContext(NoteContext)
      const { notes } = context;

      let Navigate = useNavigate()

      const handleLogout = () => {
            localStorage.clear()
            Navigate("/login")
      }

      let location = useLocation();
      useEffect(() => {
      }, [location]);

      return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                  <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                              Navbar
                        </Link>
                        <button
                              className="navbar-toggler"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                        >
                              <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                          <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                                                Home
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                                                About
                                          </Link>
                                    </li>
                              </ul>
                              {!localStorage.getItem('token') ?
                                    <form className="d-flex" role="search">
                                          <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
                                          <Link className="btn btn-outline-primary" to="/signin" role="button">Signin</Link>

                                    </form> : <form className="d-flex" role="search">
                                          <div className="dropdown-center">
                                                <button
                                                      className="btn btn-primary dropdown-toggle"
                                                      type="button"
                                                      data-bs-toggle="dropdown"
                                                      aria-expanded="false"
                                                >
                                                      <i className="fa-solid fa-user-pen" /> Account
                                                </button>
                                                <ul className="dropdown-menu">
                                                      <li>Name : <span>{localStorage.getItem("name")}</span></li>
                                                      <li>Email : <span>{localStorage.getItem("email")}</span></li>
                                                      <li><h6>Notes's No.<span className="badge bg-secondary">{notes.length}</span></h6></li>
                                                </ul>
                                          </div>
                                          <button className="btn btn-outline-primary mx-1" type="button" onClick={handleLogout}>Logout</button>
                                    </form>
                              }
                        </div>
                  </div>
            </nav>

      )
}
