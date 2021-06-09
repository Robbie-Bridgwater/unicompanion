import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../utils/API";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CalendarModal from "../CalendarModal";

const localizer = momentLocalizer(moment)

const ReactCalendar = () => {
  // CALENDAR HOOKS
  const [events, setEvents] = useState([]);
  const [storedClickedEvent, storeClickedEvent] = useState("");

  // MODAL HOOKS AND FUNCTIONS
  const [showEventModal, setEventModal] = useState(false);
  const [showSlotModal, setSlotModal] = useState(false);

  // FORM HOOKS
  const [inputValue, setInputValue] = useState([]);


  // The Modal which presents the update and delete options
  const handleEventClose = () => {
    setEventModal(false);
  }

  const handleEventShow = (clickedEvent) => {
    setEventModal(true);
    storeClickedEvent(clickedEvent)
  }

  // The Modal which allows you to add event
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
    // const confirm = window.confirm("Would you like to update this event?")
    // if (confirm === true) {

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
    // }
  }

  // Need to be able to add a specific time to event, currently allDay set to "true"

  const addEvent = () => {

    // const confirm = window.confirm("Would you like to update this event?")
    // if (confirm === true) {

    let addPrompt = prompt("Please enter what you would like the event to be called.");

    API.addEvent(
      {
        title: addPrompt,
        allDay: true,
        start: storedClickedEvent.start,
        end: storedClickedEvent.end
      }
    ).then(res =>

      getEvents())

      .catch(err => console.log(err));
    // }
  }

  const test = () => {
console.log(inputValue)
  }

  return (
    <>

      {/* MODAL */}

      {/* =========== under development */}

      {/* <CalendarModal Title="Edit Event" Body="Would you like to delete or update the selected Event?">
      <Button id="deleteButton" variant="danger" onClick={removeEvent}>
            Delete Event
            </Button>
          <Button variant="primary" onClick={updateEvent}>
            Update Event
          </Button>
      </CalendarModal> */}

      {/* ===========  */}


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

      {/* ========================= */}


      <Modal show={showSlotModal} onHide={handleSlotClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to add the event on the selected day?</Modal.Body>
        <Form>
          <Form.Label>Event Name</Form.Label>
          <Form.Control type="text" placeholder="Enter event name" />
        </Form>
        <Modal.Footer>
          <Button id="deleteButton" variant="danger" onClick={addEvent}>
            Add
          </Button>
          <Button variant="primary" onClick={handleSlotClose}>
            Cancel
          </Button>
        </Modal.Footer>
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