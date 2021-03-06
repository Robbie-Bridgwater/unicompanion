import { React, useReducer, useState, useEffect } from "react";
import { Container, Row, Col } from "../Grid";
import FormItem from "../FormItem";
import { sports, societies } from "../FormData";
import userAPI from "../../utils/userAPI";
import "./style.css";
import Modal from "react-bootstrap/Modal";

export const Form = () => {
  // Managing state for which sports team they belong to
  const [isSports, setSports] = useReducer(
    (isSports, newIsSports) => ({ ...isSports, ...newIsSports }),
    {
      Football: false,
      Hockey: false,
      Rugby: false,
      Lacrosse: false,
    }
  );

  // Managing state for which societies they belong to
  const [isSocieties, setSocieties] = useReducer(
    // Reducer function accepts newIsSocieties and spreads the values onto the original isSocieties state object
    // This returns isSocieties with the new properties correctly updated
    (isSocieties, newIsSocieties) => ({ ...isSocieties, ...newIsSocieties }),
    // Properties defined here, as second argument of the useReducer hook
    {
      Film: false,
      Dance: false,
      Music: false,
      Drinking: false,
    }
  );

  const [details, setDetails] = useState({ id: "", sport: "", society: "" });

  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showErrorModal, setErrorModal] = useState(false);

  useEffect(() => {
    userAPI.getSession().then((res) => {
      setDetails(res.data);
    });
  }, []);

  const handleChange = (e) => {
    let sportsObj = isSports;
    let societiesObj = isSocieties;

    // Take the name from the input - name of society/team
    const name = e.target.value;

    switch (name) {
      case "Football":
        sportsObj.Football = !sportsObj.Football;
        setSports(sportsObj);
        break;
      case "Hockey":
        sportsObj.Hockey = !sportsObj.Hockey;
        setSports(sportsObj);
        break;
      case "Rugby":
        sportsObj.Rugby = !sportsObj.Rugby;
        setSports(sportsObj);
        break;
      case "Lacrosse":
        sportsObj.Lacrosse = !sportsObj.Lacrosse;
        setSports(sportsObj);
        break;
      case "Film":
        societiesObj.Film = !societiesObj.Film;
        setSocieties(societiesObj);
        break;
      case "Dance":
        societiesObj.Dance = !societiesObj.Dance;
        setSocieties(societiesObj);
        break;
      case "Music":
        societiesObj.Music = !societiesObj.Music;
        setSocieties(societiesObj);
        break;
      case "Drinking":
        societiesObj.Drinking = !societiesObj.Drinking;
        setSocieties(societiesObj);
        break;
      default:
        console.log(new Error());
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert object to an array of the keys
    const sportKeys = Object.keys(isSports);
    const societyKeys = Object.keys(isSocieties);
    // Initialize empty array
    let sport = [];
    let society = [];
    // Iterate over array, if key === true push key to array
    sportKeys.forEach((key, idx) => {
      if (isSports[key] === true) {
        sport.push(key);
      }
    });
    societyKeys.forEach((key, idx) => {
      if (isSocieties[key] === true) {
        society.push(key);
      }
    });
    // Convert the final array into a string
    // let sportString = sport.join(", ");
    // let societyString = society.join(", ");

    const id = details._id;

    // details.sport = sportString;
    // details.society = societyString;
    details.society = society;
    details.sport = sport;

    userAPI.addSocials(id, sport, society);

    if (sport.length === 0 && society.length === 0) {
      setErrorModal(true);
    } else {
      setSuccessModal(true);
    }
  };

  const handleSubmitClose = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };

  return (
    <li className="list-group-item">
      <Modal show={showSuccessModal} onHide={handleSubmitClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are now signed up to the selected sports and/or societies.
        </Modal.Body>
      </Modal>

      <Modal show={showErrorModal} onHide={handleSubmitClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please select at least one sport or society to sign up to.
        </Modal.Body>
      </Modal>

      <Row>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col
              size="xs-10 sm-10 md-6 lg-6"
              myclass="sportCol d-flex justify-content-center"
            >
              <div>
                <h4 className="header">Sports Teams</h4>
                <br></br>
                <FormItem
                  key={sports[0].id}
                  type={sports[0].type}
                  name={sports[0].name}
                  checked={isSports.Football}
                  description={sports[0].description}
                  email={sports[0].email}
                  handleChange={handleChange}
                />
                <FormItem
                  key={sports[1].id}
                  type={sports[1].type}
                  name={sports[1].name}
                  checked={isSports.Hockey}
                  description={sports[1].description}
                  email={sports[1].email}
                  handleChange={handleChange}
                />
                <FormItem
                  key={sports[2].id}
                  type={sports[2].type}
                  name={sports[2].name}
                  checked={isSports.Rugby}
                  description={sports[2].description}
                  email={sports[2].email}
                  handleChange={handleChange}
                />
                <FormItem
                  key={sports[3].id}
                  type={sports[3].type}
                  name={sports[3].name}
                  checked={isSports.Lacrosse}
                  description={sports[3].description}
                  email={sports[3].email}
                  handleChange={handleChange}
                />
              </div>
            </Col>
            <Col
              size="xs-10 sm-10 md-6 lg-6"
              myclass="socCol d-flex justify-content-center"
            >
              <div>
                <h4 className="header">Societies</h4>
                <br></br>
                <FormItem
                  key={societies[0].id}
                  type={societies[0].type}
                  name={societies[0].name}
                  checked={isSocieties.Film}
                  description={societies[0].description}
                  email={societies[0].email}
                  handleChange={handleChange}
                />
                <FormItem
                  key={societies[1].id}
                  type={societies[1].type}
                  name={societies[1].name}
                  checked={isSocieties.Dance}
                  description={societies[1].description}
                  email={societies[1].email}
                  handleChange={handleChange}
                />
                <FormItem
                  key={societies[2].id}
                  type={societies[2].type}
                  name={societies[2].name}
                  checked={isSocieties.Music}
                  description={societies[2].description}
                  email={societies[2].email}
                  handleChange={handleChange}
                />
                <FormItem
                  key={societies[3].id}
                  type={societies[3].type}
                  name={societies[3].name}
                  checked={isSocieties.Drinking}
                  description={societies[3].description}
                  email={societies[3].email}
                  handleChange={handleChange}
                />
              </div>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col size="12" myclass="d-flex justify-content-center">
              <div className="form-group">
                <button type="submit" className="sns-submit-btn">
                  SUBMIT
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Row>
    </li>
  );
};

export default Form;
