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
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    userAPI.getSession().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const submitHandlerLogin = (e) => {
    e.preventDefault();
    userAPI.authenticateUser(details).then(
      (res) => {
        if (res.status === 200) {
          userAPI.getSession().then((res) => {
            if (res.status === 200) {
              setIsLoggedIn(true);
            }
          });
        }
      },
      () => {
        setError("Incorrect email or password");
      }
    );
  };

  const submitHandlerSignup = (e) => {
    e.preventDefault();
    userAPI.createUser(signupDetails).then(
      (res) => {
        setDetails(res.data);
        userAPI.authenticateUser(signupDetails).then((res) => {
          if (res.status === 200) {
            userAPI.getSession().then((res) => {
              if (res.status === 200) {
                setIsLoggedIn(true);
                setDetails(signupDetails);
              }
            });
          }
        });
      },
      () => {
        setSignupError("Please fill in your details above");
      }
    );
  };

  if (loggedIn === true) {
    return <UserAccount />;
  }

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col size="5">
            <div id="account">
              <LoginForm
                onSubmit={submitHandlerLogin}
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
              <SignupForm
                onSubmit={submitHandlerSignup}
                onChangeName={(e) =>
                  setSignupDetails({ ...signupDetails, name: e.target.value })
                }
                onChangeEmail={(e) =>
                  setSignupDetails({ ...signupDetails, email: e.target.value })
                }
                onChangePass={(e) =>
                  setSignupDetails({
                    ...signupDetails,
                    password: e.target.value,
                  })
                }
                valueEmail={signupDetails.name}
                valueEmail={signupDetails.email}
                valuePass={signupDetails.password}
                error={signupError}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Account;
