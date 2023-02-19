<template>
    <el-card class="container-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span class="container-id">{{ Id }}</span>
                <div class="container-button">
                    <el-button class="container-stopButton" type="primary" v-if="State === 'running'" @click="stopContainer" :loading="isStoping" :disabled="isKilling">停止容器</el-button>
                    <el-button class="container-stopButton" type="primary" v-if="State === 'exited'" @click="restartContainer" :loading="isRestarting" :disabled="isRestarting">重启容器</el-button>
                    <el-button class="container-startButton" type="primary" v-if="State === 'created'" :loading="isStarting" @click="startContainer">启动容器</el-button>
                    <el-button class="container-killButton" type="danger" :disabled="isStoping || isRestarting" :loading="isKilling" @click="killContainer">删除容器</el-button>
                </div>
            </div>
        </template>
        <div class="container-data">
            <div>
                <span class="container-item">Names: </span>
                <span class="container-item-data"> {{ Names }}</span>
            </div>
            <div>
                <span class="container-item">PrivatePort: </span>
                <span class="container-item-data"> {{ PrivatePort }}</span>
            </div>
            <div>
                <span class="container-item">PublicPort: </span>
                <span class="container-item-data"> {{ PublicPort }}</span>
            </div>
            <div>
                <span class="container-item">Image: </span>
                <span class="container-item-data">{{ Image }}</span>
            </div>
            <div>
                <span class="container-item">ImageID: </span>
                <span class="container-item-data">{{ ImageID }}</span>
            </div>
            <div>
                <span class="container-item">Status: </span>
                <span class="container-item-data">{{ Status }}</span>
            </div>
            <div>
                <span class="container-item">State: </span>
                <span class="container-item-data">{{ State }}</span>
            </div>
        </div>
        <div v-if="State === 'running'">
            <el-progress :percentage="100" status="success" />
        </div>
        <div v-if="State === 'exited'">
            <el-progress :percentage="100" status="exception" />
        </div>
        <div v-if="State === 'created'">
            <el-progress :percentage="100" />
        </div>
    </el-card>
</template>

<script>
import { stopContainers, killContainers, restartContainers, startContainers } from "../utils/api.js"
import { ElMessage } from "element-plus"

export default {
    props: {
        Id: String,
        PrivatePort: {
            type: Number,
            require: false
        },
        PublicPort: {
            type: Number,
            require: false
        },
        Names: {
            type: Object,
            default: null
        },
        Image: String,
        ImageID: String,
        Status: String,
        State: String
    },
    data() {
        return {
            isStoping: false,
            isKilling: false,
            isRestarting: false,
            isStarting: false
        }
    },
    methods: {
        stopContainer() {
            this.isStoping = true
            stopContainers(this.Id)
                .then((res) => {
                    if (res.data.code === 1) {
                        ElMessage.success({
                            duration: 1000,
                            message: "停止" + this.Names[0] + "成功"
                        })
                        console.log("stop success")
                        console.log(res)
                        this.isStoping = false
                        this.$emit("refresh-containers")
                    } else {
                        ElMessage.error({
                            duration: 1000,
                            message: "停止" + this.Names[0] + "失败"
                        })
                        this.isStoping = false
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.isStoping = false
                })
        },
        killContainer() {
            this.isKilling = true
            killContainers(this.Id)
                .then((res) => {
                    if (res.data.code === 1) {
                        ElMessage.success({
                            duration: 1000,
                            message: "删除" + this.Names[0] + "成功"
                        })
                        this.isKilling = false
                        this.$emit("refresh-containers")
                    } else {
                        ElMessage.error({
                            duration: 1000,
                            message: "停止" + this.Names[0] + "失败"
                        })
                        this.isKilling = false
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.isKilling = false
                })
        },
        restartContainer() {
            this.isRestarting = true
            restartContainers(this.Id)
                .then((res) => {
                    if (res.data.code === 1) {
                        ElMessage.success({
                            duration: 1000,
                            message: "重启" + this.Names[0] + "成功"
                        })
                        this.isRestarting = false
                        this.$emit("refresh-containers")
                    } else {
                        ElMessage.error({
                            duration: 1000,
                            message: "重启" + this.Names[0] + "失败"
                        })
                        this.isRestarting = false
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.isRestarting = true
                })
        },
        startContainer() {
            this.isStarting = true
            startContainers(this.Id).then((res) => {
                if (res.data.code === 1) {
                    ElMessage.success({
                        duration: 1000,
                        message: "启动" + this.Names[0] + "成功"
                    })
                    this.isStarting = false
                    this.$emit("refresh-containers")
                } else {
                    ElMessage.error({
                        duration: 1000,
                        message: "启动" + this.Names[0] + "失败"
                    })
                    this.isStarting = false
                }
            })
        }
    }
}
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}
.container-id {
    font-size: 20px;
}

.item {
    margin-bottom: 18px;
}

.container-card {
    width: 980px;
    margin: 8px;
}
.container-item {
    font-size: 20px;
    color: black;
    font-weight: 500;
}
.container-item-data {
    font-size: 18px;
    font-weight: 400;
}
</style>
