import axios from "axios";
import { env } from "../config/EnvironmentConfig";

async function login(data) {
  try {
    const response = await axios({
      method: "post",
      url: `${env.API_ENDPOINT_URL}/login`,
      data: data,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response);
    } else return Promise.reject(error.message);
  }
}

export { login };
