import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from "../Context/Alert/AlertContext";


export default function Login() {

      const context = useContext(AlertContext);
      const { showalert } = context;

      const host = "http://localhost:5000"

      let Navigate = useNavigate();

      let userlogin = async (e) => {
            e.preventDefault()
            const response = await fetch(`${host}/api/auth/login`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ email: crendentials.email, password: crendentials.password }),
            });

            const json = await response.json();
            
            if (json.success) {
                  localStorage.setItem("token", json.authtoken)
                  localStorage.setItem("name", json.username)
                  localStorage.setItem("email", json.email)
                  showalert("login Successfully","primary")
                  Navigate("/")
            } else {
                  showalert("invalid credentials","danger")
            }
      }

      let [crendentials, setCrendentials] = useState({ email: "", password: "" })

      const onchange = (e) => {
            setCrendentials({ ...crendentials, [e.target.name]: e.target.value })
      }

      return (
            <form onSubmit={userlogin}>
                  <h1>Please Login to Continue iNoteBook</h1>
                  <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                              Email address
                        </label>
                        <input
                              type="email"
                              className="form-control"
                              id="email"
                              aria-describedby="emailHelp"
                              name='email'
                              onChange={onchange}
                        />
                        <div id="emailHelp" className="form-text">
                              We'll never share your email and notes with anyone else :  )
                        </div>
                  </div>
                  <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                              Password
                        </label>
                        <input
                              type="password"
                              className="form-control"
                              id="password"
                              name='password'
                              onChange={onchange}
                        />
                  </div>
                  <button type="submit" className="btn btn-primary">
                        Submit
                  </button>
            </form>

      )
}
// 