<template>
    <div>
        <header-box title="我的投票"></header-box>
        <div class="main-box">
            <van-tabs  swipeable @change="changeTab">
                <van-tab title="等待参与">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多等待参与的投票了"
                            @load="onLoad(0)"
                    >
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
                    </van-list>
                </van-tab>

                <van-tab title="已参与">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多的已经参与的投票了"
                            @load="onLoad(1)"
                    >
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
                    </van-list>
                </van-tab>
                <van-tab title="全部投票">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多的投票了"
                            @load="onLoad(2)"
                    >
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
                    </van-list>
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
                offset:0,
                page:1,
                loading: false,
                finished: false,
            }
        },
        components: {
            HeaderBox
        },
        methods: {
            //ajax请求层
            //请求所有的投票列表
            getVotes(cnt){
                this.$api.getVotes(cnt, (res)=> {
                    let data = []
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        data = this.$util.tryParseJson(res.data.c)
                    }else{
                        data = []
                    }
                    this.voteList = this.voteList.concat(data)
                    console.log(this.voteList)
                    if(data.length <this.count){
                        this.finished = true
                    }
                })
            },
            //请求未投票的列表
            getNotVoteByUserRoles(cnt){
                this.$api.getNotVoteByUserRoles(cnt,(res)=>{
                    let data = []
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        data = this.$util.tryParseJson(res.data.c)
                    }else{
                        data = []
                    }
                    this.voteList = this.voteList.concat(data)
                    if(data.length <this.count){
                        this.finished = true
                    }
                })
            },
            //请求已投票的列表
            getVoteByUserRoles(cnt){
                this.$api.getVoteByUserRoles(cnt,(res)=>{
                    console.log(JSON.parse(res.data.c))
                    let data = []
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        data = this.$util.tryParseJson(res.data.c)
                    }else{
                        data = []
                    }
                    this.voteList = this.voteList.concat(data)
                    if(data.length <this.count){
                        this.finished = true
                    }
                })
            },

            //普通事件层
            //分页
            onLoad(index) {
                // 异步更新数据
                if(index == 0){
                    setTimeout(() => {
                        if(this.finished == false){
                            this.page = this.page+1
                            let cnt = {
                                orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                                userId: JSON.parse(localStorage.getItem('user')).id, // Long 用户编号
                                roles: JSON.parse(localStorage.getItem('user')).orgRoles, // String 角色
                                count:this.count,
                                offset:(this.page-1)*this.count,
                            }
                            this.getNotVoteByUserRoles(cnt)
                            // 加载状态结束
                            this.loading = false
                        }else{
                            this.loading = false
                        }
                    }, 150)
                }else if (index ==1){
                    setTimeout(() => {
                        if(this.finished == false){
                            this.page = this.page+1
                            let cnt = {
                                orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                                userId: JSON.parse(localStorage.getItem('user')).id, // Long 用户编号
                                roles: JSON.parse(localStorage.getItem('user')).orgRoles, // String 角色
                                count:this.count,
                                offset:(this.page-1)*this.count,
                            }
                            this.getVoteByUserRoles(cnt)
                            // 加载状态结束
                            this.loading = false
                        }else{
                            this.loading = false
                        }
                    }, 150)
                }else if(index == 2){
                    setTimeout(() => {
                        if(this.finished == false){
                            this.page = this.page+1
                            let cnt = {
                                orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                                count: this.count, // Integer
                                offset: (this.page-1)*this.count,
                            }
                            this.getVotes(cnt)
                            // 加载状态结束
                            this.loading = false
                        }else{
                            this.loading = false
                        }
                    }, 150)

                }



            },

            //滑动tab触发
            changeTab(index,title){

                this.page = 1
                this.voteList = []
                this.loading = false
                this.finished = false
                setTimeout(()=>{
                    if(index == 0){
                        let cnt = {
                            orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                            userId: JSON.parse(localStorage.getItem('user')).id, // Long 用户编号
                            roles: JSON.parse(localStorage.getItem('user')).orgRoles, // String 角色
                            count:this.count,
                            offset:this.offset
                        }
                        this.getNotVoteByUserRoles(cnt)
                    }else if(index ==1){
                        let cnt = {
                            orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                            userId: JSON.parse(localStorage.getItem('user')).id, // Long 用户编号
                            roles: JSON.parse(localStorage.getItem('user')).orgRoles, // String 角色
                            count:this.count,
                            offset:this.offset
                        }
                        this.getVoteByUserRoles(cnt)

                    }else if(index == 2){
                        let cnt = {
                            orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                            count: this.count, // Integer
                            offset: this.offset, // Integer
                        }
                        this.getVotes(cnt)
                    }
                },150)



            },
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

            getStatus(){
                this.successData = []
                let ops = this.optionList.ops
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
        },
        mounted() {
            console.log(JSON.parse(localStorage.getItem('user')))
            let cnt = {
                orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                userId: JSON.parse(localStorage.getItem('user')).id, // Long 用户编号
                roles: JSON.parse(localStorage.getItem('user')).orgRoles, // String 角色
                count:this.count,
                offset:this.offset
            }
            this.getNotVoteByUserRoles(cnt)




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
