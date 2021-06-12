import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../utils/API";
import userAPI from "../../utils/userAPI";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./style.css";

const localizer = momentLocalizer(moment);

const ReactCalendar = () => {
    // CALENDAR HOOKS
    const [events, setEvents] = useState([]);
    const [storedClickedEvent, storeClickedEvent] = useState([]);

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
    }, [details.name, events.length]);

    useEffect(() => {
        userAPI.getSession().then((res) => {
            userAPI.getUser(res.data._id).then((payload) => {
                setDetails(payload.data);
            });
        });
    }, []);

    const getSuperUserBoolean = () => {
        return details.is_SuperUser;
    };

    // ADD/DELETE/UPDATE FUNCTIONS

    const getEvents = (details) => {
        API.getEvents()

        .then((res) => {
            const sports = res.data.filter((event) =>
                details.sport.find(
                    (association) => association === event.association
                )
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

        .then((res) => getEvents(details), handleEventClose())
            .catch((err) => console.log(err));
    };

    // this converts the time it is given into a UTC time stamp with an input specified by the user
    const inputTimeConverter = (inputTime) => {
        if (typeof storedClickedEvent.start === "string") {
            storedClickedEvent.start = new Date(storedClickedEvent.start);
        }
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

    const updateEvent = (event) => {
        event.preventDefault();

        setInputTitle(inputTitle);

        setInputAssociation(inputAssociation);

        setInputStartTime(inputStartTime);

        setInputEndTime(inputEndTime);

        API.updateEvent(
                storedClickedEvent._id, // FILTER
                {
                    _id: storedClickedEvent._id, // UPDATE
                    title: inputTitle,
                    start: inputTimeConverter(inputStartTime),
                    end: inputTimeConverter(inputEndTime),
                    allDay: switchStatus,
                }
            )
            .then(
                (res) => getEvents(details),
                handleUpdateClose(),
                handleEventClose(),
                setSwitchStatus(false)
            )
            .catch((err) => console.log(err));
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
            .then(
                (res) => getEvents(details),
                setSwitchStatus(false),
                handleSlotClose()
            )
            .catch((err) => console.log(err));
    };

    return ( <
        div className = "react-calendar" > { /* UPDATE MODAL */ } <
        Modal show = { showUpdateModal }
        onHide = { handleUpdateClose } >
        <
        Modal.Header closeButton >
        <
        Modal.Title > Update Event < /Modal.Title> <
        /Modal.Header>

        <
        Modal.Body > Would you like to update the selected event ? < /Modal.Body> <
        Form onSubmit = { updateEvent }
        style = {
            { padding: "16px" } } >
        <
        Form.Label > Event Name < /Form.Label> <
        Form.Control onChange = {
            (event) => setInputTitle(event.target.value) }
        type = "text"
        placeholder = "Enter event name" /
        >
        <
        Form.Label style = {
            { marginTop: "20px" } } >
        Which association is this event
        for ?
        <
        /Form.Label> <
        Form.Control onChange = {
            (event) => setInputAssociation(event.target.value) }
        as = "select" >
        <
        option disabled = "disabled"
        selected >
        Select association <
        /option> <
        option > Football < /option> <
        option > Hockey < /option> <
        option > Rugby < /option> <
        option > Lacrosse < /option> <
        option > Film < /option> <
        option > Dance < /option> <
        option > Music < /option> <
        option > Drinking < /option> <
        /Form.Control> <
        Form.Check onClick = {
            () => setSwitchStatus(!switchStatus) }
        type = "switch"
        id = "custom-switch"
        label = "Is this an all day event?"
        style = {
            { marginTop: "20px", marginBottom: "20px" } }
        /> {
            !switchStatus ? ( <
                >
                <
                Form.Label > Enter event start time < /Form.Label> <
                Form.Control onChange = {
                    (event) => setInputStartTime(event.target.value) }
                type = "time" /
                >
                <
                Form.Label > Enter event end time < /Form.Label> <
                Form.Control onChange = {
                    (event) => setInputEndTime(event.target.value) }
                type = "time"
                style = {
                    { marginBottom: "20px" } }
                />{" "} <
                />
            ) : ( <
                > < />
            )
        } <
        button type = "submit"
        id = "deleteButton"
        className = "update-event-btn" >
        Update <
        /button> <
        button onClick = { handleUpdateClose }
        className = "cancel-btn" >
        Cancel <
        /button> <
        /Form> <
        /Modal> { /* UPDATE/DELETE OPTION MODAL */ } <
        Modal show = { showEventModal }
        onHide = { handleEventClose } >
        <
        Modal.Header closeButton >
        <
        Modal.Title > Edit Event < /Modal.Title> <
        /Modal.Header> <
        Modal.Body >
        Would you like to delete or update the selected event ?
        <
        /Modal.Body> <
        Modal.Footer >
        <
        button id = "deleteButton"
        onClick = { removeEvent }
        className = "delete-event-btn" >
        Delete Event <
        /button> <
        button onClick = { handleUpdateShow }
        className = "update-event-btn" >
        Update Event <
        /button> <
        /Modal.Footer> <
        /Modal> { /* ADD EVENT MODAL */ } <
        Modal show = { showSlotModal }
        onHide = { handleSlotClose } >
        <
        Modal.Header closeButton >
        <
        Modal.Title > Add Event < /Modal.Title> <
        /Modal.Header> <
        Modal.Body >
        Would you like to add the event on the selected day ?
        <
        /Modal.Body> <
        Form onSubmit = { addEvent }
        style = {
            { padding: "16px" } } >
        <
        Form.Label > Event Name < /Form.Label> <
        Form.Control onChange = {
            (event) => setInputTitle(event.target.value) }
        type = "text"
        placeholder = "Enter event name" /
        >
        <
        Form.Label style = {
            { marginTop: "20px" } } >
        Which association is this event
        for ?
        <
        /Form.Label> <
        Form.Control onChange = {
            (event) => setInputAssociation(event.target.value) }
        as = "select" >
        <
        option disabled = "disabled"
        selected >
        Select association <
        /option> <
        option > Football < /option> <
        option > Hockey < /option> <
        option > Rugby < /option> <
        option > Lacrosse < /option> <
        option > Film < /option> <
        option > Dance < /option> <
        option > Music < /option> <
        option > Drinking < /option> <
        /Form.Control> <
        Form.Check onClick = {
            () => setSwitchStatus(!switchStatus) }
        type = "switch"
        id = "custom-switch"
        label = "Is this an all day event?"
        style = {
            { marginTop: "20px", marginBottom: "20px" } }
        /> {
            !switchStatus ? ( <
                >
                <
                Form.Label > Enter event start time < /Form.Label> <
                Form.Control onChange = {
                    (event) => setInputStartTime(event.target.value) }
                type = "time" /
                >
                <
                Form.Label > Enter event end time < /Form.Label> <
                Form.Control onChange = {
                    (event) => setInputEndTime(event.target.value) }
                type = "time"
                style = {
                    { marginBottom: "20px" } }
                />{" "} <
                />
            ) : ( <
                > < />
            )
        } <
        button type = "submit"
        className = "add-event-btn" >
        Add <
        /button> <
        button onClick = { handleSlotClose }
        className = "cancel-btn" >
        Cancel <
        /button> <
        /Form> <
        /Modal>

        { /* CALENDAR */ } {
            getSuperUserBoolean() === true ? ( <
                Calendar localizer = { localizer }
                events = { events }
                startAccessor = "start"
                endAccessor = "end"
                style = {
                    { height: 600 } }
                onSelectEvent = {
                    (event) => handleEventShow(event) }
                onSelectSlot = {
                    (event) => handleSlotShow(event) }
                selectable = { true }
                popup = { true }
                views = {
                    ["month", "agenda"] }
                />
            ) : ( <
                Calendar localizer = { localizer }
                events = { events }
                startAccessor = "start"
                endAccessor = "end"
                style = {
                    { height: 600 } }
                popup = { true }
                views = {
                    ["month", "agenda"] }
                />
            )
        } <
        /div>
    );
};

export default ReactCalendar;