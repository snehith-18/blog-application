import React, { useState } from "react";
import './Login.css';

function Login() {
  const [loginForm, setLoginForm] = useState({
    emailAddress: '',
    password: ''
  });

  // Update state on input change
  function handleInput(e) {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Login function
  function login() {
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Login Response:', data);

        if (data.isMatched) {
          // ✅ Save UserId in session storage
          sessionStorage.setItem('UserId', data.UserId);
          alert("Login successful!");
          // Redirect to homepage if needed
          // window.location.href = '/';
        } else {
          alert(data.error || "Wrong Password");
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        alert("Server not reachable. Try again later.");
      });
  }

  return (
    <div className="login-page">
      <form className="login-form d-flex flex-column row-gap-2 justify-content-center">
        <h1>Please Login</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            name="emailAddress"
            placeholder="name@example.com"
            onChange={handleInput}
            value={loginForm.emailAddress}  // ✅ corrected
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            value={loginForm.password}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-success w-100"
          type="button"
          onClick={login}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
