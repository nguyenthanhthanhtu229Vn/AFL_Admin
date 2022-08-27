import { url, headers } from "./index";
import axios from "axios";

<<<<<<< HEAD
export default function getInfoTeamInTournamentByTeamId(idTeam,idTour) {
=======
export default function getInfoTeamInTournamentByTeamId(idTour, idTeam) {
>>>>>>> 94aee841e84e3050b9a222f19c2b52c2a2c7d9c0
  const afterDefaultURL = `team-in-tournaments?tournament-id=${idTour}&team-id=${idTeam}&page-offset=1&limit=5`;
  return axios.get(url + afterDefaultURL);
}
