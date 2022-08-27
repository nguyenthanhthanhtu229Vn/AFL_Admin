import { url, headers } from "./index";
import axios from "axios";

export default function getInfoTeamInTournamentByTeamId(idTeam,idTour) {
  const afterDefaultURL = `team-in-tournaments?tournament-id=${idTour}&team-id=${idTeam}&page-offset=1&limit=5`;
  return axios.get(url + afterDefaultURL);
}
