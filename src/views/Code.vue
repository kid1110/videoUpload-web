<template>
    <div class="code-upload-box">
        <el-form class="code-upload-form" :rules="rules" :model="uploadEntity" ref="codeform">
            <el-form-item label="容器名称" class="upload-item" prop="dockerName">
                <el-input placeholder="请输入docker容器的名称" v-model="uploadEntity.dockerName"></el-input>
            </el-form-item>
            <el-form-item label="模型名称" class="upload-item" prop="modelName">
                <el-input placeholder="请输入该模型分析的名称" v-model="uploadEntity.modelName"></el-input>
            </el-form-item>
            <el-form-item label="端口映射" class="upload-item" prop="publicPort">
                <el-col :span="11">
                    <el-form-item prop="publicPort">
                        <el-input placeholder="请输入宿主机端口" v-model="uploadEntity.publicPort"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2" class="text-center">
                    <span>:</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="privatePort">
                        <el-input placeholder="请输入docker容器内部端口" v-model="uploadEntity.privatePort" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="日志挂载">
                <el-col :span="11">
                    <el-form-item>
                        <el-input placeholder="请输入宿主机日志目录" v-model="uploadEntity.logOutMount">
                            <template #prepend>var/log/video/</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2" class="text-center">
                    <span>-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item>
                        <el-input placeholder="请输入容器中的日志目录" v-model="uploadEntity.logInMount"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="数据挂载">
                <el-col :span="11">
                    <el-form-item>
                        <el-input placeholder="请输入宿主机的数据目录" v-model="uploadEntity.dataOutMount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2" class="text-center">
                    <span>-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item>
                        <el-input placeholder="请输入容器中的数据目录" v-model="uploadEntity.dataInMount"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="Docker镜像选择" prop="imageSelect">
                <el-col :span="11">
                    <el-form-item>
                        <el-select placeholder="请选择你需要的Docker镜像" v-model="uploadEntity.imageSelect" remote filterable remote-show-suffix :remote-method="remoteImages" :loading="remoteSelect">
                            <el-option v-for="item in dockerImages" :key="item.Id" :value="item.RepoTags[0] + item.Id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="上传代码后是否启动新容器">
                        <el-switch v-model="uploadEntity.confirmRun" />
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
    <div class="code-shell-box">
        <el-upload class="code-upload" drag action="http://localhost:8899/web/createContainer" multiple v-model:file-list="uploadEntity.fileList" :on-change="uploadChange" :on-progress="uploadProcess" accept=".zip,.rar" :before-upload="beforeUpload" :auto-upload="false" :on-remove="handleRemove" ref="codeUpload" :limit="1" :on-exceed="handleExceed">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拖动代码到这里 or<em>点击上传</em></div>
            <template #tip>
                <div class="el-upload__tip">请上传zip/rar 压缩包</div>
            </template>
        </el-upload>
        <el-form class="shell-upload">
            <el-form-item prop="shell">
                <!-- <el-input class="shell-text" v-model="uploadEntity.shell" :rows="2" type="textarea" placeholder="请输入shell启动脚本"> </el-input> -->
                <Codemirror class="shell-text" v-model:value="uploadEntity.shell" :options="cmOptions" border :placeholder="shellPlaceholder" :height="400" :width="500" matchBrackets:true @change="change" />
            </el-form-item>
        </el-form>
    </div>
    <div class="upload-button">
        <el-button type="primary" @click="uploadButton" :loading="isUploading">上传代码</el-button>
    </div>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue"
</script>
<script>
import { ElMessage } from "element-plus"
import { trigger } from "@vue/reactivity"
import { getImages, createContainers } from "../utils/api.js"
import { genFileId } from "element-plus"
import Codemirror from "codemirror-editor-vue3"
import "codemirror/mode/shell/shell.js"
import "codemirror/theme/cobalt.css"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/show-hint"
import "codemirror/addon/display/placeholder.js"

