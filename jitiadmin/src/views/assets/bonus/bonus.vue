<template>
    <div>

        <el-row class="row-box-tilte">
            <el-col :span="24">
                财务分红信息
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="18" :offset="3">
                <div class="image-box">
                    <img src="../../../assets/image/bonus/1.png" alt="">
                    <img src="../../../assets/image/bonus/2.png" alt="">
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    export default {
        name: "bonus"
    }
</script>

<style scoped lang="scss">
    .row-box {
        background: #fff;
        padding: 15px 0;
    }

    .nav-btn {
        float: left;
        margin-left: 15px;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .row-box-tilte{
        background: #fff;
        padding: 15px;
        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;
        margin-bottom: 15px;
    }
    .image-box img{
        width: auto;
        margin-top: 20px;
    }
</style>
