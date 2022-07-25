//services are used for making HTTP requests and setting/getting any data from local storage

import axios from "axios"; //to use are http rq and rs --sth like postman

//BE URL for registering user --backend/routes/userRoutes
const API_URL = "/api/users/";

//register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  //check if there is an response
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  //check if there is an response
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logout user
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
