<template>
    <div>
        <header-box title="创建表决"></header-box>
        <div class="main-box">

            <div class="box" @click="addBtn(1)">
                <div class="box-img">
                    <div class="img-title">
                        <i class="iconfont icon-toubiao"></i>
                    </div>
                </div>
                <div class="box-text">
                    <div class="text-title">
                        普通投票表决
                    </div>
                    <div class="text">
                        创建普通投票表决事件入口
                    </div>
                </div>
            </div>

            <div class="box1" @click="addBtn(0)">
                <div class="box-img">
                    <div class="img-title">
                        <i class="iconfont icon-toupiao1"></i>
                    </div>
                </div>
                <div class="box-text">
                    <div class="text-title">
                       选举表决事件
                    </div>
                    <div class="text">
                        创建选举表决事件的入口
                    </div>
                </div>
            </div>


            <div class="create-btn" @click="btn">返回会议</div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import {Toast} from 'vant';

    export default {
        name: "meetChoose",
        data() {
            return {
                voteInfo: '',
                voteList: []
            }
        },
        methods: {
            btn() {
                this.$router.push('/meet')
            },
            addBtn(type) {
                this.$router.push({
                    path: '/meetAloneVoteAdd',
                    name: 'meetAloneVoteAdd',
                    params: {
                        type: type
                    }
                })
            },
            editBtn(item) {
                console.log(item)
                this.$router.push({
                    path: '/meetAloneVoteEdit',
                    name: 'meetAloneVoteEdit',
                    params: {
                        info: item
                    }
                })
            }
        },
        components: {
            HeaderBox
        },
        mounted() {
            console.log(localStorage.getItem('meet'))
            this.voteInfo = JSON.parse(localStorage.getItem('meet'))
            if (this.voteInfo == null) {
                Toast.fail('请选择会议')
                this.$router.push('/meet')
            }
            // let cnt = {
            //     projectId: this.voteInfo.meetId
            // }
            // this.$util.call('/vote/getVotes', cnt, function (res) {
            //     that.voteList = JSON.parse(res.data.c)
            //     console.log(that.voteList);
            // })

        }
    }
</script>

<style scoped lang="scss">
    .box {
        width: 88%;
        height: 8rem;
        margin: 0 auto;
        margin-top: 3rem;
        border-radius: 5px;
        background: #40c9c6;;
    }

    .box1 {
        width: 88%;
        height: 8rem;
        margin: 0 auto;
        margin-top: 3rem;
        border-radius: 5px;
        background: #36a3f7;
    }

    .box-img {
        float: left;
        margin-left: 1rem;
        width: 8rem;
        height: 8rem;

    }

    .box-text {
        width: auto;
        height: 8rem;
        margin-left: 10rem;

    }

    .img-title {
        width: 6rem;
        height: 6rem;
        margin-top: 1rem;
        margin-left: 1rem;
    }

    .img-title i {
        font-size: 6rem;
        text-align: center;
        line-height: 6rem;
        color: #fff;
    }

    .text-title {
        width: auto;
        height: 4rem;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #fff;
        font-weight: 600;
        text-align: left;
        padding-right: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .text {
        width: auto;
        height: 4rem;
        text-align: left;
        padding-right: 1rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

    }

    .btn {
        width: 100%;
        height: 4rem;
        margin-top: 2rem;
        line-height: 4rem;
        text-align: center;
    }

    .create-btn {
        width: 90%;
        height: 3rem;
        margin: 0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: rgb(125, 177, 253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }

    .item-box {

    }

    .item-box {

    }

    .vote-title {
        width: 100%;
        height: 3rem;
        border-left: 4px solid #63a35c;
        padding-left: 1rem;
        font-size: 1.4rem;
        color: #666;
        font-weight: 600;
        line-height: 3rem;
    }

    .vote-item {
        width: 80%;
        margin: 1rem auto;
        height: 4rem;
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 0px 15px;
        margin-top: 2rem;
    }

    .item-title {
        float: left;
        width: 80%;
        height: 4rem;
        line-height: 4rem;
        padding-left: 1rem;
        font-size: 1.4rem;
        color: #444;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .vote-btn {
        float: left;
        width: auto;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
    }
</style>
