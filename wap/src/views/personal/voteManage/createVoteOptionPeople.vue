<template>
    <div>
        <header-box title="选项管理"></header-box>
        <div class="main-box">
            <div class="vote-box">
                <div class="vote-box-title">
                    <div class="vote-title">
                        投票标题:
                    </div>
                    <div class="vote-text">
                        {{voteInfo.title}}
                    </div>
                </div>
                <div class="vote-box-title">
                    <div class="vote-title">
                        投票内容:
                    </div>
                    <div class="vote-text">
                        {{voteInfo.remark}}
                    </div>
                </div>
                <div class="edit-box" @click="editVoteBtn">
                    <i class="iconfont icon-qianbi"></i>
                </div>
            </div>
            <div class="option-box">
                <div class="option-box-title">
                    表决选项
                </div>

                <div v-if="optionList.length == 0" class="msg">
                    还没有添加选项，赶紧添加一个选项吧
                </div>

                <div v-if="optionList.length >0">
                    <draggable v-model="optionList" @update="changeBtn">
                        <div class="box1" v-for="(item,index) in optionList" :key="index"  :title="item.title">
                            <div class="box-title">
                                {{item.title}}
                            </div>
                            <div class="box-btn" v-if="item.title != '弃权'">
                                <i class="iconfont icon-19icon" style="float: right;color: rgb(244, 81, 108);"  @click="del(item.id,index)"></i>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="box2" >
                <van-search
                        v-model="search"
                        placeholder="请输入搜索成员的姓名"
                        show-action

                >
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </div>

            <div class="box3">
                <div class="list" v-for="(item,index) in searchList" :key="index">
                    <div @click="addBtn(item)">
                        <div class="list-name">
                            {{ item.user.realName}}
                        </div>
                        <div class="list-info">
                            {{item.user.idNumber}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="create-btn" @click="btn">完 成</div>

        </div>



    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant'
    import draggable from 'vuedraggable'

    import { Dialog } from 'vant';
    export default {
        name: "createVoteOptionPeople",
        components: {
            HeaderBox,
            draggable
        },
        data() {
            return {
                search:'',
                searchList:[],
                voteInfo:'',
                voteTitle: '',
                voteText: '',
                type:0,
                optionList:[],
                title:'',
                meetId:'',              //会议id
                voteId:'',              //表决id
            }
        },
        methods: {
            //根据用户姓名搜索用户列表
            getORGUsersLikeRealName(cnt){
                    this.$api.getORGUsersLikeRealName(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.searchList = this.$util.tryParseJson(res.data.c)
                            if(this.searchList.length == 0){
                                Toast.fail({
                                    duration:300,
                                    message:'暂无数据'
                                })
                            }
                        }else{
                            Toast.fail({
                                duration:500,
                                message:'输入错误'
                            })
                        }
                    })
            },
            //请求选项列表
            getVoteOptions(cnt){
              this.$api.getVoteOptions(cnt,(res)=>{
                  if(res.data.rc == this.$util.RC.SUCCESS){
                      this.optionList = this.$util.tryParseJson(res.data.c)
                  }else{
                      this.optionList = []
                  }
              })
            },
            //交换选项的位置
            setVoteOptionIds(cnt){
                this.$api.setVoteOptionIds(cnt,(res)=>{
                    if(res.data.rc != this.$util.RC.SUCCESS){
                     Toast.fail('交换位置失败')
                    }
                })
            },
            //删除选项
            delVoteOption(cnt){
                this.$api.delVoteOption(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        Toast.success('删除成功')
                        this.$router.push('/page')
                    }else{
                        Toast.success('删除失败')
                        this.$router.push('/page')
                    }
                })
            },
            //新增选项
            addVoteOption(cnt){
                this.$api.addVoteOption(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$router.push('/page')
                    }else{
                        Toast.fail('新增选项失败')
                        this.$router.push('/page')
                    }
                })
            },


            onSearch(){
                let count = 20
                let offset = 0

                let cnt ={
                    orgId:JSON.parse(localStorage.getItem('user')).orgId,
                    realName:this.search,
                    count:count,
                    offset:offset
                }
                this.getORGUsersLikeRealName(cnt)

            },
            changeBtn(){
                let optionIds = []
                for(let i=0;i<this.optionList.length;i++){
                    optionIds.push(this.optionList[i].id)
                }
                let cnt = {
                    voteId: JSON.parse(localStorage.getItem('voteInfo')).id, // Long 投票编号
                    optionIds: JSON.stringify(optionIds), // JSONArray 投票选项编号列表（JSONArray）
                };
                this.setVoteOptionIds(cnt)
            },
            del(id,index){
                Dialog.alert({
                    title: '删除选项',
                    message: '是否确认删除该选项'
                }).then(() => {
                    let cnt = {
                        voteId:this.voteId,
                        optionId:id
                    }
                    this.delVoteOption(cnt)
                });
            },

            addBtn(info){
                let ext = {
                    userId:info.user.userId,
                    idNumber:info.user.idNumber,
                    realName:info.user.realName,
                }
                let cnt ={
                    voteId:this.voteId,
                    title:info.user.realName,
                    remark:'无',
                    ext:ext
                }
                this.addVoteOption(cnt)

            },

            //修改议程信息
            editVoteBtn(){
                this.$router.push('/editVote')
            },
            btn(){
                this.$router.push('/voteManage')
            }
        },
        mounted(){
            this.voteInfo =  JSON.parse(localStorage.getItem('voteInfo'))
            this.voteId  = JSON.parse(localStorage.getItem('voteInfo')).id
            let cnt = {
                voteId:this.voteId
            }
            this.getVoteOptions(cnt)
        }
    }
