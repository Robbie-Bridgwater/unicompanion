import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../utils/API";

const localizer = momentLocalizer(moment)

const ReactCalendar = () => {

    const [events, setEvents] = useState([]);

    // ================

    // useEffect(() => {
    //     API.getEvents()

    //         .then(res => {
    //             let events = res.data;
    //             let myEventsList = []
    //             for (let i = 0; i < events.length; i++) {
    //                 myEventsList.push(events[i])
    //             }

    //             setEvents(myEventsList);


    //         })

    //         .catch(function (err) {
    //             console.log(err);
    //         });
    // }, []);

    // ================

    useEffect(() => {

        API.getEvents()

          .then(res => 
            setEvents(res.data))

          .catch(err => 
            console.log(err))
    }, []);

    return (

        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />

    )
}

export default ReactCalendar;