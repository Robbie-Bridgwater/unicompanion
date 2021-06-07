import React from "react";

function SignUpForm(props) {

  return (
    <form onSubmit={props.onSubmit}>
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
          />
        </div>
        <br />
        <input type="submit" value="SIGNUP" />
      </div>
    </form>
  );
}

export default SignUpForm;