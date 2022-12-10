<template>
    <el-row>
        <el-col :span="24"
            ><el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>Card name12</span>
                        <el-button class="button" text>Operation button</el-button>
                    </div>
                </template>
                <div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
            </el-card></el-col
        >
    </el-row>
    <el-row>
        <el-col :span="12"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="12"><div class="grid-content ep-bg-purple-light" /></el-col>
    </el-row>
    <el-row>
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple-light" /></el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
    </el-row>
    <el-row>
        <el-col :span="4"
            ><div class="grid-content ep-bg-purple" />
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>Card name</span>
                        <el-button class="button" text>Operation button</el-button>
                    </div>
                </template>
                <div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
            </el-card></el-col
        >
        <el-col :span="4"><div class="grid-content ep-bg-purple-light" /></el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple-light" /></el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple-light" /></el-col>
    </el-row>
</template>

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
.box-card {
    background-color: rgb(132, 228, 42);
}
</style>
