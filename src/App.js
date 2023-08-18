import React, { useContext } from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import AlertState from "./Context/Alert/AlertState";
import Alert from "./component/Alert";
import Signin from "./component/Signin";
import Login from "./component/Login";



function App() {

  return (

    <NoteState>
      <AlertState>
        <Router>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </AlertState>
    </NoteState>
  )
}

export default App;
