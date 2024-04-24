import axios from "axios";

const space_id = `i38qivkuuy3m`;
const access_token = `oq0brhanecxw6dSfHTifX4Z1ogaYfuVY84H1JQQZz7U`;

const apiClient = axios.create({
  baseURL: `http://localhost:8080`,
  // headers: {
  //   Authorization: `Bearer ${access_token}`,
  // },
});

export default apiClient;
