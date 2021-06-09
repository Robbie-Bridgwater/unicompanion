import React from "react";
import Wrapper from "../components/Wrapper";
import ContactForm from "../components/ContactForm";
import AboutUs from "../components/AboutUs";
import ParallaxImage from "../components/Parallax";

const About = (props) => {
  return (
    <Wrapper>
      <ParallaxImage />

      <div className="row">
        <div className="col-md-8 p-3">
          <AboutUs title="About Us" />
        </div>
        <div className="col-md-4 p-3">
          <ContactForm />
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
