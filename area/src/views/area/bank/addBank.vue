<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                创建银行金融机构
            </el-col>
        </el-row>

        <el-row class="row-box1">
            <el-col :span="24" style="margin-top: 2rem">
                <el-col :span="4">
                    <div class="title-box">银行金融机构名称:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="name" placeholder="银行金融机构名称"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-top: 2rem">
                <el-col :span="4">
                    <div class="title-box">银行详细地址:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="address" placeholder="银行详细地址"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-top: 2rem">
                <el-col :span="4">
                    <div class="title-box">组织机构代码:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="code" placeholder="组织机构代码"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <div class="row-box3">
                    <el-button type="primary" @click="createBtn">创建银行金融组织</el-button>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script>


    export default {
        name: "addMech",
        data() {
            return {
                name:'',
                address:'',
                code:'',

            }
        },

        methods: {
            createBtn() {
                if(this.name == '' || this.code == '' || this.address == ''){
                    this.$message.error('请将信息输入完整')
                }else{
                    let cnt= {
                        districtId: localStorage.getItem('orgId'), // Long 区级id
                        name: this.name, // String 银行名称
                        address: this.address, // String 银行地址
                        code: this.code, // String 银行机构代码
                    }
                    this.$area.createBankORG(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.$message.success('创建成功')
                            this.$router.push('/areaBank')
                        }else{
                            this.$message.error('创建失败！')
                        }
                    })
                }



            }


        },
        mounted() {

        },
    }
</script>

<style scoped lang="scss">
    .row-box {
        background: #fff;
        padding: 15px;
        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;

    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }

    .title-box {
        font-size: 1.6rem;
        line-height: 40px;
        letter-spacing: 2px;
        font-weight: 600;
        color: #666;
        text-align: right;
    }

    .text-box {
        margin-left: 50px;
    }

    .row-box2 {
        margin-top: 20px;
    }

    .row-box3 {
        margin-top: 20px;
        text-align: center;
        padding-bottom: 20px;
    }

    .image-box {
        margin-left: 50px;
        width: 400px;
        height: 300px;
        overflow: hidden;
        float: left;
    }

    .image-box img {
        width: 400px;
        height: 300px;
        overflow: hidden;
        cursor: pointer;
    }

    .image-load {
        float: left;
        margin-left: 50px;
        line-height: 150px;
    }

</style>
