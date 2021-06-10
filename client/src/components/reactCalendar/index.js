import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../utils/API";
import userAPI from "../../utils/userAPI";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./style.css";

const localizer = momentLocalizer(moment);

const ReactCalendar = () => {
  // CALENDAR HOOKS
  const [events, setEvents] = useState([]);
  const [storedClickedEvent, storeClickedEvent] = useState("");

  // MODAL HOOKS AND FUNCTIONS
  const [showEventModal, setEventModal] = useState(false);
  const [showSlotModal, setSlotModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);

  // FORM HOOKS
  const [inputTitle, setInputTitle] = useState([]);
  const [inputAssociation, setInputAssociation] = useState([]);
  const [inputStartTime, setInputStartTime] = useState([]);
  const [inputEndTime, setInputEndTime] = useState([]);
  const [switchStatus, setSwitchStatus] = useState(false);

  // USER HOOKS
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  // UPDATE/DELETE MODAL FUNCTIONS

  const handleEventClose = () => {
    setEventModal(false);
  };

  const handleEventShow = (clickedEvent) => {
    setEventModal(true);
    storeClickedEvent(clickedEvent);
  };

  // ADD EVENT MODAL FUNCTIONS
  const handleSlotClose = () => {
    setSlotModal(false);
  };

  const handleSlotShow = (clickedEvent) => {
    setSlotModal(true);
    storeClickedEvent(clickedEvent);
  };

  // UPDATE MODAL FUNCTIONS
  const handleUpdateClose = () => {
    setUpdateModal(false);
  };

  const handleUpdateShow = () => {
    setUpdateModal(true);
  };

  useEffect(() => {
    if (details.name.length > 0) {
      getEvents(details);
    }
  }, [details.name]);

  useEffect(() => {
    userAPI.getSession().then((res) => {
      userAPI.getUser(res.data._id).then((payload) => {
        setDetails(payload.data);
      });
    });
  }, []);

  // ADD/DELETE/UPDATE FUNCTIONS

  const getEvents = (details) => {
    API.getEvents()

      .then((res) => {
        const sports = res.data.filter((event) =>
          details.sport.find((association) => association === event.association)
        );
        const societies = res.data.filter((event) =>
          details.society.find(
            (association) => association === event.association
          )
        );
        const events = [...sports, ...societies];
        setEvents(events);
      })

      .catch((err) => console.log(err));
  };

  const removeEvent = () => {
    API.deleteEvent(storedClickedEvent._id)

      .then((res) => getEvents(), handleEventClose())
      .catch((err) => console.log(err));
  };

  const updateEvent = (event) => {
    event.preventDefault();

    setInputTitle(inputTitle);

    API.updateEvent(
      storedClickedEvent._id, // FILTER
      {
        _id: storedClickedEvent._id, // UPDATE
        title: inputTitle,
        start: storedClickedEvent.start,
        end: storedClickedEvent.end,
        allDay: switchStatus,
      }
    )
      .then((res) => getEvents(), handleUpdateClose(), handleEventClose())
      .catch((err) => console.log(err));
  };

  const inputTimeConverter = (inputTime) => {
    let year = storedClickedEvent.start.getFullYear();
    let month = storedClickedEvent.start.getMonth() + 1;
    let day = storedClickedEvent.start.getDate();
    let hoursAndMinutes = inputTime;
    let seconds = "00";
    let milliseconds = "00";
    let convertedTime = new Date(
      `${year}-${month}-${day} ${hoursAndMinutes}:${seconds}:${milliseconds}`
    );
    return convertedTime;
  };

  const addEvent = (event) => {
    event.preventDefault();

    setInputTitle(inputTitle);

    setInputAssociation(inputAssociation);

    setInputStartTime(inputStartTime);

    setInputEndTime(inputEndTime);

    API.addEvent({
      title: inputTitle,
      start: inputTimeConverter(inputStartTime),
      end: inputTimeConverter(inputEndTime),
      allDay: switchStatus,
      association: inputAssociation,
    })
      .then((res) => getEvents(), setSwitchStatus(false), handleSlotClose())
      .catch((err) => console.log(err));
  };

  return (
    <div className="react-calendar">
      {/* UPDATE MODAL */}

      <Modal show={showUpdateModal} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          Enter what you would like to update the name of the event to
        </Modal.Body>
        <Form onSubmit={updateEvent}>
          <Form.Control
            onChange={(event) => setInputTitle(event.target.value)}
            type="text"
            placeholder="Enter event name"
          /> */}

        <Modal.Body>
          Would you like to add the event on the selected day?
        </Modal.Body>
        <Form onSubmit={updateEvent}>
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            onChange={(event) => setInputTitle(event.target.value)}
            type="text"
            placeholder="Enter event name"
          />
          <Form.Label>Which association is this event for</Form.Label>
          <Form.Control
            onChange={(event) => setInputAssociation(event.target.value)}
            as="select"
          >
            <option disabled="disabled" selected>
              Select association
            </option>
            <option>Football</option>
            <option>Hockey</option>
            <option>Rugby</option>
            <option>Lacrosee</option>
            <option>Film</option>
            <option>Dance</option>
            <option>Music</option>
            <option>Drinking</option>
          </Form.Control>
          <Form.Check
            onClick={() => setSwitchStatus(!switchStatus)}
            type="switch"
            id="custom-switch"
            label="Is this an all day event"
          />
          <Form.Label>Enter event start time</Form.Label>
          <Form.Control
            onChange={(event) => setInputStartTime(event.target.value)}
            type="time"
          />
          <Form.Label>Enter event end time</Form.Label>
          <Form.Control
            onChange={(event) => setInputEndTime(event.target.value)}
            type="time"
          />
          <button type="submit" id="deleteButton" className="update-event-btn">
            Update
          </button>
          <button onClick={handleUpdateClose} className="cancel-btn">
            Cancel
          </button>
        </Form>
      </Modal>

      {/* UPDATE/DELETE OPTION MODAL */}

      <Modal show={showEventModal} onHide={handleEventClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Would you like to delete or update the selected event?
        </Modal.Body>
        <Modal.Footer>
          <button
            id="deleteButton"
            onClick={removeEvent}
            className="delete-event-btn"
          >
            Delete Event
          </button>
          <button onClick={handleUpdateShow} className="update-event-btn">
            Update Event
          </button>
        </Modal.Footer>
      </Modal>

      {/* ADD EVENT MODAL */}

      <Modal show={showSlotModal} onHide={handleSlotClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Would you like to add the event on the selected day?
        </Modal.Body>
        <Form onSubmit={addEvent}>
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            onChange={(event) => setInputTitle(event.target.value)}
            type="text"
            placeholder="Enter event name"
          />
          <Form.Label>Which association is this event for</Form.Label>
          <Form.Control
            onChange={(event) => setInputAssociation(event.target.value)}
            as="select"
          >
            <option disabled="disabled" selected>
              Select association
            </option>
            <option>Football</option>
            <option>Hockey</option>
            <option>Rugby</option>
            <option>Lacrosee</option>
            <option>Film</option>
            <option>Dance</option>
            <option>Music</option>
            <option>Drinking</option>
          </Form.Control>
          <Form.Check
            onClick={() => setSwitchStatus(!switchStatus)}
            type="switch"
            id="custom-switch"
            label="Is this an all day event"
          />
          <Form.Label>Enter event start time</Form.Label>
          <Form.Control
            onChange={(event) => setInputStartTime(event.target.value)}
            type="time"
          />
          <Form.Label>Enter event end time</Form.Label>
          <Form.Control
            onChange={(event) => setInputEndTime(event.target.value)}
            type="time"
          />
          <button type="submit" className="add-event-btn">
            Add
          </button>
          <button onClick={handleSlotClose} className="cancel-btn">
            Cancel
          </button>
        </Form>
      </Modal>

      {/* CALENDAR */}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => handleEventShow(event)}
        onSelectSlot={(event) => handleSlotShow(event)}
        selectable={true}
        popup={true}
        views={["month", "agenda"]}
      />
    </div>
  );
};

export default ReactCalendar;
