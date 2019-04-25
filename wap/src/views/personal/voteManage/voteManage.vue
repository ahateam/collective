<template>
    <div>
        <header-box title="发起投票"></header-box>
        <div class="main-box">
                <div class="box1" @click="createBtn">
                    +
                </div>
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多投票了"
                    @load="onLoad"
            >
                <div class="box" v-for="(item,index) in list" :key="index" >
                    <div class="item-icon" @click="infoBtn(item)" v-if="item.template == 0">
                        <van-icon style="color: #40c9c6;" name="send-gift" />
                    </div>
                    <div class="item-icon" @click="infoBtn(item)" v-if="item.template == 1">
                        <van-icon style="color: #ff6397;" name="send-gift" />
                    </div>
                    <div class="item-text" >
                        <div class="item-title" @click="infoBtn(item)">
                            {{item.title}}
                        </div>

                        <div class="item-content">
                            <div class="status-btn">
                                <div class="del" @click="meetDel(item.id)" style="text-align: right">
                                    <i class="iconfont icon-19icon"></i>
                                </div>
                            </div>
                            <div class="btn-box" @click="infoBtn(item)">
                                {{new Date(item.expiryTime).toLocaleDateString()}}
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>

            <router-link to="/home">
                <div class="create-btn"> 返回首页 </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant';
    export default {
        name: "voteManage",
        data() {
            return {
                list:[],
                offset:0,
                count:10,
                loading: false,
                finished: false
            }
        },
        components: {
            HeaderBox
        },
        methods:{
            getVotes(cnt){
                this.$api.getVotes(cnt,(res)=>{
                    let arr = []
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        arr= this.$util.tryParseJson(res.data.c)
                    }else{
                        arr = []
                    }
                    this.list = this.list.concat(arr)
                    if(arr.length <this.count){
                        this.finished = true
                    }
                })
            },
            //跳转
            createBtn(){
              this.$router.push('/createVoteChoose')
            },

            //分页
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    if(this.finished == false){
                        this.page = this.page+1
                        let cnt={
                            offset:(this.page-1)*this.count,
                            count:this.count,
                            orgId: JSON.parse(localStorage.getItem('user')).orgId,
                        }
                        this.getVotes(cnt)
                        // 加载状态结束
                        this.loading = false
                    }else{
                        this.loading = false
                    }
                }, 300);
            },

            infoBtn(info){
                //正在进行的会议详细
                localStorage.setItem('meet',JSON.stringify(info))
                this.$router.push('/meetVoteAdd')
            },
            meetDel(id){
                let that = this
                let cnt = {
                    projectId: id,
                }
                this.$util.call('/vote/delVoteProject',cnt,function (res) {
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        Toast.success({
                            duration:1000,
                            message:'删除成功'
                        });
                        that.$router.push('/page')
                    }
                })
            }
        },
        mounted() {


            let orgId = JSON.parse(localStorage.getItem('user')).orgId
            let cnt = {
                orgId:orgId,
                count: this.count,
                offset:this.offset,
            }
            this.getVotes(cnt)

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
    .main-box {
        background: rgb(240, 242, 245);
    }

    .box1 {

        width: 88%;
        height: 6rem;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
        border: 1px dashed #f4516c;
        font-size: 6rem;
        color: #666;
        line-height: 5rem;
        text-align: center;
    }

    .box {
        width: 88%;
        height: 8rem;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
    }

    .item-icon {
        float: left;
        width: 8rem;
        height: 8rem;
    }

    .item-icon i {
        width: 8rem;
        height: 8rem;
        font-size: 5rem;
        line-height: 8rem;
        text-align: center;
        color: rgb(54, 163, 247);
    }

    .item-text {
        width: auto;
        height: 8rem;
        margin-left: 8rem;
    }

    .item-title {
        width: auto;
        height: 4rem;
        padding-top: .5rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .item-content {
        width: auto;
        height: 3rem;
        margin-top: .5rem;
    }

    .status-btn {
        float: left;
        width: 50%;
        height: 3rem;

    }

    .btn-box {
        float: left;
        width: 50%;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
    }

    .stared {
        float: right;
        width: 5rem;
        height: 2rem;
        padding: 0 .5rem;
        line-height: 2rem;
        margin-top: .4rem;
        text-align: center;
        border: 1px solid #36a3f7;
        color: #36a3f7;
        border-radius: 3px;
    }

    .btn {
        float: right;
        margin-right: 1rem;
        width: 5rem;
        height: 2.2rem;
        padding: 0 .5rem;
        line-height: 2.2rem;
        margin-top: .4rem;
        text-align: center;
        background: #36a3f7;
        color: #fff;
        border-radius: 3px;
    }
    .del{
        float: right;
    }
    .del i{
        display: block;
        font-size: 2rem;
        line-height: 3rem;
        width: 3rem;
        text-align: center;
        color: rgb(244, 81, 108);
    }

</style>
