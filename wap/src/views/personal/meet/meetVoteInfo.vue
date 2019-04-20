<template>
    <div>
        <header-box title="表决投票"></header-box>
        <div class="main-box" v-if="voteInfo != ''">
            <div class="info-title">
                {{voteInfo.vote.title}}
            </div>
            <div class="info-time">
               最大投票选项数:{{voteInfo.vote.choiceCount}}
            </div>
            <div class="info-text">
                <p style="padding: 0 15px">
                    {{voteInfo.vote.remark}}
                </p>
            </div>
            <div class="info-btn" v-if="voteInfo.ops.length >0">
                <div class="vote-title">
                   投票选项
                </div>
                <div class="vote-item" >
                    <div class="item-title"  v-for="(item1,index1) in voteInfo.ops" :key="index1">
                        {{item1}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    // import { Toast } from 'vant';
    export default {
        name: "meetVoteInfo",
        components:{
            HeaderBox
        },
        data(){
            return{
                voteInfo:''
            }
        },
        methods:{
            voteBtn(){
                alert('asdasd')
            }
        },
        mounted(){
           let voteId  =  JSON.parse(localStorage.getItem('vote')).voteId
           let that = this
           let cnt = {
               voteId:voteId
           }
           console.log(cnt)
           this.$util.call('/vote/getVoteDetail',cnt,function (res) {
                that.voteInfo = JSON.parse(res.data.c)
               console.log(that.voteInfo)
           })

        }
    }
</script>

<style scoped lang="scss">
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
        margin:  0 auto;
        margin-top: 2rem;
        width: 90%;
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
        margin-top: 2rem;
        width: auto;
    }
    .item-title{
        float: left;
        width: 50%;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
        color: #444;
    }
    .vote-btn{
        float: left;
        width: auto;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
    }

</style>
