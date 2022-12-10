<template>
    <div class="container">
        <el-card class="login-box" shadow="hover">
            <el-form class="login-form" :model="loginForm" ref="loginForm" :rules="rules">
                <el-form-item label="" prop="username">
                    <el-input placeholder="请输入账号" v-model="loginForm.username"> </el-input>
                </el-form-item>
                <el-form-item label="" prop="password" style="display: flex; justify-content: flex-start">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item class="login-button">
                    <el-button type="primary" :disabled="loginButton" :loading="loginButton" @click="submitForm">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { ElMessage } from "element-plus"
import jwt_decode from "jwt-decode"
import { loginRequest } from "../utils/api.js"
export default {
    data() {
        return {
            loginForm: { username: "", password: "" },
            loginButton: false,
            rules: {
                username: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                    { max: 10, message: "账号在10个字以下", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { max: 10, message: "密码至少为6位", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        doLogin(username, password) {
            loginRequest(username, password).then((res) => {
                if (res.data.code === 1) {
                    ElMessage.success({
                        duration: 500,
                        message: "登录成功"
                    })
                    localStorage.setItem("eToken", res.data.data)
                    localStorage.setItem("uid", jwt_decode(res.data.data).uid)
                    localStorage.setItem("username", jwt_decode(res.data.data).username)
                    this.$router.replace({ name: "home" })
                }
            })
        },
        submitForm() {
            this.loginButton = true
            this.$refs.loginForm.validate((v) => {
                if (!v) {
                    return false
                }
                this.doLogin(this.loginForm.username, this.loginForm.password)
            })
            this.loginButton = false
        }
    }
}
</script>

<style>
.container {
    background-image: url("@/assets/images/login-background.jpg");
    background-position: center 0;
    background-size: cover;
    /* background-repeat: no-repeat; */
    font-size: 16px;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    opacity: 0.7;
}
.login-form {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
