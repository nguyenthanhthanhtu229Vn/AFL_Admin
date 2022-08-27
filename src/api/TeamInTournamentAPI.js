import { url, headers } from "./index";
import axios from "axios";

export default function getInfoTeamInTournamentByTeamId(idTour, idTeam) {
  const afterDefaultURL = `team-in-tournaments?tournament-id=${idTour}&team-id=${idTeam}&page-offset=1&limit=5`;
  return axios.get(url + afterDefaultURL);
}
