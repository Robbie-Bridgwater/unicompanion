import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../utils/API";

const localizer = momentLocalizer(moment)

const ReactCalendar = () => {

  const [events, setEvents] = useState([]);


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

  const removeEvent = (clickedEvent) => {

    const r = window.confirm("Would you like to remove this event?")
    if (r === true) {

      API.deleteEvent(clickedEvent._id)

        .then(res =>
          getEvents())

        .catch(err =>
          console.log(err))

    }
  };

  // ==============

  // NEED HELP HERE

  const updateEvent = (clickedEvent) => {
    const confirm = window.confirm("Would you like to update this event?")
    if (confirm === true) {

      let updatePrompt = prompt("Please enter what you would like it updated to");

      API.updateEvent(
        {
          _id: clickedEvent._id // FILTER
        },

        {
          _id: clickedEvent._id, // UPDATE
          title: updatePrompt,
          allDay: clickedEvent.allDay,
          start: clickedEvent.start,
          end: clickedEvent.end
        }

      ).then(res =>
        getEvents())

        .catch(err => console.log(err));
    }
  }

  // ==============

  // Need to be able to add a specific time to event, currently allDay set to "true"

  const addEvent = (clickedSlot) => {
    const confirm = window.confirm("Would you like to add an event?")
    if (confirm === true) {

      let addPrompt = prompt("Please enter what you would like the event to be called.");

      API.addEvent(
        {
          title: addPrompt,
          allDay: true,
          start: clickedSlot.start,
          end: clickedSlot.end
        }
      ).then(res =>

        getEvents())

        .catch(err => console.log(err));
    }
  }

  return (

    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={event => removeEvent(event)}
      onSelectSlot={event => addEvent(event)}
      selectable={true}
    />

  )
}

export default ReactCalendar;