<template>
    <el-row :gutter="20" v-for="item in users" :key="item.username">
        <el-col :span="6" v-for="item in users" :key="item.username">
            <el-card class="box-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>{{ item.username }}</span>
                        <el-button class="button" text>测试</el-button>
                    </div>
                </template>
                <div v-for="o in 4" :key="o" class="text item">{{ item.password + o }}</div>
            </el-card>
        </el-col>
    </el-row>
    <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </template>
    </el-upload>
</template>

<script lang="ts">
import { UploadFilled } from "@element-plus/icons-vue"

export default {
    data() {
        return {
            users: [
                { username: "kid", password: 1 },
                { username: "kid", password: 1 },
                { username: "kid", password: 1 },
                { username: "kid", password: 1 }
            ]
        }
    }
}
</script>

<style>
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
</style>
