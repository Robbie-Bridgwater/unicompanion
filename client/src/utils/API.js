import axios from "axios";

export default {
    // GET ALL EVENTS
    getEvents: function(query) {
        return axios.get("/api/calendar/");
    },
    // REMOVE EVENT BY ID
    deleteEvent: function(id) {
        return axios.delete("/api/calendar/" + id);
    },
    updateEvent: function(id) {
        return axios.put("/api/calendar/" + id);
    }
};