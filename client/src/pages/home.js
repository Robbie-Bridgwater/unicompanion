import React from "react";
import Wrapper from "../components/Wrapper";
import ParallaxImage from "../components/Parallax";
import { Row } from "../components/Grid";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <Wrapper>
      <ParallaxImage />
      <Row>
        <h1 id="home-welcome">Welcome</h1>
        <p id="home-intro">
          Hello and welcome to the UniCompanion website. Once signed up and
          logged in, as a student, you will be able sign up to sports and
          societies of your choice. If you navigate to the calendar page, you
          will be able to view all upcoming events for the sports and societies
          that you have signed up for.
          <br></br>
          <br></br>
          As a teacher or sport/society leader, you will be able to add events
          to the calendar for your chosen sport or society, so that the students
          know about the exciting events coming up that they are interested in.
        </p>
      </Row>
      <Row>
        <NavLink exact to="/account" id="ls-btn-div">
          <button type="button" id="login-signup-btn">
            LOGIN/SIGNUP
          </button>
        </NavLink>
      </Row>
    </Wrapper>
  );
};

export default Home;
