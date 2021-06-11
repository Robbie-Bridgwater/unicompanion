import React from "react";
import "./style.css";

function AboutUs(props) {
  return (
    <div>
      <h1 className="Header" style={{ marginBottom: "40px" }}>
        {props.title}
      </h1>

      <p>
        As students, or alumni, we are aware of some of the gaps in university
        apps/portals when it comes to the support from their student body.
        Existing web apps, from our experience, are cumbersome and lacking
        resources, which most students would find beneficial on a day-to-day
        basis.
        <br></br>
        <br></br>
        We have been able to create a web app which provides a single location
        for students to view their course timetables, resources and university
        events quickly and easily. In addition, the web app will allow students
        to easily sign up to societies or sports teams; extracurricular
        activities are proven to enhance the student experience and making them
        more accessible will likely increase their uptake.
        <br></br>
        <br></br>
        Our main aim is to create a sense of community between all students, so
        no one feels alone during their time at university. Should students feel
        the need to reach out to us for any more help/advice, whether it be,
        needing help with picking up these extra curricular activities or if
        they simply just want to talk to someone, so the feeling of university
        isn't so daunting we are here to help! Simply get in touch using the
        contact form to the right and we will back to you as soon as we can.
      </p>
    </div>
  );
}
export default AboutUs;
