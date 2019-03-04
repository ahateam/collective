<template>
    <div>
        <header-box title="集体资产"></header-box>
        <div class="main-box">

                <van-tabs  swipeable @change="changeTab" v-model="activeTab" >

                    <van-tab :title="item.keyword"  v-for="(item,index) in groups" :key="index">
                        <div  v-if="listData.length != 0">
                            <van-list
                                    v-model="loading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                    @load="onLoad"
                            >
                                <div class="box" v-for="(item,index) in listData" :key="index" >
                                    <div class="item-btn-box">
                                        <div class="btn-del" v-if="root == true" @click="delBtn(item)">
                                            <i class="iconfont icon-19icon"></i>
                                        </div>
                                        <div class="btn-box" @click="infoBtn(item)" >
                                            详情
                                        </div>
                                    </div>
                                    <div class="item-info-box" @click="infoBtn(item)">
                                        <div class="item-info-name">
                                            {{item.name}}
                                        </div>
                                        <div class="item-info-address">
                                            {{item.location}}
                                        </div>
                                    </div>

                                </div>
                            </van-list>
                        </div>
                        <div class="box" v-if="listData.length == 0">
                           <span class="text-info">
                                暂无集体资产，请管理员上传
                           </span>
                        </div>
                    </van-tab>

                </van-tabs>



            <div class="btn">
                <router-link to="/home">
                    <div class="create-btn" >返回首页</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Dialog } from 'vant';
    import { Toast } from 'vant';
    export default {
        name: "list",
        components:{
            HeaderBox
        },
        data(){
          return{
              listData:[],      //全部数据
              root:false,
              isMsg:true,
              offset:0,
              count: 10,
              groups:[],



              groupDataList:[],     //分组数据

              //分页加载
              groupId:'',
              list: [],
              loading: false,
              finished: false,

              activeTab:'',

          }
        },
        methods:{
            onLoad() {          //分页加载
                let that = this
                // 异步更新数据
                    this.offset = this.offset+this.count
                    let orgId = JSON.parse(localStorage.getItem('user')).orgId
                    if(this.groupId == ''){
                        let cnt = {
                            orgId:orgId,
                            count:this.count,
                            offset:this.offset
                        }
                        this.$api.queryAssets(cnt,function (res) {
                            let  arr = JSON.parse(res.data.c)
                            console.log(arr)
                            setTimeout(() => {
                                for (let i = 0; i < arr.length; i++) {
                                    that.listData.push(arr[i]);
                                }
                                // 加载状态结束
                                that.loading = false;

                                // 数据全部加载完成
                                if (arr.length< that.count) {
                                    that.finished = true;
                                }
                            }, 500);
                        })
                    }else{
                        let cnt = {
                            orgId: orgId, // Long 组织编号
                            groups: [this.groupId], // JSONArray <选填> 分组,JSONArray格式
                            count: this.count, // Integer
                            offset: this.offset, // Integer
                        }
                        this.$api.getAssetsByGroups(cnt,function (res) {
                            let  arr = JSON.parse(res.data.c)
                            setTimeout(() => {
                                for (let i = 0; i < arr.length; i++) {
                                    that.listData.push(arr[i]);
                                }
                                // 加载状态结束
                                that.loading = false;
                                // 数据全部加载完成
                                if (arr.length< that.count) {
                                    that.finished = true;
                                }
                            }, 500);
                        })
                    }






            },

            changeTab(index,value){
                let that = this
                let orgId = JSON.parse(localStorage.getItem('user')).orgId
                this.offset = 0
                this.finished = false
                if(index == 0){         //全部
                    this.groupId =''
                    let cnt = {
                        orgId:orgId,
                        count:this.count,
                        offset:this.offset
                    }
                    this.$api.queryAssets(cnt,function (res) {
                        that.listData = JSON.parse(res.data.c)
                    })
                }else{              //其他tab
                    for(let i = 0 ;i<this.groups.length;i++){
                        if(value == this.groups[i].keyword){
                            this.groupId = this.groups[i].groupId
                        }
                    }
                    let cnt = {
                        orgId: orgId, // Long 组织编号
                        groups: [this.groupId], // JSONArray <选填> 分组,JSONArray格式
                        count: this.count, // Integer
                        offset: this.offset, // Integer
                    }
                    console.log(cnt)
                    this.$api.getAssetsByGroups(cnt,function (res) {

                        that.listData = JSON.parse(res.data.c)
                        console.log(  that.listData)
                    })
                }



            },
            infoBtn(info){
                this.$router.push({
                    path:'/listInfo',
                    name:'listInfo',
                    params:{
                        info:info
                    }
                })
            },
            delBtn(info){

                Dialog.confirm({
                    title: '删除资产',
                    message: '确认删除该资产表格'
                }).then(() => {
                    let cnt = {
                        assetId: info.id,
                    }
                    let that = this
                    this.$api.delAsset(cnt,function (res) {
                       if(res.data.rc == that.$util.RC.SUCCESS){
                           Toast.success({
                               duration:500,
                               message:'删除成功'
                           })
                       }else{
                           Toast.fail({
                               duration:500,
                               message:'删除失败'
                           })
                       }
                       that.$router.push('/page')
                    })
                }).catch(() => {
                    // on cancel
                })
            }
        },
        mounted(){
            let that = this
            let orgId = JSON.parse(localStorage.getItem('user')).orgId
            let cnt = {
                orgId:orgId,
                count:this.count,
                offset:this.offset
            }

            this.$api.queryAssets(cnt,function (res) {
                that.listData = JSON.parse(res.data.c)
            })

            //请求机构内 第一层的组织分组
            let cnt1 = {
                orgId:orgId,
                groupId:100
            }
            this.$api.getTagGroupTree(cnt1,function (res) {
                that.groups = JSON.parse(res.data.c)

                let obj={
                    keyword: "全部"
                }
                that.groups.unshift(obj)
            })




            if( JSON.parse(localStorage.getItem('user')).realName == 'root'){
                    this.root = true
            }else{
                this.root = false
            }


        }
    }
