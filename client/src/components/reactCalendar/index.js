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
    const r = window.confirm("Would you like to update this event?")
    if (r === true) {

      let updatePrompt = prompt("Please enter what you would like it updated to");

      API.updateEvent({ _id: clickedEvent._id }, // FILTER
        { _id: clickedEvent._id, title: updatePrompt, allDay: clickedEvent.allDay, start: clickedEvent.start, end: clickedEvent.end}) // UPDATE

      .then(res =>
        getEvents())

        .catch(err => console.log(err));
    }
  }

  // ==============



  return (

    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={event => updateEvent(event)}
    />

  )
}

export default ReactCalendar;