<template>
    <div>
        <header-box title="我的表决"></header-box>
        <div class="main-box">
            <span  v-if="voteList.started.length >0">
                <div class="box">
                    <div class="vote-title">
                <div class="title-text">
                    正在表决
                </div>
            </div>
                    <div class="vote-item" @click="voteBtn(item)" v-for="(item,key) in voteList.started" :key="key">

                <div class="item-box">
                 {{item.title}}
                </div>
                <div class="item-time">
                  截至: {{new Date(item.expiryTime).toLocaleDateString()}}
                </div>
            </div>
                </div>
            </span>
            <span v-if="voteList.waiting.length >0">
                <div class="box">
                    <div class="vote-title2" >
                <div class="title-text2">
                    即将开始
                </div>
            </div>
                    <div class="vote-item" @click="voteWaitBtn(item,0)" v-for="(item,key) in voteList.waiting" :key="key">

                <div class="item-box">
                    {{item.title}}
                </div>
                <div class="item-time">
                    开始: {{new Date(item.startTime).toLocaleDateString()}}
                </div>
            </div>
                </div>
            </span>
            <span v-if="voteList.fininshed.length >0">
                <div class="box">
                    <div class="vote-title1">
                <div class="title-text1" >
                    表决完成
                </div>
            </div>
                    <div class="vote-item1"  @click="voteWaitBtn(item,'1')" v-for="(item,key) in voteList.fininshed" :key="key">

                <div class="item-box1">
                    {{item.title}}
                </div>
                <div class="item-time1">
                    截至: {{new Date(item.expiryTime).toLocaleDateString()}}
                </div>
                <div class="item-info">
                    {{item.remark}}
                </div>
                <div class="item-res">
                    <span style="color: rgb(244, 81, 108);">已结束</span>
                </div>
            </div>
                </div>
            </span>


        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "vote",
        data(){
            return{

                voteList:{
                    started:[],
                    waiting:[],
                    fininshed:[]
                }

            }
        },
        components:{
            HeaderBox
        },
        methods:{
            voteWaitBtn(info,index){
                this.$router.push({
                    path:'/voteWait',
                    name:'voteWait',
                    params:{
                        info:info,
                        key:index
                    }
                })
            },
            voteBtn(info){
                this.$router.push({
                    path:'/voteInfo',
                    name:'voteInfo',
                    params:{
                        info:info
                    }
                })
            }
        },
        mounted(){
            let that = this
            this.userInfo = JSON.parse(localStorage.getItem('user'))
            let orgId = this.userInfo.orgId
            let cnt = {
                orgId: orgId,
                count: 100,
                offset: 0,
            };
            this.$util.call('/vote/getVotes',cnt,function (res) {
                that.voteList = JSON.parse(res.data.c)
            })
        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: rgb(240, 242, 245);
    }
    .vote-title{
        width: 96%;
        margin: 0 auto;
        height: 3rem;
        line-height: 3rem;
        border-left: .3rem solid #40c9c6;
    }
    .vote-title1{
        width: 96%;
        margin: 0 auto;
        height: 3rem;
        line-height: 3rem;
        border-left: .3rem solid rgb(244, 81, 108);
    }
    .vote-title2{
        width: 96%;
        margin: 0 auto;
        height: 3rem;
        line-height: 3rem;
        border-left: .3rem solid rgb(54, 163, 247);
    }
    .title-text2{
        width: 100%;
        height: 3rem;
        margin-left: 1rem;
        font-size: 1.4rem;
        color: rgb(54, 163, 247);
        line-height: 3rem;
        font-weight: 600;
    }
    .title-text1{
        width: 100%;
        height: 3rem;
        margin-left: 1rem;
        font-size: 1.4rem;
        color: rgb(244, 81, 108);
        line-height: 3rem;
        font-weight: 600;
    }
    .title-text{
        width: 100%;
        height: 3rem;
        margin-left: 1rem;
        font-size: 1.4rem;
        color: #40c9c6;
        line-height: 3rem;
        font-weight: 600;
    }
    .vote-item{
        width: 96%;
        margin: 1rem auto;
        height: 3rem;
        border-bottom: 1px solid #ddd;
    }
    .vote-item1{
        width: 96%;
        margin: 1rem auto;
        height: 6rem;
        border-bottom: 1px solid #ddd;
    }
    .item-time1{
        float: left;
        width: 40%;
        height: 2rem;
        font-size: 1.2rem;
        color: #999;
        text-align: center;
    }
    .item-box1{
        float: left;
        width: 60%;
        height: 2rem;
        font-size: 1.4rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #666;
    }
    .item-box{
        float: left;
        width: 60%;
        height: 3rem;
        font-size: 1.4rem;
        line-height: 3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #666;
    }
    .item-time{
        float: left;
        width: 40%;
        height: 3rem;
        font-size: 1.2rem;
        color: #999;
        line-height: 3rem;
        text-align: center;
    }
    .item-info{
        float: left;
        width: 70%;
        height: 3rem;
        font-size: 1.4rem;
        line-height: 3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #666;
    }
    .item-res{
        float: left;
        width: 30%;
        height: 3rem;
        font-size: 1.2rem;
        line-height: 3rem;
        text-align: center;

    }
    .box{
        width: 88%;
        margin:  0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
    }

</style>
