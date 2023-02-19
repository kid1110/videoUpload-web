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
export function pullImages(dockerUsername, dockerPassword, dockerRegistory) {
    return axios({
        url: `${base.url}/web/pullImages`,
        method: "post",
        data: qs.stringify({ dockerUsername: dockerUsername, dockerPassword: dockerPassword, dockerRepository: dockerRegistory })
    })
}
export function startContainers(containerId) {
    return axios({
        url: `${base.url}/web/startContainer`,
        method: "post",
        data: qs.stringify({ containerId: containerId })
    })
}
export function getUsers(username) {
    return axios({
        url: `${base.url}/web/getUsers`,
        method: "get",
        params: { username: username }
    })
}
export function updateUsersAuth(uids) {
    return axios({
        url: `${base.url}/web/updateUsersAuth`,
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(uids)
    })
}
export function createContainers(uploadEntity) {
    const formData = new FormData()
    formData.append("dockerName", uploadEntity.dockerName)
    formData.append("modelName", uploadEntity.modelName)
    formData.append("publicPort", uploadEntity.publicPort)
    formData.append("privatePort", uploadEntity.privatePort)
    formData.append("logOutMount", uploadEntity.logOutMount)
    formData.append("logInMount", uploadEntity.logInMount)
    formData.append("dataOutMount", uploadEntity.dataOutMount)
    formData.append("dataInMount", uploadEntity.dataInMount)
    formData.append("imageSelect", uploadEntity.imageSelect)
    formData.append("confirmRun", uploadEntity.confirmRun)
    formData.append("shell", uploadEntity.shell)

    uploadEntity.fileList.forEach((v) => {
        formData.append("fileList", v.raw)
    })
    console.log(formData)
    return axios({
        url: `${base.url}/web/createContainer`,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
