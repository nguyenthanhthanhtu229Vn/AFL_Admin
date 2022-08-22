import { url, headers } from "./index";
import axios from "axios";


export function takeFlagForUserAPI(data) {
    const afterDefaultURL = `users`;
    return axios.put(url + afterDefaultURL, data, headers);
}

export function blockUserAPI(id, countBlock) {
    const afterDefaultURL = `users?id=${id}&countBlock=${countBlock}`;
    return axios.patch(url + afterDefaultURL);
}

export function sendmailAPI(id) {
    const afterDefaultURL = `systems/send-mail-ban?user-id=${id}`;
    return axios.post(url + afterDefaultURL)
}