</script>

<style scoped lang="scss">
    .box3{
        width: 88%;
        background: #fff;
        margin: 0 auto;

    }
    .list{
        width: auto;
        height: 4rem;
        padding: 0 1rem;
        background: #fff;
        border-bottom: 1px solid #ddd;
    }
    .list-name{
        float: left;
        width: 8rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
        color: #333;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .list-info{
        width: auto;
        margin-left: 8rem;
        height: 4rem;
        text-align: right;
        line-height: 4rem;
        color: #666;
        font-size: 1.4rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .vote-box{
        position: relative;
        width: 75%;
        margin: 0 auto;
        margin-top: 2rem;
        border-radius: 5px;
        padding: 1.5rem;
        font-size: 1.4rem;
        border: 1px solid #ddd;
    }
    .vote-box-title{
        margin-top: 1rem;
        font-size: 1.4rem;
        color: #333;
    }
    .vote-title{
        float: left;
        width: 8rem;
        text-align: left;
        letter-spacing:1px;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #333;
    }
    .vote-text{
        width: auto;
        margin-left: 8rem;
        letter-spacing:1px;
        line-height: 2rem;
        color: #666;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:20;
    }


    .box2{
        width: 88%;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
        font-size: 6rem;
        color: #666;
        line-height: 5rem;
        text-align: center;
    }
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
    .box1{
        width: 88%;
        height: 4rem;
        margin: 0 auto;
        padding: 0 1rem;
        margin-top: 2rem;
        background: #fff;
        border-radius: 5px;
        font-size: 6rem;
        line-height: 5rem;
        text-align: center;
        border: 1px solid #ddd;
        box-shadow: 2px 3px 5px rgba(0,0,0,.2)
    }
    .box-title{
        float: left;
        width: 75%;
        height: 4rem;
        text-align: left;
        color: #666;
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 4rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .box-btn{
        float: left;
        width: 25%;
        height: 4rem;

    }
    .box-btn i{
        display: block;
        width: 2.5rem;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 2rem;

    }
    .option-box{
        width: 85%;
        margin: 0 auto;
        margin-top: 2rem;
    }
    .option-box-title{
        width: auto;
        height: 3rem;
        border-left: 4px solid #63a35c;
        padding-left: 1rem;
        font-size: 1.6rem;
        color: #666;
        line-height: 3rem;
    }
    .msg{
        width: 100%;
        font-size: 1.4rem;
        color: #666;
        margin: 1rem 0;
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
