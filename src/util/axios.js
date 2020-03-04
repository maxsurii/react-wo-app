import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://mx7vm:9080/meaweb",
  timeout: 120000
});
