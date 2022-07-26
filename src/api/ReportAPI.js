import { url, headers } from "./index";
import axios from "axios";

export function getReportByTournamentIdAPI(id, currentPage) {
  const afterDefaultURL = `reports?tournament-id=${id}&status=Ch%C6%B0a%20duy%E1%BB%87t&report-type=Tournament&order-by=Id&order-type=DESC&page-offset=${currentPage}&limit=10`;
  return axios.get(url + afterDefaultURL);
}

export function getReportByTeamIdAPI(id, currentPage) {
  const afterDefaultURL = `reports?team-id=${id}&status=Ch%C6%B0a%20duy%E1%BB%87t&report-type=Team&order-by=Id&order-type=DESC&page-offset=${currentPage}&limit=10`;
  return axios.get(url + afterDefaultURL);
}

export function getReportByFootballPlayerIdAPI(id, currentPage) {
  const afterDefaultURL = `reports?football-player-id=${id}&status=Ch%C6%B0a%20duy%E1%BB%87t&report-type=FootballPlayer&order-by=Id&order-type=DESC&page-offset=${currentPage}&limit=10`;
  return axios.get(url + afterDefaultURL);
}
