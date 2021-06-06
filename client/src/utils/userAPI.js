import axios from "axios";

export default {
  createUser: function(credentials) {
    return axios.post("/api/user", credentials);
  },

  authenticateUser: function(credentials) {
    return axios.post("/api/user/login", credentials);
  },

  getSession: function() {
    return axios.get("/api/user/account");
  },
  
  endSession: function() {
    return axios.get("/api/user/logout");
  }
};