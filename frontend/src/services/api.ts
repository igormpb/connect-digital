import axios from "axios";
import { handle } from "../utils/handle";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  post: <T>(path: string, payload?: any, config?: any) => {
    return handle<T>(instance.post(path, payload, config));
  },
};
