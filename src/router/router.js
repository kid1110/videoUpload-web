import Login from "@/views/Login.vue"
import Home from "@/views/Home.vue"
import Log from "@/views/Log.vue"
import Code from "@/views/Code.vue"
import Envirnment from "@/views/Envirnment.vue"
import Auth from "@/views/Auth.vue"
import Main from "@/views/Main.vue"

import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: "/",
        redirect: "/env"
    },
    {
        path: "/login",
        name: "toLogin",
        meta: {
            title: "登录"
        },
        component: Login
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        children: [
            {
                path: "/log",
                name: "log",
                meta: {
                    title: "日志查看"
                },
                component: Log
            },
            {
                path: "/env",
                name: "env",
                meta: {
                    title: "环境配置"
                },
                component: Envirnment
            },
            {
                path: "/code",
                name: "code",
                meta: {
                    title: "代码上传"
                },
                component: Code
            },
            {
                path: "/auth",
                name: "auth",
                meta: {
                    title: "权限管理"
                },
                component: Auth
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导航护卫
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | video-upload-web`
    const jwt = localStorage.getItem("eToken")
    if (!jwt && to.path !== "/login") {
        next("/login")
    } else {
        next()
    }
})
export default router
