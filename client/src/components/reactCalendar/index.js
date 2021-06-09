import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../utils/API";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const localizer = momentLocalizer(moment)

const ReactCalendar = () => {
  // CALENDAR HOOKS
  const [events, setEvents] = useState([]);
  const [storedClickedEvent, storeClickedEvent] = useState("");

  // MODAL HOOKS AND FUNCTIONS
  const [showEventModal, setEventModal] = useState(false);
  const [showSlotModal, setSlotModal] = useState(false);

  // FORM HOOKS
  const [inputTitle, setInputTitle] = useState([]);
  const [inputStartTimeHours, setInputStartTimeHours] = useState([]);
  const [inputStartTimeMinutes, setInputStartTimeMinutes] = useState([]);
  const [inputEndTimeHours, setInputEndTimeHours] = useState([]);
  const [inputEndTimeMinutes, setInputEndTimeMinutes] = useState([]);
  const [switchStatus, setSwitchStatus] = useState(false);

  // UPDATE/DELETE MODAL FUNCTIONS

  const handleEventClose = () => {
    setEventModal(false);
  }

  const handleEventShow = (clickedEvent) => {
    setEventModal(true);
    storeClickedEvent(clickedEvent)
  }

  // ADD EVENT MODAL FUNCTIONS
  const handleSlotClose = () => {
    setSlotModal(false);
  }

  const handleSlotShow = (clickedEvent) => {
    setSlotModal(true);
    storeClickedEvent(clickedEvent)
  }


  useEffect(() => {

    getEvents()

  }, []);

  const getEvents = () => {
    API.getEvents()

      .then(res =>
        setEvents(res.data))

      .catch(err =>
        console.log(err))
  }

  const removeEvent = () => {

    API.deleteEvent(storedClickedEvent._id)

      .then(res =>
        getEvents(),
        handleEventClose()

      ).catch(err =>
        console.log(err))

  };

  const updateEvent = () => {

    let updatePrompt = prompt("Please enter what you would like it updated to");

    API.updateEvent(

      storedClickedEvent._id // FILTER
      ,

      {
        _id: storedClickedEvent._id, // UPDATE
        title: updatePrompt,
        allDay: storedClickedEvent.allDay,
        start: storedClickedEvent.start,
        end: storedClickedEvent.end
      }

    ).then(res =>
      getEvents(),
      handleEventClose()

    ).catch(err => console.log(err));

  }

  const inputTimeConverter = (inputHours, inputMinutes) => {
    let year = storedClickedEvent.start.getFullYear();
    let month = storedClickedEvent.start.getMonth() + 1;
    let day = storedClickedEvent.start.getDate();
    let hour = inputHours;
    let minutes = inputMinutes;
    let seconds = '00';
    let milliseconds = '00';
    let convertedTime = new Date(`${year}-${month}-${day} ${hour}:${minutes}:${seconds}:${milliseconds}`)
    return convertedTime
  }

  const addEvent = (event) => {
    event.preventDefault()
    setInputTitle(inputTitle)

    setInputStartTimeHours(inputStartTimeHours)
    setInputStartTimeMinutes(inputStartTimeMinutes)

    setInputEndTimeHours(inputEndTimeHours)
    setInputEndTimeMinutes(inputEndTimeMinutes)

    console.log(switchStatus)

    API.addEvent(
      {
        title: inputTitle,
        allDay: switchStatus,
        start: inputTimeConverter(inputStartTimeHours, inputStartTimeMinutes),
        end: inputTimeConverter(inputEndTimeHours, inputEndTimeMinutes)
      }
    ).then(res =>

      getEvents(),
      setSwitchStatus(false),
      handleSlotClose()

    ).catch(err => console.log(err));
  }

  return (
    <>
      {/* UPDATE/DELETE MODAL */}

      <Modal show={showEventModal} onHide={handleEventClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to delete or update the selected event?</Modal.Body>
        <Modal.Footer>
          <Button id="deleteButton" variant="danger" onClick={removeEvent}>
            Delete Event
            </Button>
          <Button variant="primary" onClick={updateEvent}>
            Update Event
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ADD EVENT MODAL */}

      <Modal show={showSlotModal} onHide={handleSlotClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to add the event on the selected day?</Modal.Body>
        <Form onSubmit={addEvent}>
          <Form.Label>Event Name</Form.Label>
          <Form.Control onChange={event => setInputTitle(event.target.value)} type="text" placeholder="Enter event name" />
          <Form.Check onClick={() => setSwitchStatus(!switchStatus)} type="switch" id="custom-switch" label="Is this an all day event" />
          <Form.Control onChange={event => setInputStartTimeHours(event.target.value)} type="text" placeholder="Enter event start time hours" />
          <Form.Control onChange={event => setInputStartTimeMinutes(event.target.value)} type="text" placeholder="Enter event start time minutes" />
          <Form.Control onChange={event => setInputEndTimeHours(event.target.value)} type="text" placeholder="Enter event end time hours" />
          <Form.Control onChange={event => setInputEndTimeMinutes(event.target.value)} type="text" placeholder="Enter event end time minutes" />
          <Button type="submit" id="deleteButton" variant="danger">
            Add
          </Button>
          <Button variant="primary" onClick={handleSlotClose}>
            Cancel
          </Button>
        </Form>
      </Modal>

      {/* CALENDAR */}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={event => handleEventShow(event)}
        onSelectSlot={event => handleSlotShow(event)}
        selectable={true}
      // popup={true}
      />

    </>
  )
}

export default ReactCalendar;