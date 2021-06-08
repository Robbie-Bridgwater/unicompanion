import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "../Grid";
import Wrapper from "../Wrapper";
import userAPI from "../../utils/userAPI";
import userImg from "../../assets/img/user_placeholder.png";
import "./style.css";

function UserAccount(props) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    userAPI.getSession().then((res) => {
      console.log(res);
      setDetails(res.data);
    });
  }, []);

  const currentPass = useRef();
  const newPass = useRef();

  const handleCurrentPassword = (e) => {
    e.preventDefault();
    currentPass.current.value = "";
    const pass = newPass.current.value;
    const id = details._id;
    console.log(pass, id);
    userAPI.updatePassword({ id, pass });
    newPass.current.value = "";
  };

  const handleLogout = () => {
    userAPI.endSession();
    window.location.reload();
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col size="10">
            <div className="account-card card mt-5 mb-3 w-50 mw-50 ">
              <div className="card-inner">
                <div className="card-header inline account-header">
                  <span>Account Management</span>
                  <button onClick={handleLogout} className="float-end">
                    LOGOUT
                  </button>
                </div>
                <div className="card-body text-dark">
                  <img
                    className="mb-3 border"
                    src={userImg}
                    width="100px"
                    height="100px"
                    alt="user"
                  ></img>
                  <p className="card-text">
                    <strong>Full Name: {details.name}</strong>
                  </p>
                  <p className="card-text">
                    <strong>Email Address: {details.email}</strong>
                  </p>
                  <h6>Update Password:</h6>
                  <div className="mt-4 mb-3">
                    <label className="form-label">Current Password:</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={currentPass}
                    />
                  </div>
                  <div className="mt-4 mb-3">
                    <label className="form-label">New Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      ref={newPass}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleCurrentPassword}
                    className="mt-2"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default UserAccount;
