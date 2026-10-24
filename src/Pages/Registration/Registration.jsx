import React, { useState } from "react";
import './Registration.css';

function Registration() {
  const [registrationDetails, setRegistrationDetails] = useState({
    name: '',
    phoneNumber: '',
    emailAddress: '',
    password: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const Register = () => {
    fetch('http://localhost:3000/user/registration', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationDetails)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <div className="login-page">
      <form className="login-form d-flex flex-column row-gap-2 justify-content-center">
        <h1>Please Register</h1>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInputName"
            placeholder="Name"
            name="name"
            onChange={handleInput}
            value={registrationDetails.name}
          />
          <label htmlFor="floatingInputName">Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            id="floatingInputPhone"
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleInput}
            value={registrationDetails.phoneNumber}
          />
          <label htmlFor="floatingInputPhone">Phone Number</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInputEmail"
            placeholder="Email Address"
            name="emailAddress"
            onChange={handleInput}
            value={registrationDetails.emailAddress}
          />
          <label htmlFor="floatingInputEmail">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={registrationDetails.password}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-success w-100"
          onClick={Register}
          type="button"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
