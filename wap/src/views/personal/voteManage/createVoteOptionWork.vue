<template>
    <div>
        <header-box title="选项选项"></header-box>
        <div class="main-box">
            <div class="vote-box">
                <div class="vote-box-title">
                    <div class="vote-title">
                        议程名称:
                    </div>
                    <div class="vote-text">
                        {{voteInfo.title}}
                    </div>
                </div>
                <div class="vote-box-title">
                    <div class="vote-title">
                        议程内容:
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
                                <i class="iconfont icon-qianbi" style="float: left;color: #36a3f7;"  @click="edit(item,item.id,index)"></i>
                                <i class="iconfont icon-19icon" style="float: right;color: rgb(244, 81, 108);"  @click="del(item.id,index)"></i>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="box2" @click="add">
                <span style="display: block;float: left;margin-left: 50%;position: relative;left: -35px;">+</span> <span style="font-size: 1.6rem;line-height: 6rem;height: 6rem;display: block;float: left;margin-left: -20px">选项</span>
            </div>

            <div class="create-btn" @click="btn">完 成</div>

        </div>


        <van-dialog
                v-model="addShow"
                show-cancel-button
                title="新增选项"
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
    import draggable from 'vuedraggable'

    import { Dialog } from 'vant';
    export default {
        name: "meetVoteOptionAdd",
        components: {
            HeaderBox,
            draggable
        },
        data() {
            return {
                voteInfo:'',
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
                voteId:'',              //表决id
            }
        },
        methods: {
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
            //修改选项
            editVoteOption(cnt){
                this.$api.editVoteOption(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        Toast.success('修改成功')
                        this.$router.push('/page')
                    }else{
                        Toast.fail('修改失败')
                        this.$router.push('/page')
                    }
                })
            },
            //修改选项的先后位置顺序
            setVoteOptionIds(cnt){
                this.$api.setVoteOptionIds(cnt,(res)=>{
                    if(res.data.rc != this.$util.RC.SUCCESS){
                        Toast.fail({
                            duration:500,
                            message:'交换位置失败'
                        })
                    }
                })
            },
            //新增选项
            addVoteOption(cnt){
                this.$api.addVoteOption(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$router.push('/page')
                    }else{
                        Toast.fail('新增失败')
                        this.$router.push('/page')
                    }
                })

            },
            //
            getVoteOptions(cnt){
              this.$api.getVoteOptions(cnt,(res)=>{
                  if(res.data.rc == this.$util.RC.SUCCESS){
                        this.optionList = this.$util.tryParseJson(res.data.c)
                  }else{
                      this.optionList = []
                  }
              })
            },


            changeBtn(){
                let optionIds = []
                for(let i=0;i<this.optionList.length;i++){
                    optionIds.push(this.optionList[i].id)
                }
                let cnt = {
                    voteId: JSON.parse(localStorage.getItem('voteInfo')).id, // Long 投票编号
                    optionIds: optionIds, // JSONArray 投票选项编号列表（JSONArray）
                };
                this.setVoteOptionIds(cnt)
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
                    let cnt = {
                        voteId:this.voteId,
                        optionId: this.editId,
                        title: this.editInput,
                        remark: '无',
                        ext: '无',
                    }
                    this.editVoteOption(cnt)
                }


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

            add(){
                this.addShow = true
            },
            addBtn(){
                let cnt ={
                    voteId:this.voteId,
                    title:this.addInput,
                    remark:'无',
                    ext:'无'
                }
                this.addVoteOption(cnt)

            },

            btn(){
                this.$router.push('/voteManage')
            },
            //修改议程信息
            editVoteBtn(){

                this.$router.push('/editVote')
            }
        },
        mounted(){
            console.log('222223333322')

            this.voteInfo =  JSON.parse(localStorage.getItem('voteInfo'))
            this.voteId  = JSON.parse(localStorage.getItem('voteInfo')).id
            console.log(localStorage.getItem('voteInfo'))
            console.log(  this.voteInfo)
            let cnt = {
                voteId:this.voteId
            }
            this.getVoteOptions(cnt)



        }
    }
</script>

<style scoped lang="scss">
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
        width: 80%;
        height: 6rem;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 2rem;
        background: #fff;
        border-radius: 5px;
        border: 1px dashed #f4516c;
        font-size: 6rem;
        color: #666;
        line-height: 5rem;
        text-align: center;
        overflow: hidden;
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
