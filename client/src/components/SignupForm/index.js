import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

function SignUpForm(props) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

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
            type={passwordShown ? "text" : "password"}
            name="password"
            id="passwordInp"
            onChange={props.onChangePass}
            value={props.valuePass}
            className="auth-input"
          />
          <span className="pass-show">Show Password</span>
          <i className="pass-show" onClick={togglePasswordVisiblity}>
            {eye}
          </i>
        </div>
        <div className="form-group">
          <Form.Check
            id="super-user-check"
            onChange={props.onChangeSuperUser}
            checked={props.valueSuperUser}
            type="switch"
            label="Are you a leader of a sport or society?"
            style={{ marginTop: "50px" }}
          />
        </div>
        <br />

        {props.error !== "" ? (
          <div className="form-error error">{props.error}</div>
        ) : (
          ""
        )}
        <br />
        <input type="submit" value="SIGNUP" className="auth-input" />
      </div>
    </form>
  );
}

export default SignUpForm;
