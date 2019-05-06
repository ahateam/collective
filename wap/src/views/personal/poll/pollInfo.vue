<template>
    <div>
        <header-box title="投票详情"></header-box>
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

                            <span style="color:#40c9c6" v-if="status == '-1'">表决未完成</span>
                            <span v-if="status =='0'" style="color: #909399">表决失效</span>
                            <span v-if="status =='1'" style="color: #67C23A">表决成功</span>
                            <span v-if="status =='2'" style="color: #F56C6C">表决失败</span>


                        </div>
                        <div class="vote-item-title-box">
                            {{info.title}}
                        </div>
                    </div>

                </div>
            </div>
            <div class="info-time">
                最多可以选投: {{activeNums}} 个选项
            </div>
            <div class="info-xuanju" >
                应到总人数：{{quorum}} 人，已参投有效人数：{{ticketCount}} 人，已投票数：{{opsNum}}票，其中弃权人数：{{waiver}} 人，未参投人数：{{quorum-ticketCount}} 人
            </div>
            <div class="info-text">
                <p style="padding: 0 15px">
                    {{info.remark}}
                </p>
            </div>
            <div class="info-btn">
                <div class="item-box">
                    <div v-for="(item,index) in voteOption" :key="index">
                        <div v-for="(item1,index1) in optionActive" :key="index1">
                            <van-button
                                    v-if="index1==index&&item1 == false"
                                    plain
                                    type="primary"
                                    :disabled="voteShow==true"
                                    @click="voteBtn(item,item1,index1)"
                                    style="  float: left;margin-left: 25px;margin-top: 10px"
                            >
                                {{item.title}}
                            </van-button>
                            <van-button
                                    v-if="index1==index&&item1 == true"
                                    type="primary"
                                    :disabled="voteShow==true"
                                    @click="voteBtn(item,item1,index1)"
                                    style="  float: left;margin-left: 25px;margin-top: 10px"
                            >
                                {{item.title}}
                            </van-button>
                        </div>
                    </div>
                </div>

            </div>


            <div class="submitBtn">
                <van-button type="primary"
                            :disabled="voteShow==true"
                            @click="submitBtn"
                            v-if="info.status == '0' && subBtnShow == true"
                >
                    提交投票
                </van-button>

                <van-button type="primary"
                            @click="infoBtn"
                            v-if="subBtnShow == false"
                            style="margin-top: 2rem;margin-left: 2rem"
                >
                    查看详细结果
                </van-button>

                <van-button type="warning" style="margin-left: 2rem;margin-top: 2rem" @click="resModalBtn">
                    报告单
                </van-button>

                <van-button type="default" style="margin-left: 2rem;margin-top: 2rem" @click="returnBtn">返回列表</van-button>


                <van-popup v-model="resShow">

                    <div class="modal-box">
                        <div class="modal-nav">
                            <div class="modal-status">
                                通 过
                            </div>
                            <div class="modal-text">
                                该项议程投票结果为：已经通过
                            </div>

                        </div>
                        <div class="modal-content">
                            <div class="content-text">
                                <div class="text">
                                    参与本次议程的应到总人数：{{quorum}}
                                </div>
                                <div class="text">
                                    经网络表决：{{info.title}}
                                </div>
                                <div class="text">
                                    议程投票：<span style="color: #1989fa;">已通过</span> (已有选项票数超过通过比例)
                                </div>
                                <div class="text1" >
                                    选举的结果为：
                                    <span v-for="(item,index) in successData"> <span>{{item}}</span> ; </span>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer" @click="resShow =false">
                            确 定
                        </div>
                    </div>

                </van-popup>
                <van-popup v-model="errorShow">

                    <div class="modal-box">
                        <div class="modal-nav1">
                            <div class="modal-status">
                                失 效
                            </div>
                            <div class="modal-text">
                                该项议程投票结果为：失效
                            </div>

                        </div>
                        <div class="modal-content">
                            <div class="content-text">
                                <div class="text">
                                    参与本次议程的应到总人数：{{quorum}}
                                </div>
                                <div class="text">
                                    经网络表决：{{info.title}}
                                </div>
                                <div class="text">
                                    弃权人数：{{waiver}}
                                </div>
                                <div class="text">
                                    议程投票：<span style="color: #f44;">已失效</span>(弃权人数超过失效比例)
                                </div>
                                <div class="text1" >
                                    提示：此表决已作废，请重新创建议程，进行投票表决
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer" @click="errorShow =false">
                            确 定
                        </div>
                    </div>
                </van-popup>

                <van-popup v-model="failShow">
                    <div class="modal-box">
                        <div class="modal-nav2">
                            <div class="modal-status">
                                失 败
                            </div>
                            <div class="modal-text">
                                该项议程投票结果为：已经失败
                            </div>

                        </div>
                        <div class="modal-content">
                            <div class="content-text">
                                <div class="text">
                                    参与本次议程的应到总人数：{{quorum}}
                                </div>
                                <div class="text">
                                    经网络表决：{{info.title}}
                                </div>
                                <div class="text">
                                    议程投票：<span style="color: #f60;">已失败</span> (所有人参投,并未达到设置的通过或失效比例)
                                </div>
                                <div class="text1" >
                                    提示：所有人已经参投，结果未达到成功或失效的比例，请重新创建表决
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer" @click="failShow =false">
                            确 定
                        </div>
                    </div>

                </van-popup>
            </div>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import {Toast} from 'vant';
    import { Dialog } from 'vant';

    export default {
        name: "pollInfo",
        data() {
            return {
                quorum:0,   //应到人数
                opsNum:0,   //已投票数
                waiver:0,   //弃权人数
                ticketCount:0,  //已投人数
                //投票
                info: '',
                voteOption: [],
                option: [],
                optionActive: [],
                // //验证是否已经投票
                voteShow: false,
                active: [],
                activeNums: 0,   //最大可选项数
                subBtnShow: true,    //投票按钮的显示隐藏
                template:1,

                resShow:false,
                errorShow:false,
                failShow:false,
                voteDetail:[],
                successData:[],
                status: -1,   //投票状态   -1：表决未完成  0：表决失效  1：表决成功  2:表决失败
            }
        },
        components: {
            HeaderBox
        },
        methods: {
            //计算投票状态
            getStatus(){
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
                            this.status = -1             //等待投票
                        }
                    }
                }
            },

            resModalBtn(){
                this.getStatus()
                console.log(this.status)
                if(this.status == -1){
                    Dialog.alert({
                        title: '报告单提示',
                        message: '暂无报告单，请投票完成之后查看'
                    }).then(() => {
                        // on close
                    });
                }else if(this.status == 0){
                    this.errorShow = true
                }else if(this.status == 1){
                    this.resShow = true
                }else {
                    this.failShow = true
                }

            },
            returnBtn() {
                this.$router.push('/poll')
            },
            infoBtn(){

                this.$router.push({
                    path:'/pollElectionRes',
                    name:'pollElectionRes',
                    params:{
                        info:this.info
                    }
                })

            },


            voteBtn(item, item1, index1) {
                if (item.title == '弃权') {     //单击弃权按钮
                    for (let i = 0; i < this.optionActive.length; i++) {
                        this.$set(this.optionActive, i, false)
                    }
                    if (item1 == false) {
                        this.$set(this.optionActive, index1, true)
                        this.activeNums = 1
                    } else {
                        this.$set(this.optionActive, index1, false)
                        this.activeNums = this.info.choiceCount
                    }
                } else {              //非弃权按钮
                    let count = 0
                    for (let i = 0; i < this.optionActive.length; i++) {
                        if (this.optionActive[i] == true) {
                            count = count + 1
                        }
                    }
                    if (item1 == false) {
                        if (count == this.activeNums) {
                            Toast.fail({
                                duration: 300,
                                message: '选项数量不能超出限制'
                            })
                        } else {
                            this.$set(this.optionActive, index1, true)
                        }
                    } else {
                        this.$set(this.optionActive, index1, false)
                    }
                }
                console.log(this.optionActive)
            },

            //投票按钮
            submitBtn() {
                let options = []        //获取页面的selections数据
                for (let i = 0; i < this.optionActive.length; i++) {
                    if (this.optionActive[i] == true) {
                        options.push(this.voteOption[i].id)
                    }
                }
                let user = JSON.parse(localStorage.getItem('user'))
                let vote = JSON.parse(localStorage.getItem('vote'))
                console.log(user)
                let cnt = {
                    orgId: user.orgId,
                    voteId: vote.voteInfo.id,
                    userId: user.id,
                    selections: JSON.stringify(options),
                    ballotCount: user.weight,
                    remark: '无'
                }
                this.$api.vote(cnt,  (res)=> {
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        Toast.success({
                            duration:200,
                            message:'投票成功'
                        })
                        this.$router.push('/poll')
                    }else{
                        Toast.fail({
                            duration:200,
                            message:'投票失败 ,'+res.data.c
                        })
                    }
                })
            },
        },
        created(){
            this.info =  JSON.parse(localStorage.getItem('vote')).voteInfo
            if(this.info == '' || this.info == undefined){
                this.$router.push('/poll')
            }
        },
        mounted() {

            this.info = JSON.parse(localStorage.getItem('vote')).voteInfo
            console.log(this.info)


            this.activeNums = this.info.choiceCount
            this.template = this.info.template
            let data = JSON.parse(localStorage.getItem('vote'))
            let obj = {
                voteId: this.info.id
            }

            Object.assign(data, obj)
            localStorage.setItem('vote', JSON.stringify(data))

            let cnt = {
                voteId: this.info.id,
            };


            //计算投票信息
            this.$api.getVoteDetail(cnt, (res)=> {
                if(res.data.rc == this.$util.RC.SUCCESS){
                    let info = JSON.parse(res.data.c)
                    this.voteDetail = info
                    this.ticketCount = info.ticketCount
                    this.quorum = info.vote.quorum
                    for(let i=0;i<info.ops.length;i++){
                        if(info.ops[i].title == '弃权'){
                            this.waiver  =   this.waiver +info.ops[i].ballotCount
                        }
                        this.opsNum = this.opsNum+info.ops[i].ballotCount
                    }
                }
            })
            this.$api.getVoteOptions(cnt,  (res)=> {

                this.voteOption = this.$util.tryParseJson(res.data.c)
                let voteOptionArr = this.voteOption
                //判断用户选择过哪些选项
                let cnt1 = {
                    voteId: this.info.id,
                    userId: JSON.parse(localStorage.getItem('user')).id
                }

                this.$api.getVoteTicket( cnt1,  (res1)=> {
                    if (res1.data.rc == this.$util.RC.SUCCESS) {
                        if (JSON.parse(res1.data.c) == null) {        //未投票的
                            this.voteShow = false
                            this.subBtnShow = true                 //显示投票按钮
                            for (let i = 0; i < this.voteOption.length + 1; i++) {
                                this.optionActive.push(false)
                            }
                        } else {                  //已经投过票的
                            for (let i = 0; i < this.voteOption.length + 1; i++) { //默认未投票展示
                                this.optionActive.push(false)
                            }
                            this.voteShow = true
                            this.subBtnShow = false                //隐藏投票按钮
                            let selection = JSON.parse(JSON.parse(res1.data.c).selection)
                            if (selection.length == 0) {      //投弃权票的展示
                                console.log('弃权')
                            } else {                      //投票选项
                                for (let i = 0; i < selection.length; i++) {        //投有效票的展示
                                    for (let j = 0; j < voteOptionArr.length; j++) {
                                        if (selection[i] == voteOptionArr[j].id) {
                                            this.optionActive[j] = true
                                        }
                                    }
                                }


                            }
                        }
                    }

                    this.getStatus()
                })

            })
        },

    }
