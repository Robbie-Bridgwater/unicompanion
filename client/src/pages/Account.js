import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { Container, Row, Col } from "../components/Grid";
import userAPI from "../utils/userAPI";
import UserAccount from "../components/UserAccount";
import "./Account.css";

const Account = () => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    userAPI.getSession().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    userAPI.authenticateUser(details).then((res) => {
      if (res.status === 200) {
        userAPI.getSession().then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
          }
        });
      }
    });
    setDetails({ email: "", password: "" });
  };

  if (loggedIn === true) {
    return (
      <div>
        <UserAccount />
      </div>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col size="5">
            <div id="account">
              <LoginForm
                onSubmit={submitHandler}
                onChangeEmail={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                onChangePass={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                valueEmail={details.email}
                valuePass={details.password}
                error={error}
              />
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
