import axios from "axios";

let userAPI = {
  createUser: function (credentials) {
    return axios.post("/api/user", credentials);
  },

  getUser: function (id) {
    return axios.get(`/api/user/${id}`);
  },

  authenticateUser: function (credentials) {
    return axios.post("/api/user/login", credentials);
  },

  getSession: function () {
    return axios.get("/api/user/account");
  },

  endSession: function () {
    return axios.get("/api/user/logout");
  },

  updatePassword: function (id, pass) {
    return axios.put(`/api/user/${id}`, { password: pass });
  },

  addSocials: function (id, sports, societies) {

    return axios.post(`/api/user/${id}`, { sport: sports, society: societies });
  },
};

export default userAPI;
