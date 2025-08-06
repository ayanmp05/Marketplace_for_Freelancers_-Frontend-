import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://geniferr-backend.onrender.com",
  withCredentials: true,
});

export default newRequest;