import React from "react";

function LoginForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="auth-form">
      <div className="form-inner">
        <h2>Login</h2>
        {/* <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div> */}
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
        <input type="submit" value="LOGIN" />
      </div>
    </form>
  );
}

export default LoginForm;
