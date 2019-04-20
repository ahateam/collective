<template>
    <div>
        <header-box title="新增选举"></header-box>
        <div class="main-box">
            <van-cell-group>
                <van-field
                        v-model="voteTitle"
                        label="选举标题"
                        type="textarea"
                        placeholder="请输入选举名称"
                        autosize
                        rows="1"
                        class="title"
                />

                <van-field
                        v-model="num"
                        label="选项限制"
                        type="number"
                        placeholder="请输入最多能够投票项数"
                        class="title"
                />

                <van-field
                        v-model="voteText"
                        label="选举内容"
                        type="textarea"
                        placeholder="请输入选举内容信息"
                        rows="3"
                        autosize
                        class="text"
                />

            </van-cell-group>


            <div class="create-btn" @click="btn">下 一 步</div>
            <div class="choose-btn" @click="chooseBtn">返 回 重 选</div>
        </div>

    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "meetAloneVoteAdd",
        components: {
            HeaderBox
        },
        data() {
            return {

                voteTitle: '',
                voteText: '',
                type:1,
                num:''
            }
        },
        methods: {
            chooseBtn(){
                this.$router.push('/meetChoose')
            },
            btn(){
                this.$router.push('/meetVoteOptionAdd')
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