</script>

<style scoped lang="scss">
    .modal-footer{
        width: 25rem;
        height: 4rem;
        text-align: center;
        font-size: 1.6rem;
        line-height: 4rem;
        color: #1989fa;
        cursor: pointer;
    }
    .modal-footer:active{
        background: #ddd;
    }
    .text1{
        width: auto;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        margin-top: .5rem;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:3;
    }
    .text{
        width: auto;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        margin-top: .5rem;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .modal-content{
        width: 23rem;
        height: 15rem;
        text-align: left;
        padding: 1rem;

    }
    .modal-text{
        width: 100%;
        height: 4rem;
        color: #fff;
        font-size: 1.6rem;
        line-height: 2rem;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .modal-status{
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        color: #fff;
        text-align: center;
        font-size: 2.4rem;
        font-weight: 600;
    }
    .modal-nav{
        width: 25rem;
        height: 9rem;
        background:url("../../../assets/image/bgbanner.jpg");
    }
    .modal-nav1{
        width: 25rem;
        height: 9rem;
        background:url("../../../assets/image/bg1.jpg");
    }
    .modal-nav2{
        width: 25rem;
        height: 9rem;
        background:url("../../../assets/image/bg2.png");
    }
    .van-popup{
        border-radius: 5px;
    }
    .modal-box{
        width: 25rem;
        height: 30rem;
        border-radius: 5px;
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
    .optionBtn {

    }

    .active {
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
