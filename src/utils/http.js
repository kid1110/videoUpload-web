import axios from "axios"
import { ElLoading, ElMessage } from "element-plus"
import router from "@/router/router.js"
let loading
function startLoading() {
    loading = ElLoading.service({
        lock: true,
        text: "加载中....",
        background: "rgba(0,0,0,0.7)"
    })
}

function endLoading() {
    loading.close()
}

//请求拦截
axios.interceptors.request.use(
    (config) => {
        startLoading()
        config.headers.contentType = "application/x-www-form-urlencoded"
        if (localStorage.getItem("eToken")) {
            config.headers.Authorization = localStorage.getItem("eToken")
        }
        return config
    },
    (error) => {
        endLoading()
        return Promise.reject(error)
    }
)

//响应拦截
axios.interceptors.response.use(
    (response) => {
        console.log(response.data)
        console.log(response.data.code !== 1)
        console.log(response.data.code === 1)
        endLoading()
        if (response.data.code !== 1) {
            if (response.data.code === -502) {
                if (localStorage.getItem("eToken")) {
                    ElMessage.error("请重新登录")
                    localStorage.removeItem("eToken")
                }
                router.replace({ name: "login" }).then(() => {
                    return response
                })
            } else {
                ElMessage.error(response.data.msg)
            }
        }
        return response
    },
    (error) => {
        endLoading()
        ElMessage.error("请求错误")
        return Promise.reject(error)
    }
)
export default axios
