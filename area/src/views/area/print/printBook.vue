<template>
    <div >
        <el-row class="row-box" >
            <el-col :span="24">
                <el-button type="primary" class="nav-btn">导入证书模板</el-button>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row>
                <el-col :span="24"><span class="col-title">选择打印模板进行打印</span></el-col>
            </el-row>
            <el-row >
                <el-col :span="24">
                    <div class="list-box">
                        <div class="item-box"
                             v-for="(item,index) in list"
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
                list:[]
            }
        },
        methods:{
            setBtn(id){
                this.$router.push({
                    path:'/areaPrintInfo',
                    name:'areaPrintInfo',
                    params:{
                        id:id
                    }
                })
            }
        },
        mounted(){
            this.list = [
                {
                    id:1,
                    src:'http://jitijingji-test1.oss-cn-hangzhou.aliyuncs.com/template/1.jpg',
                    seat:'右侧',
                    info:'成员股权证首页'
                },
                {
                    id:2,
                    src:'http://jitijingji-test1.oss-cn-hangzhou.aliyuncs.com/template/2.jpg',
                    seat:'右侧',
                    info:'初始登记页'
                },
                {
                    id:3,
                    src:'http://jitijingji-test1.oss-cn-hangzhou.aliyuncs.com/template/3.jpg',
                    seat:'左侧',
                    info:'变更登记页1'
                },
                {
                    id:4,
                    src:'http://jitijingji-test1.oss-cn-hangzhou.aliyuncs.com/template/3.jpg',
                    seat:'右侧',
                    info:'变更登记页2'
                },
                {
                    id:5,
                    src:'http://jitijingji-test1.oss-cn-hangzhou.aliyuncs.com/template/4.jpg',
                    seat:'左侧',
                    info:'抵押情况登记页'
                },
            ]
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
