import axios from "axios";

export default {
    // GET ALL EVENTS
    getEvents: function(query) {
        return axios.get("/api/calendar/");
    },
    // REMOVE EVENT BY MONGO ID
    deleteEvent: function(id) {
        return axios.delete("/api/calendar/" + id);
    },
    // UPDATE EVENT BY MONGO ID
    updateEvent: function(id) {
        return axios.put("/api/calendar/" + id);
    },
    // updateEvent: function(id, eventData) {
    //     return axios.put("/api/calendar/" + id, eventData);
    // },
    // ADD EVENT
    addEvent: function(eventData) {
        return axios.post("api/calendar/", eventData);
    }
};