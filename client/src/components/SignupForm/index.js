import React, { useState } from "react";
import userAPI from "../../utils/userAPI";

function SignUpForm(props) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    userAPI.createUser(details);
    setDetails({ name: '', email: '', password: '' });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <br />
        <input type="submit" value="SIGNUP" />
      </div>
    </form>
  );
}

export default SignUpForm;