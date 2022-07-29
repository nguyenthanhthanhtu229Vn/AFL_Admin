import { url, headers } from "./index";
import axios from "axios";


export function cancelTournamentAPI(id){
    const afterDefaultURL = `tournaments/${id}`;
    return axios.patch(url + afterDefaultURL);
}