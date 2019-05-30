<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">创建新户操作</span>
            </el-col>
        </el-row>

        <el-row class="row-box1" >
            <el-col :span="24">
                <el-button type="primary" size="small">创建新家庭户</el-button>
            </el-col>
        </el-row>

        <el-row class="row-box1">


            <el-col :span="24" style="text-align: center">
                <el-button type="primary">确认提交新户信息进行审批</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "createFamily",
        methods:{

        },
    }
</script>

<style scoped lang="scss">
    .row-box {
        background: #fff;
        padding: 15px 0;
        border-left: 4px solid #63a35c;
    }

    .title-box {
        font-size: 16px;
        line-height: 30px;
        padding: 0 15px;

    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }

    .table-master {
        font-size: 14px;
        margin-left: 20px;
        line-height: 40px;
        color: #666;
    }
</style>
