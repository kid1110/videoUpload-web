<template>
    <div class="auth-box">
        <el-form label-width="160px">
            <el-form-item label="提升以下用户为管理员">
                <el-select v-model="users" multiple filterable remote placeholder="输入用户名" :remote-method="getUser" remote-show-suffix>
                    <el-option v-for="item in retUsers" :key="item.uid" :value="item.uid" :label="item.username"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="add-btn" @click="updateUsersAuths" :loading="isAdding">增加管理员</el-button>
    </div>
</template>

<script>
import { ElMessage } from "element-plus"
import { getUsers, updateUsersAuth } from "../utils/api.js"
export default {
    data() {
        return {
            users: [],
            retUsers: [],
            isAdding: false
        }
    },
    mounted() {
        this.getUser("")
    },
    methods: {
        getUser(query) {
            this.debounce(
                getUsers(query).then((res) => {
                    if (res.data.code === 1) {
                        this.retUsers = res.data.data
                    }
                }),
                300
            )
        },
        updateUsersAuths() {
            console.log(this.users)
            this.isAdding = true
            updateUsersAuth(this.users)
                .then((res) => {
                    if (res.data.code === 1) {
                        ElMessage.success({
                            duration: 1000,
                            message: "更新用户状态成功"
                        })
                        this.users = []
                        this.isAdding = false
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.isAdding = false
                })
        },
        debounce(fn, delay) {
            return (...args) => {
                if (timerId) {
                    clearTimeout(timerId)
                }
                timerId = setTimeout(() => {
                    fn.apply(this, args)
                }, delay)
            }
        }
    }
}
</script>

<style>
.auth-box {
    margin-left: 10px;
    width: 600px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}
.add-btn {
    margin-top: 20px;
    width: 100px;
}
</style>
