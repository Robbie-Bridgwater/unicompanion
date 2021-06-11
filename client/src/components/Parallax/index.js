import { Parallax } from "react-parallax";
import backgroundImage from "../../assets/img/parallax.jpg";
import React from "react";
import "./style.css";

const ParallaxImage = () => {
  return (
    <Parallax
      bgImage={backgroundImage}
      bgImageAlt="Parallax Image"
      strength={-125}
    >
      <div style={{ height: "250px" }} />
    </Parallax>
  );
};

export default ParallaxImage;
