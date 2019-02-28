<template>
    <div>
        <header-box title="表决详情"></header-box>
        <div class="main-box">
            <div class="info-title">
                <div class="vote-item-title">
                    <div class="vote-item-note">
                            <span v-if="info.template == '1'">
                                 <i class="iconfont icon-paimingbiaoqian"></i>
                            </span>
                        <span v-if="info.template == '0'">
                                 <i class="iconfont icon-paimingbiaoqian" style="color: #40c9c6;"></i>
                            </span>
                    </div>
                    <div class="vote-item-text">
                        <div class="vote-item-status">
                            <span v-if="info.status == '0'">正在投票</span>
                            <span v-if="info.status == '1'">等待投票</span>
                            <span v-if="info.status == '2' || info.status == '4'">投票作废</span>
                            <span v-if="info.status == '3'">投票结束</span>
                        </div>
                        <div class="vote-item-title-box">
                            {{info.title}}
                        </div>
                    </div>

                </div>
            </div>
            <!--<div class="info-xuanju">-->
            <!--应到总人数：{{quorum}} 人，已参投有效人数：{{opsNum}} 人，其中弃权人数：{{waiver}} 人，未参投人数：{{quorum-opsNum}} 人-->
            <!--</div>-->
            <div class="info-text">
                <p style="padding: 0 15px">
                    {{info.remark}}
                </p>
            </div>
            <div class="info-btn">
                <div class="item-box" v-if="optionList.ops != undefined">
                    <div v-for="(item,index) in optionList.ops" :key="index">
                        <van-cell :title="item.title" :value="item.ballotCount" size="large"  />
                    </div>
                </div>

            </div>
            <div class="submitBtn">
                <van-button type="default" style="margin-left: 50px" @click="returnBtn">返回列表</van-button>
            </div>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'


    export default {
        name: "pollRes",
        data() {
            return {
                // quorum:0,   //应到人数
                // opsNum:0,   //已投人数
                // waiver:0,   //弃权人数
                //投票
                info: '',
                optionList :[],
            }
        },
        mounted() {
            let that =this
            this.info = JSON.parse(localStorage.getItem('vote')).voteInfo
            let cnt = {
                voteId:this.info.id
            }
            this.$api.getVoteDetail(cnt,function (res) {
                that.optionList = JSON.parse(res.data.c)
                // console.log(that.optionList)
                // let info = JSON.parse(res.data.c)
                // that.quorum = info.vote.quorum
                // for(let i=0;i<info.ops.length;i++){
                //     if(info.ops[i].title == '弃权'){
                //         that.waiver  =   that.waiver +info.ops[i].ballotCount
                //     }
                //     that.opsNum = that.opsNum+info.ops[i].ballotCount
                // }

            })
        },
        components: {
            HeaderBox
        },
        methods: {
            returnBtn(){
                this.$router.go(-1)
            },

        },
    }
</script>

<style scoped lang="scss">
    .vote-item-title {
        width: 100%;
        height: 3rem;
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
        font-size: 1.4rem;

    }
    .vote-item-status{
        float: right;
        width: 5rem;
        height: 3rem;
        font-size: 1.2rem;
        color: #666;
        text-align: center;
    }
    .info-xuanju{
        width: 90%;
        margin: 0 auto;
        border-radius: 5px;
        margin-top: 1rem;
        box-shadow: 0 0 20px #ccc;
        background: #fff7cc;
        padding: 0 .5rem;
        color: #f56723;
        font-size: 1.4rem;
        line-height: 2rem;
    }
    .van-cell__value{
        color:rgb(244, 81, 108) !important;
        border-bottom: 1px solid #ddd;
    }
    .active{
        background: #40c9c6;
        color: #fff;
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
</style>
