import React from "react";
import Wrapper from "../components/Wrapper"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
const myEventsList = [];

const CalendarPage = () => {
    return (
        <Wrapper>

            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />

        </Wrapper>
    )
}

export default CalendarPage