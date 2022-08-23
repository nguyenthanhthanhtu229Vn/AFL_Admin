import { url, headers } from "./index";
import axios from "axios";

export function reportOutTeam(id) {
  const afterDefaultURL = `TeamInMatch/update-outTeam?teamInTourId=${id}`;
  return axios.put(url + afterDefaultURL);
}

export function updateNextTeamInNextRound (data) {
    const afterDefaultURL = `TeamInMatch/update-next-team-in-match`;
    return axios.put(url + afterDefaultURL);
  }
