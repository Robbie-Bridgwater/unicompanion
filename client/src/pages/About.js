import React from "react";
import Wrapper from "../components/Wrapper";
import { Row, Col } from "../components/Grid";
import ContactForm from "../components/ContactForm";
import AboutUs from "../components/AboutUs";
import ParallaxImage from "../components/Parallax";

import "../App.css";

const About = (props) => {
  return (
    <Wrapper>
      <ParallaxImage />

      {/* <div className="row">
        <div className="col-md-8 p-3">
          <AboutUs title="About Us" />
        </div>
        <div className="col-md-4 p-3">
          <ContactForm />
        </div>
      </div> */}

      <Row>
        <Col 
          size="xs-12 sm-12 md-12 lg-6"
          myclass="d-flex justify-content-center"
        >
          <AboutUs 
            title="About Us"
          />
        </Col>

        <Col 
          size="xs-12 sm-12 md-12 lg-6"
          myclass="d-flex justify-content-center"
        >
          <ContactForm />
        </Col>
      </Row> 
    </Wrapper>
  );
};

export default About;
