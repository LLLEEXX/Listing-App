import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 60000,
});

export default axios;
