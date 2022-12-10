<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="atuo" class="home-aside">
                <CommonAside style="height: 100%" />
            </el-aside>
            <el-container>
                <el-header class="el-header">
                    <CommonHeader class="header-cton" />
                </el-header>
                <el-main> <router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from "@/components/CommonAside.vue"
import CommonHeader from "@/components/CommonHeader.vue"
export default {
    components: {
        CommonAside,
        CommonHeader
    }
}
</script>

<style>
.common-layout {
    width: 100%;
    height: 100%;
}
.e-container {
    height: 100%;
}
.home-aside {
    height: 100vh;
}
.el-header {
    padding: 0 !important;
}
.header-cton {
    width: 100% !important;
    padding: 0 !important;
}
</style>
