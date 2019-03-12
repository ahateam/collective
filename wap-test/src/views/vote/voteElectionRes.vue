<template>
    <div>
        <header-box title="表决结果"></header-box>
        <div class="main-box" >
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

                            <span v-if="status == '-1'" style="color:#40c9c6">表决未完成</span>
                            <span v-if="status == '0'" style="color: #909399">表决失效</span>
                            <span v-if="status == '1'" style="color: #67C23A">表决成功</span>
                            <span v-if="status == '2'" style="color: #F56C6C">表决失败</span>
                        </div>
                        <div class="vote-item-title-box">
                            {{info.title}}
                        </div>
                    </div>

                </div>
            </div>
            <div class="info-xuanju">
                应到总人数：{{quorum}} 人，已参投有效人数：{{opsNum}} 人，其中弃权人数：{{waiver}} 人，未参投人数：{{quorum-opsNum}} 人，
                目前投票情况：
                <span style="color:#40c9c6" v-if="status == '-1'">表决未完成</span>
                <span v-if="status =='0'" style="color: #909399">表决失效</span>
                <span v-if="status =='1'" style="color: #67C23A">表决成功</span>
                <span v-if="status =='2'" style="color: #F56C6C">表决失败</span>
            </div>
            <div class="info-text">
                <p style="padding: 0 15px">
                    {{info.remark}}
                </p>
            </div>
            <div class="info-btn">
                <div class="item-box" v-if="optionList.ops != undefined">
                    <div v-for="(item,index) in optionList.ops" :key="index">
                        <span v-if=" parseInt(item.ballotCount) >= parseInt(parseInt(quorum)*parseInt(info.effectiveRatio)/100)+1">
                              <van-panel :title="item.title" :desc="idNumberList[index]" :status="item.ballotCount + ''" style="border: 1px solid #40c9c6">
                              </van-panel>
                        </span>
                        <span v-else>
                            <van-panel :title="item.title" :desc="idNumberList[index]" :status="item.ballotCount + ''" >
                            </van-panel>
                        </span>
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
        name: "voteElectionRes",
        data() {
            return {
                quorum:0,   //应到人数
                opsNum:0,   //已投人数
                waiver:0,   //弃权人数
                idNumberList:[],
                //投票
                info: '',
                optionList :[],
                status: -1,   //投票状态   -1：表决未完成  0：表决失效  1：表决成功  2:表决失败
            }
        },
        mounted() {
            let that =this
            this.info = JSON.parse(localStorage.getItem('vote')).voteInfo
            let cnt = {
                voteId:this.info.id
            }

            this.$util.call('/vote/getVoteDetail',cnt,function (res) {

                that.optionList = JSON.parse(res.data.c)

                that.quorum = that.optionList.vote.quorum

                let opsArr = that.optionList.ops
                //计算弃权数/取出身份证
                for(let i=0;i<opsArr.length;i++){
                    that.opsNum = that.opsNum +opsArr[i].ballotCount
                    if(opsArr[i].title == '弃权'){
                        that.waiver = that.waiver + opsArr[i].ballotCount
                        that.idNumberList.push('')
                    }else{
                        that.idNumberList.push(JSON.parse(opsArr[i].ext).idNumber +'')
                    }
                }

                let  passData = parseInt(that.quorum *(parseInt(that.info.effectiveRatio)/100))+1
                let  failData = parseInt(that.quorum *(parseInt(that.info.failureRatio)/100))+1


                if(that.waiver >= failData){        //无效
                    that.status = 0
                }else{
                    let   successType = 0  //默认是不成功

                    for(let i=0;i<opsArr.length;i++){
                        if(opsArr[i].ballotCount >= passData) {
                            successType = 1         //成功的中间变量
                        }
                    }
                    if(successType == 1){
                        for(let i=0;i<opsArr.length;i++){
                            if(opsArr[i].ballotCount >= passData){
                                that.status = 1                 //通过
                            }
                        }
                    }else{
                        if(that.opsNum ==that.quorum){     //人到齐了
                            that.status = 2             //失败
                        }else{
                            that.status = -1            //等待投票
                        }
                    }
                }
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