export default {
    components: {
        Codemirror
    },
    data() {
        return {
            uploadPercent: 0,
            shellPlaceholder: "当前位置位于压缩包的根位置\n请输入相应的shell脚本用于编译/运行代码\n例子：\ncd test && python main.py",
            isUploading: false,
            cmOptions: {
                mode: "text/x-sh",
                theme: "cobalt",
                lineNumbers: true,
                smartIndent: true,
                indentUnit: 2,
                foldGutter: true,
                styleActiveLine: true,
                extraKeys: { Tab: "autocomplete" }
            },
            remoteSelect: false,
            uploadEntity: {
                dockerName: "",
                modelName: "",
                publicPort: 1234,
                privatePort: 1234,
                logOutMount: "",
                logInMount: "",
                dataOutMount: "",
                dataInMount: "",
                imageSelect: "",
                confirmRun: false,
                fileList: [],
                shell: ""
            },
            rules: {
                dockerName: [
                    { required: true, message: "请输入docker容器的名称", trigger: "blur" },
                    {
                        required: true,
                        pattern: new RegExp("^/?[a-zA-Z0-9][a-zA-Z0-9_.-]+$"),
                        message: "一个合法的容器名称只能包含以下字符：小写字母a~z、大写字母A~Z、数字0~9、下划线、圆点、横线",
                        trigger: "blur"
                    }
                ],
                modelName: [{ required: true, message: "请输入该模型分析的名称", trigger: "blur" }],
                publicPort: [
                    { required: true, message: "请输入宿主机端口", trigger: "blur" },
                    {
                        required: true,
                        pattern: /^[0-9]*$/,
                        message: "请输入数字",
                        trigger: "blur"
                    }
                ],
                privatePort: [
                    { required: true, message: "请输入docker容器内部端口", trigger: "blur" },
                    {
                        required: true,
                        pattern: /^[0-9]*$/,
                        message: "请输入数字",
                        trigger: "blur"
                    }
                ],
                imageSelect: [{ required: true, message: "请选择你需要的Docker镜像", trigger: "blur" }],
                shell: [{ required: true, message: "shell启动脚本不能为空", trigger: "blur" }]
            },
            dockerImages: []
        }
    },
    mounted() {
        getImages()
            .then((res) => {
                if (res.data.code === 1) {
                    this.dockerImages = res.data.data
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    methods: {
        remoteImages(query) {
            this.remoteSelect = true
            //防抖操作
            this.debounce(this.remoteGetImages(query), 300)
            console.log(this.uploadEntity.imageSelect)
            this.remoteSelect = false
        },
        remoteGetImages(query) {
            getImages()
                .then((res) => {
                    if (res.data.code === 1) {
                        if (query) {
                            this.dockerImages = res.data.data.filter((item) => {
                                return item.RepoTags[0].includes(query)
                            })
                            console.log(this.dockerImages)
                        } else {
                            this.dockerImages = res.data.data
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    this.remoteSelect = false
                })
        },
        uploadChange() {
            console.log(this.fileList)
        },
        uploadButton() {
            this.$refs.codeform.validate((v) => {
                if (!v) {
                    ElMessage.error({
                        duration: 500,
                        message: "表单填写要求不达标"
                    })
                    return false
                }
                console.log(this.fileList)

                if (this.uploadEntity.fileList.length === 0) {
                    ElMessage.error({
                        duration: 1000,
                        message: "请上传代码压缩包"
                    })
                    return false
                }
                const judge = this.beforeUpload(this.uploadEntity.fileList[0])
                if (!judge) {
                    return false
                }
                console.log(this.uploadEntity)
                this.isUploading = true
                createContainers(this.uploadEntity)
                    .then((res) => {
                        console.log(res)
                        if (res.data.code === 1) {
                            ElMessage.success({
                                duration: 1000,
                                message: "上传代码成功"
                            })
                            this.isUploading = false
                            this.$router.replace({ name: "home" })
                        }
                    })
                    .finally((this.isUploading = false))
            })
        },
        uploadProcess(event, file, fileList) {},
        beforeUpload(file) {
            const isLt500M = file.size / 1024 / 1024 < 500
            let sufix = file.name.split(".")[file.name.split(".").length - 1]

            let isFile = sufix === "zip" || sufix === "rar"
            console.log(file)
            console.log(file.name.split("."))
            console.log(isFile)

            if (!isFile) {
                ElMessage.error({
                    duration: 1000,
                    message: "导入文件格式不正确"
                })
                return false
            }
            if (!isLt500M) {
                ElMessage.error({
                    duration: 1000,
                    message: "压缩包大小不能超过500MB"
                })
                return false
            }
            return true
        },
        handleRemove(file, fileList) {
            this.$refs.codeUpload.clearFiles()
            console.log(this.uploadEntity.fileList)
        },
        handleExceed(files) {
            console.log(this.uploadEntity.fileList)
            this.$refs.codeUpload.clearFiles()
            const file = files[0]
            file.uid = genFileId()
            this.$refs.codeUpload.handleStart(file)
        },
        change(val, cm) {
            console.log("shell: " + this.uploadEntity.shell)
        },
        debounce(fn, delay) {
            return (...args) => {
                if (debounceTimer) {
                    clearTimeout(debounceTimer)
                }
                debounceTimer = setTimeout(() => {
                    fn.apply(this, args)
                }, delay)
            }
        }
    }
}
</script>

<style>
.code-upload-box {
    display: flex;
    justify-content: center;
}
.code-upload-form {
    width: 800px;
    margin-top: 20px;
}
.text-center {
    display: flex;
    justify-content: center;
}
.code-upload {
    margin-top: 20px;
}
/* .upload-item {
    margin-top: 20px;
} */
.code-shell-box {
    height: 500px;
    display: flex;
    justify-content: space-evenly;
    align-content: center;
}
.el-upload-dragger {
    width: 500px;
    height: 400px;
}
.el-textarea__inner {
    width: 500px;
    height: 400px;
}
.shell-text {
    margin-top: 20px;
    height: 100%;
    font-size: 20px;
}
</style>
