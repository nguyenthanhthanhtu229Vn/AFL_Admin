import { url, headers } from "./index";
import axios from "axios";

export function getReportByTournamentIdAPI(id, currentPage) {
  const afterDefaultURL = `reports?tournament-id=${id}&status=Ch%C6%B0a%20duy%E1%BB%87t&report-type=Tournament&order-by=Id&order-type=DESC&page-offset=${currentPage}&limit=10`;
  return axios.get(url + afterDefaultURL);
}

export function getReportFromHostByTournamentIdAPI(id) {
  const afterDefaultURL = `reports?tournament-id=${id}&status=Xin%20hu%CC%89y%20gia%CC%89i&report-type=Tournament&order-by=Id&order-type=DESC&page-offset=1&limit=10`;
  return axios.get(url + afterDefaultURL);
}

export function getReportTeamOutTournamentAPI(id) {
  const afterDefaultURL = `reports?tournament-id=${id}&status=B%C3%A1o%20c%C3%A1o%20%C4%91%E1%BB%99i%20b%C3%B3ng%20h%E1%BB%A7y%20gi%E1%BA%A3i&page-offset=1&limit=10`;
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

export function putStatusReportAPI(data) {
  const afterDefaultURL = `reports`;
  return axios.put(url + afterDefaultURL, data);
}

export function getReportGroupByAPI(type, status, currentPage) {
  const afterDefaultURL = `reports/group-by?report-type=${type}&status=${status}&page-offset=${currentPage}&limit=5`;
  console.log(afterDefaultURL);
  return axios.get(url + afterDefaultURL);
}
