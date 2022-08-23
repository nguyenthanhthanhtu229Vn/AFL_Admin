import { url, headers } from "./index";
import axios from "axios";

export default function getInfoTeamInTournamentByTeamId(idTeam) {
  const afterDefaultURL = `team-in-tournaments?team-id=${idTeam}&page-offset=1&limit=5`;
  return axios.get(url + afterDefaultURL);
}
