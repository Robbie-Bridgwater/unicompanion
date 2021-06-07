import React from "react";
import Wrapper from "../components/Wrapper";
import ContactForm from "../components/ContactForm";
import Header from "../components/Header";
import ParallaxImage from '../components/Parallax';


const About = (props) => {
    return (
        
        <Wrapper>
            <ParallaxImage />
            
            <div className="row">
                <div className="col-8">
                    <Header title="About Us" />
                     <p></p>
                </div>
                <div className="col-4">
                    <ContactForm />
                </div>
            </div>


        </Wrapper>
    )
}

export default About