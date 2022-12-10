<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item @click="clickMenu(item)" v-for="item in asideData" :key="item.name" :index="item.name">
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.label }}</span>
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts">
import router from "../router/router.js"
export default {
    data() {
        return {}
    },
    methods: {
        clickMenu(item) {
            console.log(item)
            router.push(item.path)
        }
    },
    computed: {
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }
    }
}
</script>
<script lang="ts" setup>
import { computed, ref } from "vue"
import { UploadFilled, EditPen, Document, Avatar } from "@element-plus/icons-vue"
const asideData = [
    {
        path: "/env",
        name: "env",
        label: "环境部署",
        icon: UploadFilled,
        url: "Env/env"
    },
    {
        path: "/code",
        name: "code",
        label: "代码上传",
        icon: EditPen,
        url: "Code/code"
    },
    {
        path: "/log",
        name: "log",
        label: "日志查看",
        icon: Document,
        url: "Log/log"
    },
    {
        path: "/auth",
        name: "auth",
        label: "权限管理",
        icon: Avatar,
        url: "Auth/auth"
    }
]
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
