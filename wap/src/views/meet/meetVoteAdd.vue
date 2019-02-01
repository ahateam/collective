<template>
    <div>
        <header-box title="会议详情"></header-box>
        <div class="main-box">
            <div class="box">
                <div class="box-title">
                    <div class="title">
                        会议名称:
                    </div>
                    <div class="text">
                        {{meet.title}}
                    </div>
                </div>
                <div class="box-title">
                    <div class="title">
                        会议时间:
                    </div>
                    <div class="text" style="letter-spacing:0px;">
                        <p>
                            {{new Date(meet.startTime).toLocaleDateString()+ ' '+new
                            Date(meet.startTime).toLocaleTimeString('chinese',{hour12:false})}}
                        </p>
                        <p>

                            {{new Date(meet.expiryTime).toLocaleDateString()+ ' '+new
                            Date(meet.expiryTime).toLocaleTimeString('chinese',{hour12:false})}}
                        </p>
                    </div>
                </div>
                <div class="box-title">
                    <div class="title">
                        会议内容:
                    </div>
                    <div class="text">
                        {{meet.remark}}
                    </div>
                </div>
                <div class="edit-box" @click="editMeetBtn">
                <i class="iconfont icon-qianbi"></i>
            </div>
            </div>
            <div class="vote-box">
                <div class="vote-box-title">
                    表决议程
                </div>
                <div class="vote-list">
                    <div v-if="votes.length == 0">
                        暂无议程，赶紧添加一个选举或表决吧
                    </div>
                    <div v-if="votes.length>0">
                        <div class="vote-item-box" v-for="(item,index) in votes" :key="index">
                            <div class="vote-item-title" @click="editBtn(item)">
                                <div class="vote-item-note">
                                    <span v-if="item.template == '1'">
                                         <i class="iconfont icon-paimingbiaoqian"></i>
                                    </span>
                                    <span v-if="item.template == '0'">
                                         <i class="iconfont icon-paimingbiaoqian" style="color: #40c9c6;"></i>
                                    </span>
                                </div>
                                <div class="vote-item-text">
                                    {{item.title}}
                                </div>
                            </div>
                            <div class="vote-item-content">
                                <div class="item-left">
                                    <span v-if="item.status == '0'">正在投票</span>
                                    <span v-if="item.status == '1'">等待投票</span>
                                    <span v-if="item.status == '2' || item.status == '4'">投票作废</span>
                                    <span v-if="item.status == '3'">投票结束</span>

                                </div>
                                <div class="item-box1">
                                    <div class="item-del">
                                        <i class="iconfont icon-19icon" style="color: rgb(244, 81, 108);"
                                           @click="del(item.id)"></i>
                                    </div>
                                    <div class="item-del">
                                        <i class="iconfont icon-jieshu" style="color: rgb(244, 81, 108);"
                                           @click="stopBtn(item)"></i>
                                    </div>
                                    <div class="item-update" v-if="activation[index] != -1">
                                        <div class="update-box">
                                            <van-switch v-model="activation[index]" size="20px"
                                                        @change="updateBtn(item.id,activation[index])"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="box1" @click="addVote">
                    +
                </div>

                <div class="create-btn" @click="btn">确认完成</div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import {Dialog} from 'vant';
    import {Toast} from 'vant';

    export default {
        name: "meetVoteAdd",
        data() {
            return {
                activation: [],
                meet: '',
                votes: [],
            }
        },
        methods: {
            stopBtn(item) {
                if (item.status == 4) {
                    Dialog.confirm({
                        title: '更改投票状态',
                        message: '更改投票状态为正在投票'
                    }).then(() => {
                        let that = this
                        let pausedData = false
                        let cnt = {
                            projectId: JSON.parse(localStorage.getItem('meet')).id,
                            voteId: item.id,
                            paused: pausedData
                        }
                        console.log(cnt);
                        this.$util.call('/vote/setVotePaused', cnt, function (res) {
                            if (res.data.rc == that.$util.RC.SUCCESS) {
                                that.$router.push('/page')
                            } else {
                                console.log('修改失败')
                            }
                        })
                    }).catch(() => {
                        // on cancel
                    });
                } else if (item.status == 2) {
                    Toast.fail({
                        duration: 500,
                        message: '不能修改系统计算的失效值'
                    })
                } else if (item.status == 1) {
                    Toast.fail({
                        duration: 500,
                        message: '投票未开始'
                    })
                }else if(item.status == 0){
                    Dialog.confirm({
                        title: '更改投票状态',
                        message: '更改投票状态为废除'
                    }).then(() => {
                        let that = this
                        let pausedData = true
                        let cnt = {
                            projectId: JSON.parse(localStorage.getItem('meet')).id,
                            voteId: item.id,
                            paused: pausedData
                        }
                        this.$util.call('/vote/setVotePaused', cnt, function (res) {
                            if (res.data.rc == that.$util.RC.SUCCESS) {
                                that.$router.push('/page')
                            } else {
                                console.log('修改失败')
                            }
                        })
                    }).catch(() => {
                    });
                }
            },
            updateBtn(id, status) {
                let that = this
                let cnt = {
                    projectId: JSON.parse(localStorage.getItem('meet')).id,
                    voteId: id,
                    activation: status
                }
                this.$util.call('/vote/setVoteActivation', cnt, function (res) {
                    if (res.data.rc != that.$util.RC.SUCCESS) {
                        Toast.fail({
                            duration: 500,
                            message: '修改失败'
                        })
                    }
                    that.$router.push('/page')
                })
            },
            del(id) {
                Dialog.confirm({
                    title: '确认删除',
                    message: '是否删除该表决'
                }).then(() => {
                    let cnt = {
                        projectId: JSON.parse(localStorage.getItem('meet')).id,
                        voteId: id,
                    }
                    let that = this
                    this.$util.call('/vote/delVote', cnt, function (res) {
                        if (res.data.rc == that.$util.RC.SUCCESS) {
                            Toast.success({
                                duration: 500,
                                message: '删除成功'
                            });
                            that.$router.push('/page')
                        } else {
                            Toast.fail({
                                duration: 500,
                                message: '删除失败'
                            });
                        }
                    })
                }).catch(() => {
                    // on cancel
                });

            },
            addVote() {
                this.$router.push('/meetChoose')
            },
            editBtn(item) {
                console.log(item)
                localStorage.setItem('voteInfo', JSON.stringify(item))
                if (item.template == '0') {
                    this.$router.push('/voteOptionPick')
                } else {
                    this.$router.push('/meetVoteOptionAdd')
                }
            },
            btn() {
                this.$router.push('/meet')
            },
            editMeetBtn(){
                this.$router.push('/meetAdd')
            }
        },
        components: {
            HeaderBox
        },
        mounted() {
            let that = this
            this.meet = JSON.parse(localStorage.getItem('meet'))
            let cnt = {
                projectId: this.meet.id
            }
            this.$util.call('/vote/getVotes', cnt, function (res) {
                that.votes = JSON.parse(res.data.c)
                console.log(that.votes)
                for (let i = 0; i < that.votes.length; i++) {
                    if (that.votes[i].status == '0') {
                        that.activation[i] = true
                    } else if (that.votes[i].status == '1') {
                        that.activation[i] = false
                    } else {
                        that.activation[i] = -1
                    }
                }
            })
            console.log(this.meet)
        }
    }
