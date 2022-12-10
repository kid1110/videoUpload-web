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
