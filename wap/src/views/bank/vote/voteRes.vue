<template>
    <div>
        <bank-head title="结果报告单"></bank-head>
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
                        <div class="vote-item-title-box">
                            {{info.title}}
                        </div>
                    </div>

                </div>
            </div>
            <div class="info-text">
                <p style="padding: 0 15px">
                    {{info.remark}}
                </p>
            </div>
            <div class="info-res">
                <p>
                    本次投票应到总人数：<span class="res-text">{{info.quorum}} 人</span> ；已参投有效人数：<span class="res-text">{{ticketCount}}人</span> ；
                   其中弃权人数： <span class="res-text">{{waiver}}人</span>
                </p>
            </div>
            <div class="info-res" style="margin: 0">
                投票结果：
                <span v-if="status == 1 " >
                    <span style="color: #409eff;">
                        投票通过
                    </span>
                    <p>
                        通过选项：
                        <span v-for="(item,index) in successData" :key="index"> <span style="color: #409eff;margin-left: 10px">{{item}}  </span> ;</span>
                    </p>
                </span>
                <span v-else style="color: #f60">投票未通过</span>
            </div>
        </div>
        <router-link to="/bankHome">
            <div class="create-btn">
                返回首页
            </div>
        </router-link>
    </div>
</template>

<script>
    import BankHead from '@/components/head/bankHead'

    export default {
        name: "voteRes",
        components:{
            BankHead
        },
        data(){
            return{
                voteId:'',
                info:'',
                successData:[],
                voteDetail:'',
                ticketCount:'',
                quorum:'',
                waiver:'',  //弃权票数
                opsNum:'',

                status:'',
            }
        },
        methods:{
            resModalBtn(){
                console.log(this.ticketCount)
                this.successData = []
                let ops = this.voteDetail.ops
                console.log(ops)
                let  passData = parseInt(this.quorum *(parseInt(this.info.effectiveRatio)/100))+1
                let  failData = parseInt(this.quorum *(parseInt(this.info.failureRatio)/100))+1

                if(this.waiver >=failData){     //无效
                    this.status = 0
                }else{                          //有效
                    let   successType = 0  //默认是不成功
                    for(let i=0;i<ops.length;i++){
                        if(ops[i].ballotCount >= passData) {
                            successType = 1         //成功的中间变量
                        }
                    }
                    if(successType == 1){
                        for(let i=0;i<ops.length;i++){
                            if(ops[i].ballotCount >= passData){
                                this.status = 1                 //通过
                                this.successData.push(ops[i].title)
                            }
                        }
                    }else{
                        if(this.ticketCount ==this.quorum){     //人到齐了
                            this.status = 2             //失败
                        }else{
                            this.status = -1            //等待投票
                        }
                    }
                }
                console.log(this.status)


            },
        },
        mounted(){

            if(this.$route.params.info == '' || this.$route.params.info == undefined){
                this.$router.push('bankHome')
            }
            this.info = this.$route.params.info
            let cnt = {
                voteId: this.info.id,
            };

            this.$bank.getVoteDetail(cnt, (res)=> {
                if(res.data.rc == this.$util.RC.SUCCESS){
                    let info = this.$util.tryParseJson(res.data.c)
                    this.voteDetail = info
                    this.ticketCount = info.ticketCount
                    this.quorum = info.vote.quorum

                    for(let i=0;i<info.ops.length;i++){
                        if(info.ops[i].title == '弃权'){
                            this.waiver  =   this.waiver +info.ops[i].ballotCount
                        }
                        this.opsNum = this.opsNum+info.ops[i].ballotCount
                    }
                    this.resModalBtn()
                }
            })
        }

    }
</script>

<style scoped lang="scss">
    .res-text{
        color: #f60;
    }
    .info-res{
        margin-top: 2rem;
        width: auto;
        padding: 1rem;
        line-height: 2rem;
        color: #666;
        font-size: 1.4rem;

    }
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
        height: 4rem;
        margin-left: 3rem;
        text-align: left;
        font-size: 1.6rem;
        color: #666;
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
