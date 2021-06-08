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
        <div className="col-8">
          <AboutUs title="About Us" />
          <p></p>
        </div>
        <div className="col-4">
          <ContactForm />
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
