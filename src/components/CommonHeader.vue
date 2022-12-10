<template>
    <div class="header-container">
        <div class="l-content">
            <el-button :icon="Menu" size="small" @click="handleMenu"></el-button>
            <span class="text">首页</span>
        </div>
        <div class="r-content">
            <el-dropdown class="el-dropwodn">
                <span class="el-dropdown-link">
                    {{ userName }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang="ts">
import { ElMessage } from "element-plus"
export default {
    data() {
        return {
            userName: "用户"
        }
    },
    mounted() {
        this.getUserName()
    },
    methods: {
        getUserName() {
            const username = localStorage.getItem("username")
            console.log(username)
            if (username && username != null) {
                this.userName = username
            }
        },
        signOut() {
            localStorage.removeItem("eToken")
            localStorage.removeItem("uid")
            localStorage.removeItem("username")
            ElMessage.success({
                duration: 500,
                message: "退出成功"
            })
            this.$router.replace({ name: "toLogin" })
        },
        handleMenu() {
            this.$store.commit("isCollapseMenu")
        }
    }
}
</script>
<script lang="ts" setup>
import { Menu, ArrowDown } from "@element-plus/icons-vue"
</script>

<style lang="less" scoped>
.header-container {
    width: 100%;
    padding: 0 20px;
    background-color: #808ea4;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .el-dropdown-link {
        color: #fff;
    }
}
</style>
