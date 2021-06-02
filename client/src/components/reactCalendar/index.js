import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../utils/API";

const localizer = momentLocalizer(moment)

const myEventsList = []


const ReactCalendar = () => {

    // ================

    const findEvents = () => {
        API.getEvents()
        .then(res => {
                let events = res.data;
                let myEventsList = []
                for (let i = 0; i < events.length; i++) {
                    myEventsList.push(events[i])
                }
                console.log(myEventsList)
                return myEventsList

            })
            .catch(function (err) {
                console.log(err);
            });
    }

    // ================

    // const getAllEvents = () => {
    //     API.getEvents()
    //       .then(res => 
    //         console.log(res.data))
    //       .catch(err =>
    //         console.log(err))
    //   }

    //   getAllEvents();

    // ================


    // const [events, setEvents] = useState([]);

    // const findEvents = (query) => {
    //     API.getEvents(query)
    //         .then(res => {

    //             const eventData = res.data;
    //             const eventsArr = [];

    //             for (let item of eventData) {
    //                 eventsArr.push(item);
    //             }
    //             console.log(eventsArr);
    //             setEvents(eventsArr);
    //         })
    //         .catch(err => console.log(err));
    // };

    // ================


    return (

        <Calendar
            localizer={localizer}
            events={findEvents()}
            // events={function(){findEvents()}}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />

    )
}

export default ReactCalendar;