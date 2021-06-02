import axios from "axios";

export default {
    // GET ALL EVENTS
    getEvents: function(query) {
        return axios.get("/api/calendar/");
    }
};