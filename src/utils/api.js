import axios from "../utils/http"
import base from "./base"
import qs from "qs"

export function loginRequest(username, password) {
    return axios({
        url: `${base.url}/web/login`,
        method: "post",
        data: qs.stringify({ username: username, password: password })
    })
}

export function getBrokerInfo() {
    return axios({
        url: `${base.url}/web/getBrokenInfo`,
        method: "get"
    })
}
export function getVideoInfo() {
    return axios({
        url: `${base.url}/web/getVideoInfo`,
        method: "get"
    })
}
