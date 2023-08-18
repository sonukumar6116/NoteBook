import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import AlertContext from "../Context/Alert/AlertContext";


export default function Signin() {

  const context = useContext(AlertContext);
  const { showalert } = context;

  const host = "http://localhost:5000"

  let Navigate = useNavigate();

  let userlogin = async (e) => {
    e.preventDefault()
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: crendentials.name, email: crendentials.email, password: crendentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken)
      Navigate("/")
      showalert("Created account Successfully", "primary")
    } else {
      showalert("invalid credentials", "danger")
    }
  }

  let [crendentials, setCrendentials] = useState({ email: "", password: "", name: "", cpassword: "" })
  const onchange = (e) => {
    setCrendentials({ ...crendentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container">
      <h1>Please Create a Account</h1>
      <form onSubmit={userlogin}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onchange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
//
