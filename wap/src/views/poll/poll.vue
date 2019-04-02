<template>
    <div>
        <header-box title="我的投票"></header-box>
        <div class="main-box">
            <van-tabs  swipeable>
                <van-tab title="我的投票">
                    <div v-if="voteList.length>0">
                        <div v-for="(item,index) in voteList" :key="index">
                            <div class="vote-item-box">
                                <div class="vote-item-title">
                                    <div class="vote-item-note">
                            <span v-if="item.template == '1'">
                                 <i class="iconfont icon-paimingbiaoqian"></i>
                            </span>
                                        <span v-if="item.template == '0'">
                                 <i class="iconfont icon-paimingbiaoqian" style="color: #40c9c6;"></i>
                            </span>
                                    </div>
                                    <div class="vote-item-text">
                                        <div class="vote-item-status">
                                            <span v-if="item.status == '0'">正在投票</span>
                                            <span v-if="item.status == '1'">等待投票</span>
                                            <span v-if="item.status == '2' || item.status == '4'">投票作废</span>
                                            <span v-if="item.status == '3'">投票结束</span>
                                        </div>
                                        <div class="vote-item-title-box">
                                            {{item.title}}
                                        </div>
                                    </div>

                                </div>
                                <div class="vote-item-content">
                                    <div class="vote-item-btn" @click="voteBtn(item)" v-if="item.status == '0' " >
                            <span >
                                  <van-tag type="primary">立即投票</van-tag>
                            </span>
                                    </div>
                                    <div class="vote-item-btn" @click="voteInfoBtn(item)" v-if="item.status == '1' ">
                            <span >
                                  <van-tag type="primary">查看详情</van-tag>
                            </span>
                                    </div>
                                    <div class="vote-item-btn" @click="voteBtn(item)" v-if="item.status != '0'  && item.status != '1'" >
                            <span >
                                  <van-tag type="primary">查看结果</van-tag>
                            </span>
                                    </div>
                                    <div class="vote-item-info" >
                                        {{item.remark}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </van-tab>
                <van-tab title="已参与">
                    <div v-if="voteList.length>0">
                        <div v-for="(item,index) in voteList" :key="index">
                            <div class="vote-item-box">
                                <div class="vote-item-title">
                                    <div class="vote-item-note">
                            <span v-if="item.template == '1'">
                                 <i class="iconfont icon-paimingbiaoqian"></i>
                            </span>
                                        <span v-if="item.template == '0'">
                                 <i class="iconfont icon-paimingbiaoqian" style="color: #40c9c6;"></i>
                            </span>
                                    </div>
                                    <div class="vote-item-text">
                                        <div class="vote-item-status">
                                            <span v-if="item.status == '2' || item.status == '4'">投票作废</span>
                                            <span v-else>投票结束</span>
                                        </div>
                                        <div class="vote-item-title-box">
                                            {{item.title}}
                                        </div>
                                    </div>

                                </div>
                                <div class="vote-item-content">


                                    <div class="vote-item-btn" @click="voteBtn(item)" >
                            <span >
                                  <van-tag type="primary">查看结果</van-tag>
                            </span>
                                    </div>
                                    <div class="vote-item-info" >
                                        {{item.remark}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
            <div class="create-btn" @click="returnBtn">返回首页</div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'

    export default {
        name: "poll",
        data() {
            return {
                voteList:[],
                count:10,
                offset:0
            }
        },
        components: {
            HeaderBox
        },
        methods: {
            returnBtn(){
                this.$router.push('/home')
            },
            voteBtn(item) {

                let vote = {
                    voteInfo:item
                }
                localStorage.setItem('vote',JSON.stringify(vote))
                this.$router.push('/pollInfo')
            },

            voteInfoBtn(item){
                let vote = {
                    voteInfo:item
                }
                localStorage.setItem('vote',JSON.stringify(vote))
                this.$router.push('/pollInfo')
            },
        },
        mounted() {
            let that = this
            console.log(JSON.parse(localStorage.getItem('user')))
            let cnt = {
                orgId: JSON.parse(localStorage.getItem('user')).orgId,
                count: this.count,
                offset: this.offset,
            }
            this.$api.getVotes(cnt,function (res) {
                if(res.data.rc == that.$util.RC.SUCCESS){
                    that.voteList = JSON.parse(res.data.c)
                    console.log(that.voteList)
                }


            })


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
        background: #fff;

    }
    .list-box{
        width: 85%;
        margin: 0 auto;
        background: #fff;
        margin-top: .5rem;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 5px 5px #ddd;
    }
    .list-title{
        width: auto;
        line-height: 2rem;
        font-size: 1.6rem;
        color: #444;
        letter-spacing:1.5px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;

    }
    .list-content{
        width: auto;
        margin-top:.5rem;
        color: #666;
        font-size: 1.2rem;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;

    }
    .vote-item-box{
        width: 90%;
        margin: 0 auto;
        height: 7rem;
        margin-top: 1rem;
        border-radius: 5px;
        padding: 0 .5rem;
        box-shadow: 0 0 20px #ccc;
    }
    .vote-item-title {
        width: 100%;
        height: 3rem;
        border-bottom: 1px solid #ddd;
    }

    .vote-item-content {
        width: auto;
        height: 4rem;
    }
    .vote-item-note {
        float: left;
        width: 3rem;
        height: 3rem;
    }

    .vote-item-text {
        width: auto;
        height: 3rem;
        margin-left: 3rem;
        text-align: left;
        font-size: 1.4rem;
        color: #333;
        line-height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }
    .vote-item-note i {
        width: 3rem;
        height: 3rem;
        display: block;
        color: #ff6397;
        font-size: 2.7rem;
        text-align: center;
    }
    .vote-item-title-box{
        width: auto;
        height: 3rem;
        margin-right: 6rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
    .vote-item-status{
        float: right;
        width: 5rem;
        height: 3rem;
        font-size: 1.2rem;
        color: #666;
        text-align: center;
    }
    .vote-item-info{
        width: auto;
        height: 4rem;
        margin-right:6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666;
        font-size: 1.4rem;
        line-height:4rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
    .vote-item-btn{
        float: right;
        width: 5rem;
        height: 4rem;
        font-size: 1.2rem;
        color: #666;
        text-align: center;
        line-height: 4rem;

    }

    .info-title {
        margin: 1rem auto;
        padding-bottom: .5rem;
        width: 96%;
        font-size: 1.6rem;
        color: #333;
        line-height: 3rem;
        border-bottom: 1px solid #ddd;

    }

    .info-text {
        width: 96%;
        margin: 0 auto;
        font-size: 1.6rem;
        color: #666;
    }

    .info-btn {
        margin-top: 2rem;
        width: 100%;
        height: auto;
        overflow: hidden;
    }

    .item-btn {
        float: left;
        width: 20%;
        margin-left: 10%;
    }

    .info-time {
        width: 96%;
        margin: 0 auto;
        height: 2rem;
        font-size: 1.2rem;
        color: #666;

    }

    .item {
        width: auto;
        padding: 0 15px;
        height: 4rem;
    }

    .option-title {
        float: left;
        width: 8rem;
        height: 4rem;
        font-size: 1.6rem;
        line-height: 4rem;
        color: #333;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .option-vote {
        width: auto;
        margin-left: 8rem;
        height: 4rem;
    }

    .option-box {
        float: left;
        width: 33%;
        height: 4rem;
        cursor: pointer;
        position: relative;

    }

    .option-btn {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -15px;
        text-align: center;
    }

    .submitBtn {
        width: 96%;
        margin-top: 20px;
        text-align: center;

    }

    .item-box {
        width: auto;
        padding: 0px 15px;
    }
    .vote-title{
        width: 100%;
        height: 3rem;
        border-left: 4px solid #63a35c;
        padding-left: 1rem;
        font-size: 1.4rem;
        color: #666;
        font-weight: 600;
        line-height: 3rem;
    }
    .vote-item{
        width: 80%;
        margin:1rem auto;
        height: 4rem;
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 0px 15px;
        margin-top: 2rem;
    }
    .item-title{
        float: left;
        width: 80%;
        height: 4rem;
        line-height: 4rem;
        padding-left: 1rem;
        font-size: 1.4rem;
        color: #444;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .vote-btn{
        float: left;
        width: auto;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
    }

</style>