</script>

<style scoped lang="scss">
    .vote-item-box {
        width: 100%;
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
        width: 100%;
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

    p {
        margin: 0;
        padding: 0;
    }

    .box {
        width: 75%;
        margin: 0 auto;
        margin-top: 2rem;
        border-radius: 5px;
        padding: 1.5rem;
        font-size: 1.4rem;
        border: 1px solid #ddd;
        position: relative;
    }

    .box-title {
        margin-top: 1rem;
        font-size: 1.4rem;
        color: #333;
    }

    .title {
        float: left;
        width: 8rem;
        text-align: left;
        letter-spacing: 1px;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #333;
    }

    .text {
        width: auto;
        margin-left: 8rem;
        letter-spacing: 1px;
        line-height: 2rem;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 20;
    }

    .vote-box {
        width: 85%;
        margin: 0 auto;
        margin-top: 2rem;
    }

    .vote-box-title {
        width: auto;
        height: 3rem;
        border-left: 4px solid #63a35c;
        padding-left: 1rem;
        font-size: 1.6rem;
        color: #666;
        line-height: 3rem;
    }

    .vote-list {
        width: auto;
        margin-top: 1rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
    }

    .box1 {
        width: 88%;
        height: 6rem;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
        border: 1px dashed #f4516c;
        font-size: 6rem;
        color: #666;
        line-height: 5rem;
        text-align: center;
    }

    .item-box {
        width: auto;
        height: 4rem;
        margin-top: 1rem;
        border: 1px solid #ddd;
        padding-left: 1rem;
        line-height: 4rem;
        border-radius: 5px;
    }

    .item-left {
        float: left;
        width: 40%;
        height: 4rem;
        text-align: center;
        line-height: 4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .item-edit {
        float: left;
        width: 40%;
        text-align: center;
        line-height: 4rem;
        color: #0086b3;
    }

    .item-box1 {
        float: left;
        width: 60%;
        height: 4rem;
        overflow: hidden;
        text-align: center;
        line-height: 4rem;
    }

    .item-del {
        float: left;
        width: 30%;
        text-align: center;
        line-height: 4rem;
        font-size: 2rem;
        text-align: center;
    }

    .item-del i {
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        font-size: 2rem;
        text-align: center;
    }

    .item-update {
        float: left;
        width: 40%;
    }

    .update-box {
        margin-top: .5rem;
    }
    .edit-box{
        position: absolute;
        right:-0.5rem;
        top:-0.5rem;
        width: 3.5rem;
        height:3.5rem;
        background: #40c9c6;
        border-radius: 25px;
    }
    .edit-box i{
        display: block;
        width: 3.5rem;
        height: 3.5rem;
        text-align: center;
        line-height: 3.5rem;
        font-size: 2.5rem;
        color: #fff;
    }

</style>
