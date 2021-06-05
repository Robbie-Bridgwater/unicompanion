import axios from "axios";

export default {
  // GET all users
  getAllUser: function() {
    return axios.get('api/user');
  },
  // GET a particular user
  getUser: function(id) {
    return axios.delete("api/user/" + id);
  },
  // Create a new user POST
  saveUser: function(credentials) {
    return axios.post("api/book", credentials);
  }
};