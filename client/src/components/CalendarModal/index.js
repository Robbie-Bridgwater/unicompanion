import React, { useState } from 'react';
import API from "../../utils/API";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const CalendarModal = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemoveEvent = id => {

        API.deleteEvent(id)
  
        .then(res => API.getEvents())
        handleClose
  
        .catch(err => console.log(err));
      };
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>Would you like to delete or update the selected event?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Delete Event
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Update Event
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default CalendarModal;