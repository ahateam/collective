<template>
    <div>
        <header-box title="新增选项"></header-box>
        <div class="main-box">

            <div class="box" v-for="(item,index) in optionList" :key="index">
                <div class="box-title">
                    {{item.title}}
                </div>
                <div class="box-btn">
                    <i class="iconfont icon-qianbi" style="float: left;color: #36a3f7;"  @click="edit(item,item.id,index)"></i>
                    <i class="iconfont icon-19icon" style="float: right;color: rgb(244, 81, 108);"  @click="del(item.id,index)"></i>
                </div>
            </div>
            <div class="box1" @click="add">
                +
            </div>

            <div class="create-btn" @click="btn">完 成 创 建</div>
            <div class="choose-btn" @click="chooseBtn">返 回 重 选</div>
        </div>


        <van-dialog
                v-model="addShow"
                show-cancel-button
                title="修改选项"
                @confirm="addBtn"
        >
            <van-field
                    v-model="addInput"
                    label="选项名"
                    placeholder="请输入选项"
                    style="margin-top: 2rem"
            />
        </van-dialog>
        <van-dialog
                v-model="editShow"
                show-cancel-button
                title="修改选项"
                @confirm="editBtn"
        >
            <van-field
                    v-model="editInput"
                    label="选项名"
                    placeholder="请输入选项"
                    style="margin-top: 2rem"
            />
        </van-dialog>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant'

    import { Dialog } from 'vant';
    export default {
        name: "meetVoteOptionAdd",
        components: {
            HeaderBox
        },
        data() {
            return {
                voteTitle: '',
                voteText: '',
                type:0,
                optionList:[],
                title:'',
                editShow:false,        //修改弹窗
                editInput:'',            //修改输入框
                editId:'',                //修改选项id
                editKey :'',               //修改选项的数组下标
                addShow:false,          //新增选项弹窗
                addInput:'',            //新增输入框

                meetId:'',              //会议id
                voteId:'',              //表决id
            }
        },
        methods: {
            refOption(that){
                let that1 = that
                let cnt = {
                    voteId:that1.voteId
                }
                that1.$util.call('/vote/getVoteOptions',cnt,function (res) {
                    that1.optionList = JSON.parse(res.data.c)
                    console.log(that1.optionList)
                })
            },
            edit(item,id,index){
                this.editShow = true
                this.editInput = item.title
                this.editId = id
                this.editKey = index
            },
            editBtn(){
                if(this.editInput == ''){
                    Toast({
                        duration:300,
                        message:'请输入修改值'
                    });
                }else{
                    let that = this
                    let cnt = {
                        projectId: this.meetId,
                        optionId: this.editId,
                        title: this.editInput,
                        remark: '无',
                        ext: '无',
                    };
                    console.log(cnt)
                    this.$util.call('/vote/editVoteOption',cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            Toast({
                                duration:500,
                                message:'修改成功'
                            });
                            that.$router.push('/page')
                        }

                    })
                }


            },

            del(id,index){
                let that =this
                Dialog.alert({
                    title: '删除选项',
                    message: '是否确认删除该选项'
                }).then(() => {
                    let cnt = {
                        projectId:this.meetId,
                        optionId:id
                    }
                    console.log(id)
                    console.log(index)
                    console.log(this.optionList)
                    this.$util.call('/vote/delVoteOption',cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            Toast({
                                duration:300,
                                message:'删除成功'
                            });
                            that.optionList.splice(index,1)
                        }
                    })
                });
            },

            add(){
                this.addShow = true
            },
            addBtn(){

                let that = this
                let cnt ={
                    projectId:this.meetId,
                    voteId:this.voteId,
                    title:this.addInput,
                    remark:'无',
                    ext:'无'
                }
                this.$util.call('/vote/addVoteOption',cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            that.addInput = ''
                            that.addShow = false
                            that.$options.methods.refOption(that)
                        }
                })
            },


            chooseBtn(){
                this.$router.push('/meetChoose')
            },
            btn(){
                this.$router.push('/meet')
            }
        },
        mounted(){
            let that = this
            this.meetId  =  JSON.parse(localStorage.getItem('vote')).meetId
            this.voteId  = JSON.parse(localStorage.getItem('vote')).voteId
            if(this.meetId == '' || this.voteId == ''){
                this.$router.push('/meet')
                Toast.fail('重新选择会议')
            }
            let cnt = {
                voteId:this.voteId
            }
            this.$util.call('/vote/getVoteOptions',cnt,function (res) {
                that.optionList = JSON.parse(res.data.c)
                console.log(that.optionList)
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
        height: 6rem;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 3rem;
        background: #fff;
        border-radius: 5px;
        border: 1px dashed #ddd;
        font-size: 6rem;
        color:#666;
        line-height: 5rem;
        text-align: center;
    }
    .box{
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
</style>
