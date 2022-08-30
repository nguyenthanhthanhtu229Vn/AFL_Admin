import { url, headers } from "./index";
import axios from "axios";

export function postNotification(data) {
  const afterDefaultURL = `notifications`;
  return axios.post(url + afterDefaultURL, data);
}
