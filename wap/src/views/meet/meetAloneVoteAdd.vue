<template>
    <div>
        <header-box title="议程相关"></header-box>
        <div class="main-box">
            <van-cell-group>
                <van-field
                        v-model="title"
                        label="表决标题"
                        type="textarea"
                        placeholder="请输入表决名称"
                        autosize
                        rows="1"
                        class="title"
                />

                <van-field
                        v-model="remark"
                        label="表决内容"
                        type="textarea"
                        placeholder="请输入表决内容信息"
                        rows="1"
                        autosize
                        class="text"
                />
                <div class="inp-box">
                    <div class="inp-title" style="width: 90px">
                        参会人员
                    </div>
                    <div class="inp-text" style="width: auto">
                        <van-checkbox-group v-model="crowd">
                            <van-checkbox
                                    v-for="item in crowdList"
                                    :key="item.v"
                                    :name="item.v"
                                    class="radio-box"
                                    style="margin-left: 1rem;margin-top: 1rem"
                            >
                                 {{ item.t}}
                            </van-checkbox>
                        </van-checkbox-group>
                    </div>
                </div>
                <!--<div class="inp-box">-->
                    <!--<div class="inp-title">-->
                        <!--弃权选项-->
                    <!--</div>-->
                    <!--<div class="inp-text">-->
                        <!--<van-switch v-model="isAbstain" />-->
                    <!--</div>-->
                <!--</div>-->
                <div class="inp-box">
                    <div class="inp-title">
                        选项类型
                    </div>
                    <div class="inp-text">
                        <van-radio-group v-model="type" @change="typeBtn">
                            <van-radio name="0" class="radio-box">单选</van-radio>
                            <van-radio name="1" class="radio-box" style="margin-left: 5rem">多选</van-radio>
                        </van-radio-group>
                    </div>
                </div>
                <!--<div class="inp-box" v-if="template == '0'">-->
                    <!--<div class="inp-title">-->
                        <!--选票重投-->
                    <!--</div>-->
                    <!--<div class="inp-text">-->
                        <!--<van-radio-group v-model="reeditable" >-->
                            <!--<van-radio :name="true" class="radio-box">支持重投</van-radio>-->
                            <!--<van-radio :name="false" class="radio-box" style="margin-left: 5rem">禁用重投</van-radio>-->
                        <!--</van-radio-group>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="inp-box" v-if="template == '0'">-->
                    <!--<div class="inp-title">-->
                        <!--选票实名-->
                    <!--</div>-->
                    <!--<div class="inp-text">-->
                        <!--<van-radio-group v-model="realName" >-->
                            <!--<van-radio :name="true" class="radio-box">实名</van-radio>-->
                            <!--<van-radio :name="false" class="radio-box" style="margin-left: 5rem">不实名</van-radio>-->
                        <!--</van-radio-group>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="inp-box" v-if="template == '0'">-->
                    <!--<div class="inp-title">-->
                        <!--内部投票-->
                    <!--</div>-->
                    <!--<div class="inp-text">-->
                        <!--<van-radio-group v-model="isInternal" >-->
                            <!--<van-radio :name="true" class="radio-box">内部投票</van-radio>-->
                            <!--<van-radio :name="false" class="radio-box" style="margin-left: 5rem">公共投票</van-radio>-->
                        <!--</van-radio-group>-->
                    <!--</div>-->
                <!--</div>-->

                <van-field
                        v-model="choiceCount"
                        label="选项限制"
                        type="number"
                        placeholder="单人最大投票选项数"
                        class="text"
                        v-if="choiceCountShow == true"
                />

                <van-field
                        v-model="failData"
                        type="text"
                        label="表决失效"
                        placeholder="请选择自动表决失效比例"
                        @focus="fail"
                        v-if="template == '0'"
                        style="margin-top: 2rem"
                />
                <van-field
                        v-model="passData"
                        type="text"
                        label="通过比例"
                        placeholder="请选择自动通过的比例"
                        @focus="pass"
                        v-if="template == '0'"
                        style="margin-top: 2rem"
                />
            </van-cell-group>


            <div class="create-btn" @click="btn">完 成</div>
        </div>

        <van-popup v-model="passShow" position="bottom" :overlay="true">
            <van-picker
                    :columns="num"
                    @change="onChangePass"
            />
        </van-popup>
        <van-popup v-model="failShow" position="bottom" :overlay="true">
            <van-picker
                    :columns="num"
                    @change="onChangePassFail"
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
                isAbstain:true,
                template:'0',         //控制0  选举和 1 投票的显示区别
                type:'0',
                reeditable:false,
                realName:true,
                isInternal:true,
                title: '',
                remark: '',
                choiceCountShow:false,
                choiceCount:1,
                failShow:false,
                failData:'',
                passShow:false,
                passData:'',
                num:['1/3','1/2','2/3'],
                effectiveRatio:'100',
                failureRatio:'100',
                crowd:[],
                crowdList:[
                    {
                        v:0,
                        t:'所有人',
                    },
                    {
                        v:1,
                        t:'股东',
                    },
                    {
                        v:2,
                        t:'股东代表',
                    },
                    {
                        v:3,
                        t:'董事会',
                    },
                    {
                        v:4,
                        t:'监事会',
                    }
                ],
            }
        },
        methods: {
            typeBtn(){
              if(this.type == '0'){
                  this.choiceCount = 1
                  this.choiceCountShow = false
              }else{
                  this.choiceCountShow = true
              }
            },
            chooseBtn(){
                this.$router.push('/meetChoose')
            },
            btn(){
                let that = this
                if(this.voteTitle == '' || this.voteText == '' ||  this.effectiveRatio == '' || this.failureRatio == '' ||this.crowd == []){
                    Toast.fail('信息不完整')
                }else{
                    let cnt = {
                        orgId:JSON.parse(localStorage.getItem('user')).orgId,
                        projectId:JSON.parse(localStorage.getItem('meet')).id,
                        template:this.template,
                        type:this.type,
                        choiceCount:this.choiceCount,
                        crowd:JSON.stringify(this.crowd),
                        reeditable:this.reeditable,
                        realName:this.realName,
                        isInternal:this.isInternal,
                        isAbstain:this.isAbstain,
                        effectiveRatio:this.effectiveRatio,
                        failureRatio:this.failureRatio,
                        title:this.title,
                        remark:this.remark,
                        ext:'无'
                    }
                    that.$util.call('/vote/addVote',cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            localStorage.setItem('voteInfo',res.data.c)
                            if(that.template == '0'){
                                that.$router.push('/voteOptionPick')
                            }else{
                                that.$router.push('/meetVoteOptionAdd')
                            }
                        }else{
                            Toast.fail({
                                duration:500,
                                message:'新建失败'
                            })
                        }
                    })
                }
            },
            onChangePass(picker, value, index) {
                this.passShow = false
                this.passData =  value
                if(index == '0'){
                    this.effectiveRatio ='33'
                }else if(index == '1'){
                    this.effectiveRatio ='50'
                }else if(index == '2'){
                    this.effectiveRatio = '67'
                }
                console.log(this.effectiveRatio);
            },
            pass(){
                this.passShow = true
            },
            fail(){
                this.failShow = true
            },
            onChangePassFail(picker, value, index){
                this.failShow = false
                this.failData =  value
                if(index == '0'){
                    this.failureRatio ='33'
                }else if(index == '1'){
                    this.failureRatio ='50'
                }else if(index == '2'){
                    this.failureRatio = '67'
                }
                console.log(this.failureRatio);
            },

        },
        mounted(){
            let template = this.$route.params.type
            console.log(template)
            if(template ==null || template == undefined){
                Toast.fail({
                    duration:500,
                    message:'请先选择表决模板'
                })
                this.$router.push('/meetChoose')
            }else{
                if(template == '0'){
                    this.template = '0'
                }else{
                    this.template = '1'
                }
            }

        }
    }
</script>

<style scoped lang="scss">
    .inp-box{
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 10px 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 24px;
        position: relative;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        overflow: hidden;
        margin-top: 1rem;
    }
    .inp-title{
        float: left;
        width: 90px;

    }
    .inp-text{
       width: auto;
    }
    .radio-box{
        float: left;

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
        margin-top: 1rem;


    }
    .text{
        margin-top: 1rem;
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
