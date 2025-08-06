import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://geniferr-backend.vercel.app/",
  withCredentials: true,
});

export default newRequest;