<template>
    <div>
        <header-box title="会议管理"></header-box>
        <div class="main-box">

            <div class="box" v-for="(item,index) in started" :key="index" >
                <div class="item-icon" @click="infoBtn(item)">
                    <van-icon name="gift-card"/>
                </div>
                <div class="item-text" >
                    <div class="item-title" @click="infoBtn(item)">
                        {{item.title}}
                    </div>
                    <div class="item-content">
                        <div class="status-btn">
                            <div class="del" @click="meetDel(item.id)">
                                <i class="iconfont icon-19icon"></i>
                            </div>
                            <div class="stared" @click="infoBtn(item)">
                                正在进行
                            </div>
                        </div>
                        <div class="btn-box" @click="infoBtn(item)">
                            {{new Date(item.expiryTime).toLocaleDateString()}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="box" v-for="(item1) in waiting">
                <div class="item-icon" @click="infoBtn(item1)">
                    <van-icon name="gift-card" style="color: #40c9c6;"/>
                </div>
                <div class="item-text">
                    <div class="item-title" @click="infoBtn(item1)">
                        {{item1.title}}
                    </div>
                    <div class="item-content">
                        <div class="status-btn">
                            <div class="del" @click="meetDel(item1.id)">
                                <i class="iconfont icon-19icon"></i>
                            </div>
                            <div class="stared" style="color: #40c9c6;border: 1px  solid  #40c9c6" @click="infoBtn(item1)">
                                即将开始
                            </div>
                        </div>
                        <div class="btn-box" @click="infoBtn(item1)">
                            <div class="btn">
                                添加议程
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box" v-for="(item2) in fininshed">
                <div class="item-icon">
                    <van-icon name="gift-card" style="color: rgb(244, 81, 108);"/>
                </div>
                <div class="item-text">
                    <div class="item-title">
                        {{item2.title}}
                    </div>
                    <div class="item-content">
                        <div class="status-btn" style="float: right;margin-right: 1rem">
                            <div class="del" @click="meetDel(item2.id)">
                                <i class="iconfont icon-19icon"></i>
                            </div>
                            <div class="stared" style="color: rgb(244, 81, 108);border: 1px  solid  rgb(244, 81, 108);">
                                已经结束
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-link to="/meetAdd">
                <div class="box1">
                    +
                </div>
            </router-link>
            <router-link to="/home">
                <div class="create-btn"> 返回首页 </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant';
    export default {
        name: "meet",
        data() {
            return {
                started: [],
                waiting: [],
                fininshed: [],

            }
        },
        components: {
            HeaderBox
        },
        methods:{
            infoBtn(info){
                //正在进行的会议详细
                localStorage.setItem('meet',JSON.stringify(info))
                this.$router.push('/meetVoteAdd')
            },
            meetDel(id){
                let that = this
                let cnt = {
                    projectId: id,
                }
                this.$util.call('/vote/delVoteProject',cnt,function (res) {
                     if(res.data.rc == that.$util.RC.SUCCESS){
                         Toast.success({
                             duration:1000,
                             message:'删除成功'
                         });
                         that.$router.push('/page')
                     }
                })
            }
        },
        mounted() {
            localStorage.setItem('meet','')
            let that = this
            let orgId = JSON.parse(localStorage.getItem('user')).orgId
            let count = 40
            let offset = 0
            let cnt = {
                orgId: orgId,
                isActive:true,
                count: count,
                offset: offset
            }
            this.$util.call('/vote/getVoteProjectsByOrgId', cnt, function (res) {
                that.started = JSON.parse(res.data.c).started
                that.waiting = JSON.parse(res.data.c).waiting
                that.fininshed = JSON.parse(res.data.c).fininshed
                console.log(that.started)
            })
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
        background: rgb(240, 242, 245);
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

    .box {
        width: 88%;
        height: 8rem;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
    }

    .item-icon {
        float: left;
        width: 8rem;
        height: 8rem;
    }

    .item-icon i {
        width: 8rem;
        height: 8rem;
        font-size: 5rem;
        line-height: 8rem;
        text-align: center;
        color: rgb(54, 163, 247);
    }

    .item-text {
        width: auto;
        height: 8rem;
        margin-left: 8rem;
    }

    .item-title {
        width: auto;
        height: 4rem;
        padding-top: .5rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .item-content {
        width: auto;
        height: 3rem;
        margin-top: .5rem;
    }

    .status-btn {
        float: left;
        width: 50%;
        height: 3rem;

    }

    .btn-box {
        float: left;
        width: 50%;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
    }

    .stared {
        float: right;
        width: 5rem;
        height: 2rem;
        padding: 0 .5rem;
        line-height: 2rem;
        margin-top: .4rem;
        text-align: center;
        border: 1px solid #36a3f7;
        color: #36a3f7;
        border-radius: 3px;
    }

    .btn {
        float: right;
        margin-right: 1rem;
        width: 5rem;
        height: 2.2rem;
        padding: 0 .5rem;
        line-height: 2.2rem;
        margin-top: .4rem;
        text-align: center;
        background: #36a3f7;
        color: #fff;
        border-radius: 3px;
    }
    .del{
        float: left;
    }
    .del i{
        display: block;
        font-size: 2rem;
        line-height: 3rem;
        width: 3rem;
        text-align: center;
        color: rgb(244, 81, 108);
    }

</style>
