import axios from "axios";

let userAPI = {
  createUser: function (credentials) {
    return axios.post("/api/user", credentials);
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

  updatePassword: function ({ id, pass }) {
    return axios.put(`/api/user/${id}`, { password: pass });
  },
};

export default userAPI;
