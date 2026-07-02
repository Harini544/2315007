import axios from "axios";

const API = "http://localhost:3000/notifications";

export async function getNotifications() {
  const response = await axios.get(API);
  return response.data.notifications || [];
}