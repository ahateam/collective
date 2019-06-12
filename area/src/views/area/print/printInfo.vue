<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="col-title"> 股权证书首页打印</span>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row>
                <el-col :span="24">
                   <div class="title-change">
                        <div class="title">
                            常用资料选择：
                        </div>
                       <div class="list">
                           <el-tag
                                   :key="tag"
                                   v-for="tag in dynamicTags"
                                   closable
                                   :disable-transitions="false"
                                   @close="handleClose(tag)">
                               {{tag}}
                           </el-tag>
                           <el-input
                                   class="input-new-tag"
                                   v-if="inputVisible"
                                   v-model="inputValue"
                                   ref="saveTagInput"
                                   size="small"
                                   @keyup.enter.native="handleInputConfirm"
                                   @blur="handleInputConfirm"
                           >
                           </el-input>
                           <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>


                       </div>
                   </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="24">
                    <div class="box-bg">
                       <div class="bg">
                           <div class="box-left">

                           </div>
                           <div class="box-right">
                               <div class="box-edit">
                                    <div class="info-title">
                                        成 员 股 权 证
                                    </div>
                                   <div class="info-number">
                                       证书编号:
                                   </div>
                                   <div class="info-name">
                                        <div class="book-title">
                                            合作社名称:
                                        </div>
                                       <div class="book-val">

                                       </div>
                                   </div>
                                   <div class="info-name">
                                       <div class="book-title">
                                           合作社地址:
                                       </div>
                                       <div class="book-val">

                                       </div>
                                   </div>
                                   <div class="info-name">
                                       <div class="book-title">
                                           成立时间:
                                       </div>
                                       <div class="book-val">

                                       </div>
                                   </div>
                                   <div class="info-name">
                                       <div class="book-title">
                                           合作社代码:
                                       </div>
                                       <div class="book-val">

                                       </div>
                                   </div>
                               </div>

                           </div>
                       </div>
                        <!--<div class="box-val">-->

                        <!--</div>-->
                    </div>
                </el-col>
            </el-row>

            <el-row style="margin-top: 20px">
                <el-col :soan="24" style="text-align: center">
                    <el-button type="primary">打印预览</el-button>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "printInfo",
        data(){
            return{
                id:'',
                dynamicTags: ['松林集体经济组织', '汇集权制0111225', '汇川区松林镇松林村','SLZ05626','2019-06-02'],
                inputVisible: false,
                inputValue: ''
            }
        },
        methods:{
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        },
        mounted(){
            this.id = this.$route.params.id

            // if(this.id == undefined || this.id == ''){
            //     this.$message.error('信息失效，请先选择一个打印模板')
            //     this.$router.push('/printBook')
            // }
        }
    }
</script>

<style scoped lang="scss">
    .nav-btn{
        float: left;
        margin-left: 15px;
    }
    .row-box{
        background: #fff;
        padding:15px 0;
    }
    .row-box1{
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .col-title{
        padding-left: 10px;
        line-height: 20px;
        color: #666;
        font-size: 16px;
    }
    .box-bg{
        margin: 0 auto;
        position: relative;
        width: 891px;
        height: 630px;
        border: 1px solid #aaa;
    }
    .bg{
        position: absolute;
        width: 891px;
        height: 630px;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .box-val{
        position: absolute;
        width: 891px;
        height: 630px;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .box-left{
        float: left;
        width: 445px;
        height: 630px;
        border-right: 1px solid #aaa;
        background:#ddd ;
    }
    .box-right{
        float: left;
        width:445px ;
        height: 630px;
        cursor: pointer;
    }
    .box-edit{
        width: auto;
        height: 630px;
    }
    .title-change{
        width: auto;

    }
    .title{
        float: left;
        color: #666;
        font-size: 16px;
        line-height: 30px;
    }
    .list{
        float: left;
        margin-left: 20px;
    }
    .list-item{
        float:left;
        margin-left: 10px;
        margin-top: 10px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .info-title{
        margin-top: 10px;
        width: auto;
        color: #666;
        font-size: 20px;
        text-align: center;
    }
    .info-number{
        margin-top: 20px;
        font-size: 14px;
        color: #666;
        margin-left: 55%;
    }
    .info-name{

        width: 90%;
        margin: 0 auto;
        margin-top: 30px;
        height: 50px;
    }
    .book-title{
        float: left;
        width: 100px;
        line-height: 70px;
        font-size: 16px;
        color: #666;
        height: 50px;
    }
    .book-val{
        float: left;
        width:280px;
        height: 40px;
        border-bottom: 1px dashed #333;
    }
</style>
