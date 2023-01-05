<template>
    <el-card class="image-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span class="image-id">{{ id }}</span>
                <div>
                    <el-button class="image-button" type="danger" @click="removeImage" :loading="isRemoving">删除镜像</el-button>
                </div>
            </div>
        </template>
        <div class="image-data">
            <div>
                <span class="image-item">Created: </span>
                <span class="image-item-data"> {{ created }}</span>
            </div>
            <div>
                <span class="image-item">RepoTags: </span>
                <span class="image-item-data"> {{ RepoTags }}</span>
            </div>
            <div>
                <span class="image-item">Size: </span>
                <span class="image-item-data">{{ Size }}</span>
            </div>
        </div>
    </el-card>
</template>

<script>
import { removeImages } from "../utils/api.js"
import { ElMessage } from "element-plus"
export default {
    props: {
        id: String,
        created: String,
        RepoTags: Object,
        Size: Number
    },
    data() {
        return {
            isRemoving: false
        }
    },
    methods: {
        removeImage() {
            this.isRemoving = true
            removeImages(this.id)
                .then((res) => {
                    if (res.data.code === 1) {
                        ElMessage.success({
                            duration: 1000,
                            message: "删除" + this.RepoTags[0] + "镜像成功"
                        })
                        this.isRemoving = false
                        this.$emit("refresh-images")
                    } else if (res.data.code === -514) {
                        this.isRemoving = false
                    } else {
                        ElMessage.error({
                            duration: 1000,
                            message: "删除" + this.RepoTags[0] + "镜像失败"
                        })
                        this.isRemoving = false
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.isRemoving = false
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
    font-size: 12px;
}
.image-id {
    font-size: 20px;
}
.image-button {
    margin: 8px;
}

.item {
    margin-bottom: 18px;
}

.image-card {
    width: 900px;
    margin: 8px;
}

.image-item {
    font-size: 20px;
    color: black;
    font-weight: 500;
}
.image-item-data {
    font-size: 18px;
    font-weight: 400;
}
@media screen {
}
</style>
