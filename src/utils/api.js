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
export function getImages() {
    return axios({
        url: `${base.url}/web/getImages`,
        method: "get"
    })
}
export function getContainers() {
    return axios({
        url: `${base.url}/web/getContainers`,
        method: "get"
    })
}

export function stopContainers(containerId) {
    return axios({
        url: `${base.url}/web/stopContainer`,
        method: "post",
        data: qs.stringify({ containerId: containerId })
    })
}
export function killContainers(containerId) {
    return axios({
        url: `${base.url}/web/killContainer`,
        method: "post",
        data: qs.stringify({ containerId: containerId })
    })
}

export function restartContainers(containerId) {
    return axios({
        url: `${base.url}/web/restartContainer`,
        method: "post",
        data: qs.stringify({ containerId: containerId })
    })
}
export function removeImages(imageId) {
    return axios({
        url: `${base.url}/web/removeImage`,
        method: "post",
        data: qs.stringify({ imageId: imageId })
    })
}
