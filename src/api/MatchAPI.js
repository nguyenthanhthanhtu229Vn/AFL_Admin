import { url, headers } from "./index";
import axios from "axios";

export default function createTieBreakAPI(tourId, groupName) {
  let afterDefaultURL = null;
  if (groupName === null) {
    afterDefaultURL = `matchs/create-tie-break-match?tournamentId=${tourId}`;
  } else {
    afterDefaultURL = `matchs/create-tie-break-match?tournamentId=${tourId}&groupName=${groupName}`;
  }
  return axios.post(url + afterDefaultURL);
}
