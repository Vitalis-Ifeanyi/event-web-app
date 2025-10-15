import axios from "axios";

const API_URL =
  "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events";

export const fetchEvents = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const fetchEventById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};
