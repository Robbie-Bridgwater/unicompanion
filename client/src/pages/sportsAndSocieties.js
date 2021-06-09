import React from "react";
import Wrapper from "../components/Wrapper";
import ParallaxImage from "../components/Parallax";
import Form from "../components/Form";
import "../App.css";

const sportsAndSocieties = () => {
  return (
    <Wrapper>
      <ParallaxImage />
      <div className="snsHeader">
        <h1>Sports & Societies</h1>
      </div>
      <Form />
    </Wrapper>
  );
};

export default sportsAndSocieties;
