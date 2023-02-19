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
                        <span>视频信息</span>
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
            <el-button type="primary" style="margin-left: 15px" @click="uploadImages">上传docker镜像</el-button></el-col
        >
    </el-row>
    <el-divider />
    <div v-if="loadContainer">
        <el-scrollbar height="900px">
            <div v-if="getImage">
                <ImageCard v-for="item in imagesInfos" :key="item.Id" :id="item.Id" :created="changeTimes(item.Created * 1000)" :RepoTags="item.RepoTags" :Size="item.Size" @refresh-images="getImaget"></ImageCard>
            </div>
            <div v-if="getContainer">
                <ContainerCard v-for="item in containerInfos" :key="item.Id" :Id="item.Id" :Image="item.Image" :ImageID="item.ImageID" :Status="item.Status" :PrivatePort="item.Ports.length > 0 ? item.Ports[0].PrivatePort : null" :PublicPort="item.Ports.length > 0 ? item.Ports[0].PublicPort : null" :State="item.State" :Names="item.Names" @refresh-containers="getDockerContainer"></ContainerCard>
            </div>
        </el-scrollbar>
    </div>
    <div v-if="uploadIm" class="docker-upload">
        <div class="upload-images">
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" class="docker-upload form" :rules="rules" ref="uploadForm">
                <el-form-item label="用户名" prop="dockerUsername">
                    <el-input v-model="formLabelAlign.dockerUsername" />
                </el-form-item>
                <el-form-item label="密码" prop="dockerPassword">
                    <el-input v-model="formLabelAlign.dockerPassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="仓库名" prop="dockerRegistory">
                    <el-input v-model="formLabelAlign.dockerRegistory" placeholder="请输入仓库地址以及tag:如kid1110/video-test:latest" />
                </el-form-item>
                <el-form-item class="upload-button">
                    <el-button type="primary" @click="upload" :loading="pullIm">上传镜像</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ElMessage } from "element-plus"
import { UploadFilled } from "@element-plus/icons-vue"
import { getBrokerInfo, getVideoInfo, getImages, getContainers, pullImages } from "../utils/api.js"
import ContainerCard from "@/components/ContainerCard.vue"
import ImageCard from "@/components/ImageCard.vue"
export default {
    components: {
        ContainerCard,
        ImageCard
    },
    data() {
        return {
            loadContainer: false,
            uploadIm: false,
            showImages: "查看docker镜像",
            showContainers: "查看docker容器",
            chooseAction: "查看docker镜像",
            pullIm: false,
            formLabelAlign: { dockerUsername: "", dockerPassword: "", dockerRegistory: "" },
            timer: { value: null },
            getImage: false,
            getContainer: false,
            rules: {
                dockerUsername: [{ required: true, message: "请输入您的dockerhub账号", trigger: "blur" }],
                dockerPassword: [{ required: true, message: "请输入您的dockerhub密码", trigger: "blur" }],
                dockerRegistory: [{ required: true, message: "请输入您的镜像仓库", trigger: "blur" }]
            },

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
            ],
            imagesInfos: [],
            containerInfos: []
        }
    },
    mounted() {
        // this.timer.value = setInterval(async () => {
        //     await getBrokerInfo().then((res) => {
        //         if (res.data.code === 1) {
        //             this.brokerInfos.map((item) => {
        //                 item.data = res.data.data[item.label]
        //             })
        //         }
        //     })
        // }, 1000)
        // this.timer.second = setInterval(async () => {
        //     await getVideoInfo().then((res) => {
        //         if (res.data.code === 1) {
        //             this.videoInfos.map((item) => {
        //                 item.data = res.data.data[item.label]
        //             })
        //         }
        //     })
        // }, 1000)
    },
    unmounted() {
        // clearInterval(this.timer.value)
    },

    methods: {
        uploadImages() {
            this.loadContainer = false
            this.uploadIm = true
        },
        getDockerImages() {
            this.loadContainer = true
            this.uploadIm = false
            if (this.chooseAction === this.showImages) {
                this.getImage = true
                this.getContainer = false
                getImages().then((res) => {
                    if (res.data.code === 1) {
                        this.imagesInfos = res.data.data
                        console.log(this.imagesInfos)
                    }
                })
            } else if (this.chooseAction === this.showContainers) {
                console.log("ttt")
                this.getImage = false
                this.getContainer = true
                getContainers().then((res) => {
                    if (res.data.code === 1) {
                        this.containerInfos = res.data.data
                        console.log(this.containerInfos)
                    }
                })
            }
        },
        handleCommpand(command) {
            this.chooseAction = command
            if (this.chooseAction === this.showImages) {
                this.getImage = true
                this.getContainer = false
            } else {
                this.getImage = false
                this.getContainer = true
            }
        },
        changeTimes(tim) {
            let time = new Date(tim)
            let data = time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8)
            return data
        },
        getDockerContainer() {
            getContainers().then((res) => {
                if (res.data.code === 1) {
                    this.containerInfos = res.data.data
                    console.log(this.containerInfos)
                }
            })
        },
        getImaget() {
            getImages().then((res) => {
                if (res.data.code === 1) {
                    this.imagesInfos = res.data.data
                    console.log(this.imagesInfos)
                }
            })
        },
        upload() {
            this.pullIm = true
            this.$refs.uploadForm.validate((v) => {
                if (!v) {
                    return false
                }
                this.uploadImage()
            })
            this.pullIm = false
        },
        uploadImage() {
            pullImages(this.formLabelAlign.dockerUsername, this.formLabelAlign.dockerPassword, this.formLabelAlign.dockerRegistory)
                .then((res) => {
                    console.log(res)
                    if (res.data.code === 1) {
                        ElMessage.success({
                            duration: 1000,
                            message: "拉取镜像" + "成功"
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
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
.server-data {
    display: grid;
    grid-template-columns: 50% 50%;
}
.docker-upload {
    margin-top: 8px;
    height: 800px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}
.docker-upload form {
    display: flex;
    width: 600px;
    justify-content: center;
}
.upload-images {
    display: flex;
    justify-content: center;
}
.upload-button {
    display: flex;
    justify-content: center;
}
</style>
