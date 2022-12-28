<template>
    <el-row>
        <el-col :span="12">
            <el-card class="server-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>服务器环境参数</span>
                    </div>
                </template>
                <div class="server-data">
                    <div v-for="item in brokerInfos" :key="item.label" class="text item">{{ item.name + item.data }}</div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>配置信息</span>
                    </div>
                </template>
                <div v-for="item in videoInfos" :key="item.label" class="text item">{{ item.name + item.data }}</div>
            </el-card>
        </el-col>
    </el-row>
    <el-row class="btn-row">
        <el-col :span="24">
            <el-dropdown split-button type="primary" @click="getDockerImages" class="docker-drop" @command="handleCommpand">
                {{ chooseAction }}
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :command="showImages">{{ showImages }}</el-dropdown-item>
                        <el-dropdown-item :command="showContainers">{{ showContainers }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-button type="primary" style="margin-left: 15px">上传docker镜像</el-button></el-col
        >
    </el-row>
    <el-divider v-if="loadContainer" />
    <el-row class="container-row"> </el-row>
    <el-col :span="6" v-if="loadContainer"><div class="grid-content ep-bg-purple-light" /></el-col>
</template>

<script lang="ts">
import { ElMessage } from "element-plus"
import { UploadFilled } from "@element-plus/icons-vue"
import { getBrokerInfo, getVideoInfo } from "../utils/api.js"

export default {
    data() {
        return {
            loadContainer: false,
            showImages: "查看docker镜像",
            showContainers: "查看docker容器",
            chooseAction: "查看docker镜像",
            timer: { value: null },
            brokerInfos: [
                {
                    name: "ip地址: ",
                    data: "",
                    label: "ip"
                },
                {
                    name: "总内存: ",
                    data: "",
                    label: "memTotal"
                },
                {
                    name: "已使用内存: ",
                    data: "",
                    label: "memUsed"
                },
                {
                    name: "已使用内存占比: ",
                    data: "",
                    label: "memUsedRate"
                },
                {
                    name: "剩余内存: ",
                    data: "",
                    label: "memFree"
                },
                {
                    name: "剩余内存占比: ",
                    data: "",
                    label: "memFreeRate"
                },
                {
                    name: "总磁盘大小: ",
                    data: "",
                    label: "diskTotal"
                },
                {
                    name: "剩余磁盘大小: ",
                    data: "",
                    label: "diskFree"
                }
            ],
            videoInfos: [
                {
                    name: "视频数量: ",
                    data: 0,
                    label: "videoNum"
                },
                {
                    name: "用户数量: ",
                    data: 0,
                    label: "userNum"
                },
                {
                    name: "docker镜像数量: ",
                    data: 0,
                    label: "imgNum"
                },
                {
                    name: "docker容器数量: ",
                    data: 0,
                    label: "containerNum"
                }
            ]
        }
    },
    mounted() {
        this.timer.value = setInterval(async () => {
            await getBrokerInfo().then((res) => {
                if (res.data.code === 1) {
                    console.log(res.data.data)
                    console.log(res.data.data["ip"])
                    this.brokerInfos.map((item) => {
                        item.data = res.data.data[item.label]
                    })
                    console.log(this.brokerInfos)
                }
            })
        }, 1000)
        this.timer.second = setInterval(async () => {
            await getVideoInfo().then((res) => {
                this.videoInfos.map((item) => {
                    item.data = res.data.data[item.label]
                })
            })
        }, 1000)
    },
    unmounted() {
        clearInterval(this.timer.value)
    },

    methods: {
        getDockerImages() {
            if (this.chooseAction === this.showImages) {
                this.loadContainer = !this.loadContainer
            }
        },
        handleCommpand(command) {
            this.chooseAction = command
        }
    }
}
</script>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.card-header {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 20px;
}

.item {
    margin-bottom: 18px;
    margin-right: 20px;
}
.server-card {
    width: 600px;
}
.box-card {
    width: 480px;
}
// .server-data {
//     display: flex;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     flex-direction: column;
// }
</style>
