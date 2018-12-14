<template>
    <div>
        <header-box title="表决详情"></header-box>
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
            <div class="msg-box"  v-if="key == '1'">
                <div class="item-box" v-for="(item,key)
            in voteOption" :key="key">
            <div class="item-title">
                {{item.title}}
            </div>
            <div class="item-option">

                <div class="item">
                    <van-tag  type="success" size="medium">赞成 {{item.agreeWeight}}</van-tag>
                </div>
                <div class="item">
                    <van-tag   type="danger"  size="medium">反对  {{item.disagreeWeight}}</van-tag>
                </div>
                <div class="item">
                    <van-tag   color="#f2826a" size="medium">弃权  {{item.abstainedWeight}}</van-tag>
                </div>
            </div>
        </div>
    </div>
    <div class="msg-box" v-if="key == '0'">
        <p class="msg">
            请等待该表决投票开始,投票开始时间为：<span style="color: #f44;">{{startTime}}</span>
        </p>
    </div>
    <div class="btn">
        <van-button type="default" @click="returnBtn"> 返回列表</van-button>
    </div>


        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "voteWait",
        components:{
            HeaderBox
        },
        data(){
            return{
                info: '',
                key:'',     // 0表示等待开始的 1：已经结束的表决
                startTime: '',
                expiryTime: '',
                voteOption:[],
                active:'0'
            }
        },
        methods:{
            returnBtn(){
                this.$router.go(-1)
            }
        },
        mounted(){
            let that = this
            this.info = this.$route.params.info
            this.key = this.$route.params.key
            let time = new Date(this.info.startTime)
            let time1 = new Date(this.info.startTime)
            this.startTime = time.toLocaleDateString() + ' ' + time.toLocaleTimeString('chinese', {hour12: false})
            this.expiryTime = time1.toLocaleDateString() + ' ' + time1.toLocaleTimeString('chinese', {hour12: false})

            let cnt = {
                voteId: this.info.id,
            };
            this.$util.call('/vote/getVoteOptions',cnt,function (res) {
                that.voteOption = JSON.parse(res.data.c)
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

    .msg-box{
        width: 96%;
        margin: 0 auto;
        margin-top: 3rem;

    }

    .item-box {
        width: auto;
        height: 4rem;
        margin-top: 1rem;
    }

    .item-title{
        float: left;
        width: 8rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
        color: #333333;
        font-weight: 600;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
    .item-option{
        width:auto;
        margin-left: 8rem;
        height: 4rem;
    }
    .item{
        width: 30%;
        float: left;
        margin-left: 3%;
        line-height: 4rem;
        text-align: center;
    }
    .btn{
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
        text-align: center;

    }
    .msg{
        padding: 15px;
        font-size: 1.4rem;
        color: #666;
        line-height: 2rem;
    }
</style>
