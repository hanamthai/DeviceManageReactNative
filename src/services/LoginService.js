import axios from "axios";
import { BASE_URL } from "../config"

const registerService = (name, email, password) => {
  return axios.post(`${BASE_URL}/v1/parents/register`, {
    fullname: name,
    email: email,
    password: password,
  })
};

const loginService = (email, password) => {
  return axios.post(`${BASE_URL}/v1/logins`,
    { email: email, password: password }
  )
};

export { registerService, loginService }
