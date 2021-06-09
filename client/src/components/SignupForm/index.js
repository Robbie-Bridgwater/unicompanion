import React from "react";

function SignUpForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="auth-form">
      <div className="form-inner">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={props.onChangeName}
            value={props.valueName}
            className="auth-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={props.onChangeEmail}
            value={props.valueEmail}
            className="auth-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={props.onChangePass}
            value={props.valuePass}
            className="auth-input"
          />
        </div>
        <br />
        <input type="submit" value="SIGNUP" className="auth-input" />
      </div>
    </form>
  );
}

export default SignUpForm;
