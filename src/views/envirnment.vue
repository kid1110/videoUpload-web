<template>
    <el-row>
        <el-col :span="12">
            <el-card class="box-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>服务器环境参数</span>
                    </div>
                </template>
                <div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>配置信息</span>
                    </div>
                </template>
                <div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
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
                        <el-dropdown-item :command="pushImages">{{ pushImages }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-button type="primary" style="margin-left: 15px">修改服务器配置</el-button></el-col
        >
    </el-row>
    <el-divider v-if="loadContainer" />
    <el-row class="container-row"> </el-row>
    <el-col :span="6" v-if="loadContainer"><div class="grid-content ep-bg-purple-light" /></el-col>
</template>

<script lang="ts">
import { ElMessage } from "element-plus"
import { UploadFilled } from "@element-plus/icons-vue"

export default {
    data() {
        return {
            loadContainer: false,
            showImages: "查看docker镜像",
            pushImages: "上传docker镜像",
            chooseAction: "查看docker镜像",
            serverConfigs: []
        }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}
</style>