</script>

<style scoped lang="scss">
    .create-btn{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: rgb(125,177,253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .item-btn-box{
        float: right;
        height: 5rem;
    }
    .item-info-box{
        margin-right: 9rem;
        width: auto;
        height: 5rem;
    }
    .item-info-name{
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .item-info-address{
        width: 100%;
        height: 2rem;
        font-size: 1.2rem;
        color: #666;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .tab-box-style{
        padding-top:5rem;
    }
    .text-title-icon{
        float: right;
        width: 4rem;
        height: 4rem;
    }
    .text-title-icon i{
        display: block;
        width: 4rem;
        height: 4rem;
        text-align: right;
        line-height:5rem;
        font-size: 3rem;
        color: #f4516c;

    }
    .text-title-text{
        width: auto;
        margin-right: 4rem;
        height: 4rem;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #666;
        font-weight: 600;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .text-info{
        line-height: 3rem;
        font-size: 1.6rem;
        color: #666;
        padding: 0 1rem;
    }
    .main-box{
        background: #fff;
    }
    .box{
        width: 88%;
        height: 5rem;
        margin: 0 auto;
        margin-top: 1rem;
        border-radius: 5px;
        padding: 0 1rem;
        background: #fff;
        border-bottom: 1px solid #ededed;
    }
    .box-img{
        float: left;
        margin-left: 1rem;
        width: 8rem;
        height: 8rem;

    }
    .box-text{
        width: auto;
        height: 8rem;
        border-bottom: 1px solid #ddd;

    }
    .img-title{
        width: 6rem;
        height:6rem;
        margin-top: 1rem;
        margin-left: 1rem;
    }
    .img-title i{
        font-size: 6rem;
        text-align: center;
        line-height: 6rem;
        color: #40c9c6;
    }

    .text-title{
        width:auto;
        height: 4rem;
        padding-right: 1rem;
    }
    .text{
        width: auto;
        height: 2rem;
        text-align: left;
        padding-right: 1rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;

    }
    .btn{
        width: 100%;
        height: 4rem;
        margin-top: 2rem;
        line-height: 4rem;
        text-align: center;
    }
    .btn-box{
        float: right;
        display: block;
        padding: 0 1rem;
        height: 5rem;
        text-align: center;
        line-height: 5rem;
        color: #40c9c6;
        font-size: 1.4rem;

    }
    .info-btn{
        margin-top: 1.2rem;
        padding: .5rem;
        background: #4b0;
        color: #fff;
        font-size: 1.2rem;
        text-align: center;
        border-radius: 5px;
    }
    .btn-del{
        float: right;
        padding: 0 1rem;
        height: 5rem;
    }
    .btn-del i{
        display: block;
        height: 5rem;
        text-align: center;
        line-height: 5rem;
        color: #f44;
        font-size: 2.5rem;
    }
</style>
