<template>
    <div>
        <header-box title="会议详情"></header-box>
        <div class="main-box">
            <div class="info-title">
              {{meetInfo.title}}
            </div>
            <div class="info-time">
                {{startTime}} — {{expiryTime}}
            </div>
            <div class="info-text">
                <p style="padding: 0 15px">
                    {{meetInfo.remark}}
                </p>
            </div>
            <div class="info-btn">
                    <div class="vote-title">
                        会议议程
                    </div>
                    <div class="vote-item" v-for="(item,index) in vote" :key="index">
                        <div class="item-title">
                            {{item.title}}
                        </div>
                        <div class="vote-btn">
                            <van-tag type="primary">投票</van-tag>
                        </div>
                    </div>
            </div>
            <div class="subBtn" @click="subBtn" >
                新增议程
           </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant';
    export default {
        name: "meetInfo",
        components:{
            HeaderBox
        },
        data(){
            return{
                meetInfo:'',
                vote:[],
                startTime:'',
                expiryTime:''
            }
        },
        methods:{
            subBtn(){
                let obj = {
                    meetId:this.meetInfo.id,
                }
                localStorage.setItem('voteInfo',JSON.stringify(obj))
                this.$router.push('/meetChoose')
            },
            // voteBtn(info){
            //     console.log()
            //     let data = {
            //         meetId:this.meetInfo.id,
            //         voteId:info.id
            //     }
            //     localStorage.setItem('vote',JSON.stringify(data))
            //
            //     this.$router.push('/meetVoteInfo')
            // }
        },
        mounted(){
            let that = this
            this.meetInfo = this.$route.params.info
            console.log(this.meetInfo)
            if(this.meetInfo == '' || this.meetInfo == undefined ){
                Toast.fail({
                    duration:1000,
                    message:'请先选择会议'
                });
                this.$router.push('/meet')
            }else{
                this.startTime =new Date( this.meetInfo.startTime).toLocaleDateString()+ ' '+ new Date( this.meetInfo.startTime).toLocaleTimeString('chinese',{hour12:false})
                this.expiryTime =new Date( this.meetInfo.expiryTime).toLocaleDateString()+ ' '+ new Date( this.meetInfo.expiryTime).toLocaleTimeString('chinese',{hour12:false})
                let cnt  = {
                    projectId:this.meetInfo.id
                }
                this.$util.call('/vote/getVotes',cnt,function (res) {
                    that.vote = JSON.parse(res.data.c)
                })

            }

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
        height: 4rem;
        border: 1px solid #ddd;
        border-radius: 5px;
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
    .subBtn{
            width: 88%;
            margin: 0 auto;
            margin-top: 3rem;
            height: 3rem;
            background: #0086b3;
            color: #fff;
            text-align: center;
            line-height: 3rem;
            font-size: 1.4rem;
    }

</style>
