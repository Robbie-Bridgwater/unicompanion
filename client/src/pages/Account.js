import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { Container, Row, Col } from "../components/Grid";
import "./Account.css";

const Account = () => {
  const history = useHistory();

  const adminUser = {
    email: "admin@email.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      setError("Details do not match!");
    }
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
  };

  const reroute = () => {
    history.push("");
  };


  return (
    <Wrapper>
      <Container>
        <Row>
          <Col size="5">
            <div id="account">
              {user.email !== "" ? (
                reroute()
              ) : (
                <LoginForm Login={Login} error={error} />
              )}
            </div>
          </Col>
          <Col size="5">
            <div id="account">
              <SignupForm />
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Account;
