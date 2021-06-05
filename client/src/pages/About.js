import React from "react";
import Wrapper from "../components/Wrapper";
import ContactForm from "../components/ContactForm";
import Header from "../components/Header ";
import Image1 from "../assets/img/birmingham_university.jpg";


const About = (props) => {
    return (

        <Wrapper>
            <div className="row">
                <div className="col-8">
                    <img src={Image1}
                    width ="100%" className="img=responsive"></img>
                    <Header title="About Us" />
                   
                   
                    <p></p>
                </div>
                <div className="col-3">
                    <ContactForm />
                </div>
            </div>


        </Wrapper>
    )
}

export default About