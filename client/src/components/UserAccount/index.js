import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "../Grid";
import Wrapper from "../Wrapper";
import userAPI from "../../utils/userAPI";
import userImg from "../../assets/img/user_placeholder.png";
import "./style.css";
import Modal from "react-bootstrap/Modal";

function UserAccount(props) {
  const [details, setDetails] = useState({ name: "", email: "", password: "", sport: [], society: [] });

  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showErrorModal, setErrorModal] = useState(false);

  useEffect(() => {
    userAPI.getSession().then((res) => {
      userAPI.getUser(res.data._id).then((payload) => {
        setDetails(payload.data);
      });
    });
  }, []);

  const newPass = useRef();
  const confNewPass = useRef();

  console.log(details.sport);
  console.log(details.society);

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const id = details._id;
    const pass = newPass.current.value;
    const confPass = confNewPass.current.value;

    if (pass !== confPass || !pass || !confPass) {
      setErrorModal(true);
    } else {
      userAPI.updatePassword(id, pass);
      setSuccessModal(true);
      newPass.current.value = "";
      confNewPass.current.value = "";
    }
  };

  const handleLogout = () => {
    userAPI.endSession();
    window.location.reload();
  };

  const handleSubmitClose = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };

  return (
    <Wrapper>
      <Modal show={showSuccessModal} onHide={handleSubmitClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your password has been changed.</Modal.Body>
      </Modal>

      <Modal show={showErrorModal} onHide={handleSubmitClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Passwords do not match.</Modal.Body>
      </Modal>
      <Row>
        <Col size="md-10 lg-6">
          <div className="account-card card mt-5 mb-5 ">
            <div className="card-inner">
              <div className="card-header inline account-header">
                <span>Account Management</span>
                <button
                  onClick={handleLogout}
                  className="float-end"
                  id="logout-btn"
                >
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
                <strong>Update Password: </strong>
                <div className="mt-3 mb-3 pw-form-group">
                  <label className="ps-0 form-label">New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    ref={newPass}
                  />
                </div>
                <div className="mt-4 mb-3 pw-form-group">
                  <label className="ps-0 form-label">Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    ref={confNewPass}
                  />
                </div>
                <button
                  type="submit"
                  onClick={handlePasswordUpdate}
                  className="mt-2"
                  id="pw-update-btn"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </Col>

        <Col size="md-10 lg-6">
          <div className="card sns-account-card mt-5 mb-5">
            <div className="card-inner">
              <div className="card-header inline">
                <span>Sports & Societies</span>
              </div>
              <div className="card-body text-dark">
                <p className="card-text">
                  <strong>Sports: </strong>
                  {details.sport.join(", ")}
                </p>
                <p className="card-text">
                  <strong>Societies: </strong>
                  {details.society.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default UserAccount;
