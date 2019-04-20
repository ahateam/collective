<template>
    <div>
        <header-box title="会议详情"></header-box>
        <div class="main-box">
            <div class="info-title">
                {{info.title}}
            </div>
            <div class="info-time">
                {{startTime}} — {{expiryTime}}
            </div>
            <div class="info-text">
                <p style="padding: 0 15px">
                    {{info.remark}}
                </p>
            </div>

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

                <!--<div v-for="(item,index) in voteList" :key="index">-->
                    <!--<div v-if="item.status == 0">-->
                        <!--<div class="vote-item" >-->
                            <!--<div class="item-title">-->
                                <!--{{item.title}}-->
                            <!--</div>-->
                            <!--<div class="vote-btn" @click="voteBtn(item)">-->
                                <!--<van-tag type="primary">投票</van-tag>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-if="item.status == 1">-->
                        <!--<div class="vote-item" >-->
                            <!--<div class="item-title">-->
                                <!--{{item.title}}-->
                            <!--</div>-->
                            <!--<div class="vote-btn" @click="voteBtn(item)">-->
                                <!--<van-tag type="primary">等待开始</van-tag>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-if="item.status == 2">-->
                        <!--<div class="vote-item" >-->
                            <!--<div class="item-title">-->
                                <!--{{item.title}}-->
                            <!--</div>-->
                            <!--<div class="vote-btn" @click="voteBtn(item)">-->
                                <!--<van-tag type="primary">已作废</van-tag>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-if="item.status == 3">-->
                        <!--<div class="vote-item" >-->
                            <!--<div class="item-title">-->
                                <!--{{item.title}}-->
                            <!--</div>-->
                            <!--<div class="vote-btn" @click="voteBtn(item)">-->
                                <!--<van-tag type="primary">已结束</van-tag>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

            </div>

            <div class="submitBtn">
                <!--<van-button type="primary"-->
                            <!--:disabled="voteShow==true"-->
                            <!--@click="submitBtn">-->
                    <!--提交投票-->
                <!--</van-button>-->
            </div>
            <van-button type="default" style="margin-left: 50px" @click="returnBtn">返回会议列表</van-button>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import {Toast} from 'vant';

    export default {
        name: "voteInfo",
        data() {
            return {
                voteList:[],
                info: '',
                startTime: '',
                expiryTime: '',

            }
        },
        mounted() {
            let that = this
            this.info = JSON.parse(localStorage.getItem('vote')).meetInfo
            if(this.info == '' || this.info == undefined){
                Toast.fail({
                    duration:1000,
                    message:'信息失效，重新选择'
                })
                this.$router.push('/voteMeet')
            }else{

                let cnt = {
                    projectId: this.info.id,
                };

                this.$util.call('/vote/getVotes',cnt,function (res) {
                    that.voteList = JSON.parse(res.data.c)
                    console.log('asdasd')
                    console.log( that.voteList)
                })

                console.log(this.info)
                this.startTime = new Date(this.info.startTime).toLocaleDateString() + ' ' + new Date(this.info.startTime).toLocaleTimeString('chinese', {hour12: false})
                this.expiryTime = new Date(this.info.expiryTime).toLocaleDateString() + ' ' + new Date(this.info.expiryTime).toLocaleTimeString('chinese', {hour12: false})
            }


        },
        components: {
            HeaderBox
        },
        methods: {
            voteBtn(item) {

                let vote = {
                    meetInfo:this.info,
                    voteInfo:item
                }
                localStorage.setItem('vote',JSON.stringify(vote))
                this.$router.push('/voteInfo')
            },
            voteInfoBtn(item){
                let vote = {
                    meetInfo:this.info,
                    voteInfo:item
                }
                localStorage.setItem('vote',JSON.stringify(vote))
                this.$router.push('/voteInfo')
            },
            returnBtn() {
                this.$router.push('/voteMeet')
            },
        }
    }
</script>

<style scoped lang="scss">

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
        width: 70%;
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
