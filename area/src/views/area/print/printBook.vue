<template>
    <div >
        <el-row class="row-box" >
            <el-col :span="24">
                <el-button type="primary" class="nav-btn" size="small" @click="isActive=0" v-if="isActive ==0">贵州省证书</el-button>
                <el-button  class="nav-btn" size="small" @click="isActive=0" v-else>贵州省证书</el-button>

                <el-button  type="primary" class="nav-btn" size="small" @click="isActive =1" v-if="isActive ==1">遵义汇川区证书</el-button>
                <el-button  class="nav-btn" size="small" @click="isActive =1" v-else>遵义汇川区证书</el-button>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row>
                <el-col :span="24"><span class="col-title">选择证书页进行模板配置</span></el-col>
            </el-row>

            <el-row v-if="isActive == 0" >
                <el-col :span="24">
                    <div class="list-box">
                        <div class="item-box"
                             v-for="(item,index) in list.guizhou"
                             :key="index"
                            @click="setBtn(item.id)">
                            <div class="item-img">
                                <img :src="item.src" alt="">
                            </div>
                            <div class="item-text">
                                <div class="item-address">
                                        {{item.seat}}
                                </div>
                                <div class="item-info">
                                    {{item.info}}
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row v-else >
                <el-col :span="24">
                    <div class="list-box">
                        <div class="item-box"
                             v-for="(item,index) in list.huichuan"
                             :key="index"
                             @click="setBtn(item.id)">
                            <div class="item-img">
                                <img :src="item.src" alt="">
                            </div>
                            <div class="item-text">
                                <div class="item-address">
                                    {{item.seat}}
                                </div>
                                <div class="item-info">
                                    {{item.info}}
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "printBook",
        data(){
            return{
                list:this.$constData.printBookList,
                isActive:0
            }
        },
        methods:{
            setBtn(id){
                this.$router.push({
                    path:'/areaPrintTemplate',
                    name:'areaPrintTemplate',
                    params:{
                        id:id
                    }
                })
            }
        },
        mounted(){

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
        line-height: 20px;
        color: #666;
        font-size: 16px;
    }
    .list-box{
        padding: 20px;
    }
    .item-box{
        float: left;
        margin-left: 20px;
        margin-top: 20px;
        width: 250px;
        height: 450px;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        border:  1px solid #ddd;
        transition: ease all .5s;
    }
    .item-box:hover{
        box-shadow: 0px 0px 8px 5px rgba(0,0,0,.3);
    }
    .item-img{
        width: 250px;
        height: 400px;
    }
    .item-img img{
        width: 250px;
        height: 400px;
    }
    .item-text{
        height: 50px;
        width: auto;
    }
    .item-address{
        width: auto;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: #666;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .item-info{
        width: auto;
        height: 20px;
        line-height: 20px;
        color: #666;
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>
