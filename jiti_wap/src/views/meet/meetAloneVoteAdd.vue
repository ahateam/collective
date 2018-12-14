<template>
    <div>
        <header-box title="新增表决"></header-box>
        <div class="main-box">
            <van-cell-group>
                <van-field
                        v-model="voteTitle"
                        label="表决标题"
                        type="textarea"
                        placeholder="请输入表决名称"
                        autosize
                        rows="1"
                        class="title"
                />

                <van-field
                        v-model="voteText"
                        label="表决内容"
                        type="textarea"
                        placeholder="请输入表决内容信息"
                        rows="1"
                        autosize
                        class="text"
                />
                <van-field
                        v-model="passData"
                        type="text"
                        label="通过比例"
                        placeholder="请选择自动通过的比例"
                        @focus="pass"
                        style="margin-top: 2rem"
                />
                <van-field
                        v-model="failData"
                        type="text"
                        label="失败比例"
                        placeholder="请选择自动失败比例"
                        @focus="fail"
                        style="margin-top: 2rem"
                />


            </van-cell-group>


            <div class="create-btn" @click="btn">下 一 步</div>
            <div class="choose-btn" @click="chooseBtn">返 回 重 选</div>
        </div>

        <van-popup v-model="passShow" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    title="自动通过"
                    :columns="num"
                    @cancel="passCancel"
                    @confirm="passConfirm"
            />
        </van-popup>
        <van-popup v-model="failShow" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    title="自动失败"
                    :columns="num"
                    @cancel="failCancel"
                    @confirm="failConfirm"
            />
        </van-popup>


    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant'
    export default {
        name: "meetAloneVoteAdd",
        components: {
            HeaderBox
        },
        data() {
            return {
                voteTitle: '',
                voteText: '',
                type:0,
                failShow:false,
                failData:'',
                passShow:false,
                passData:'',
                num:['50%','67%','80%','90%','100%']
            }
        },
        methods: {
            chooseBtn(){
                this.$router.push('/meetChoose')
            },
            btn(){
                if(this.voteTitle == '' || this.voteText == '' ||  this.failData == '' || this.passData == ''){
                    Toast.fail('信息不完整')
                }else{
                    let cnt = {
                        projectId:JSON.parse(localStorage.getItem('vote')).meetId,
                        type:'0',
                        choiceCount:'1',
                        effectiveRatio:this.passData,
                        failureRatio:this.failData,
                        title:this.voteTitle,
                        remark:this.voteText,
                        ext:'无'
                    }

                 this.$util.call('/vote/addVote',cnt,function (res) {
                     console.log(res)
                 })

                    // this.$router.push('/meetVoteOptionAdd')
                }

            },
            pass(){
                this.passShow = true
            },
            passCancel(){
                this.passShow = false
            },
            passConfirm(val){
                this.passShow = false
                this.passData = parseInt(val)

            },
            fail(){
                this.failShow = true
            },
            failCancel(){
                this.failShow = false
            },
            failConfirm(val){
                this.failData = parseInt(val)
                this.failShow = false
                console.log(this.failData)
            }


        },
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
    .input-box {
        width: 100%;
        height: 3.5rem;
        margin-top: 1rem;
        background: rgba(255, 255, 255, .5);
        border-radius: 25px;
        overflow: hidden;
    }
    .title{
        margin-top: 2rem;

    }
    .text{
        margin-top: 2rem;
    }
    .choose-btn{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: #fff;
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #666;
        border: 1px solid #ddd;
    }
</style>
