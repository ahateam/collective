<template>
    <div>
        <header-box title="表决详情"></header-box>
        <div class="main-box">
            <div class="info-title">
                {{info.title}}
            </div>
            <div class="info-time">
                {{startTime}} — {{expiryTime}}
            </div>
            <div class="info-text">
                <p style="padding: 0 15px">
                    {{info.remark}}
                </p>
            </div>
            <div class="info-btn">
                <div v-if="info.type == 0">
                    <div class="item-box" v-for="(item,index) in voteOption" :key="index">
                        <div v-for="(itemActive,key) in optionActive" :key="key">
                            <span v-if="itemActive.option == item.id">
                                <span v-if="itemActive.opt =='0'">
                                    <van-button plain type="primary" @click="renounceBtn(item.id,'1')"
                                                :disabled="voteShow==true"
                                                style="  float: left;margin-left: 25px;margin-top: 10px">{{item.title}}</van-button>
                                </span>
                                <span v-if="itemActive.opt =='1'">
                                    <van-button type="primary" @click="renounceBtn(item.id,'1')"
                                                :disabled="voteShow==true"
                                                style="float: left;margin-left: 25px;margin-top: 10px">{{item.title}}</van-button>
                                </span>
                            </span>


                        </div>
                    </div>
                </div>
                <div v-if="info.type == 1">
                    <div class="item" v-for="(item,index) in voteOption" :key="index">
                        <div v-for="(itemActive,key) in optionActive" :key="key">
                            <div class="option-title" v-if="itemActive.option == item.id ">
                                {{item.title}}
                            </div>
                            <div class="option-vote" v-if="itemActive.option == item.id ">
                                <div class="option-box">
                                <span v-if="itemActive.option == item.id && itemActive.opt =='1' ">
                                    <van-button type="primary" size="small" class="option-btn"
                                                :disabled="voteShow==true"
                                                @click="voteBtn(item.id,1)">赞成</van-button>
                                </span>
                                    <span v-if="itemActive.option == item.id && itemActive.opt !='1'">
                                      <van-button type="primary" size="small" plain class="option-btn"
                                                  :disabled="voteShow==true"
                                                  @click="voteBtn(item.id,1)">赞成</van-button>
                                </span>

                                </div>
                                <div class="option-box">
                                 <span v-if="itemActive.option == item.id && itemActive.opt =='2' ">
                                    <van-button type="danger" size="small" class="option-btn"
                                                :disabled="voteShow==true"
                                                @click="voteBtn(item.id,2)">反对</van-button>
                                </span>
                                    <span v-if="itemActive.option == item.id && itemActive.opt !='2'">
                                      <van-button type="danger" size="small" plain class="option-btn"
                                                  :disabled="voteShow==true"
                                                  @click="voteBtn(item.id,2)">反对</van-button>
                                </span>
                                </div>
                                <div class="option-box">
                                 <span v-if="itemActive.option == item.id && itemActive.opt =='0' ">
                                    <van-button type="warning" size="small" class="option-btn"
                                                :disabled="voteShow==true"
                                                @click="voteBtn(item.id,0)">弃权</van-button>
                                </span>
                                    <span v-if="itemActive.option == item.id && itemActive.opt !='0'">
                                      <van-button type="warning" size="small" plain class="option-btn"
                                                  :disabled="voteShow==true"
                                                  @click="voteBtn(item.id,0)">弃权</van-button>
                                </span>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="submitBtn">
                <van-button type="primary"
                            :disabled="voteShow==true"
                            @click="submitBtn">
                            提交投票
                </van-button>
                <van-button type="default" style="margin-left: 50px" @click="returnBtn">返回列表</van-button>
            </div>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import {Toast} from 'vant';

    export default {
        name: "voteInfo",
        data() {
            return {
                //投票
                num: 3,
                info: '',
                startTime: '',
                expiryTime: '',
                voteOption: [],
                optionActive: [],
                //验证是否已经投票
                voteShow: false,
                optionSelection: [],

            }
        },
        mounted() {
            this.info = this.$route.params.info
            let that = this
            let that1 = this
            let array=[]

            let cnt = {
                voteId: this.info.id,
            };
            this.$util.call('/vote/getVoteOptions',cnt,function (res) {
                that.voteOption = JSON.parse(res.data.c)
                for (let i = 0; i < that.voteOption.length; i++) {
                    let obj = {
                        option: that.voteOption[i].id,
                        opt: '0'
                    }
                    array.push(obj)
                }
                that.optionActive = array

                //获取用户选票
                let userId = JSON.parse(localStorage.getItem('userInfo')).id
                let cnt1 = {
                    voteId: that.info.id,
                    userId: userId,
                };
                that.$util.call('/vote/getVoteTicket',cnt1,function (res) {
                    if (res.data.c == 'null') {
                        that1.voteShow = false
                    } else if (res.data.rc == 'succ' && res.data.c != 'null') {
                        console.log(res.data)
                        that1.optionSelection = JSON.parse(JSON.parse(res.data.c).selection)
                        for (let i = 0; i < that.optionSelection.length; i++) {
                            if (that1.optionSelection.opt != '0') {
                                that1.voteShow = true           //已经投票，并且不是弃权票
                                break
                            }
                        }
                    } else {
                        that1.voteShow = false
                    }
                    if(that1.voteShow == true){     //更改默认选中
                        that1.optionActive = that1.optionSelection
                    }
                })
            })
            let time = new Date(this.info.startTime)
            let time1 = new Date(this.info.startTime)
            this.startTime = time.toLocaleDateString() + ' ' + time.toLocaleTimeString('chinese', {hour12: false})
            this.expiryTime = time1.toLocaleDateString() + ' ' + time1.toLocaleTimeString('chinese', {hour12: false})
        },
        components: {
            HeaderBox
        },
        methods: {
            returnBtn(){
              this.$router.go(-1)
            },
            //单选逻辑
            renounceBtn(id, opt) {
                for (let i = 0; i < this.optionActive.length; i++) {
                    if (this.optionActive[i].option == id) {
                        this.optionActive[i].opt = opt
                    } else {
                        this.optionActive[i].opt = '0'
                    }
                }
            },

            //多选逻辑
            voteBtn(id, opt) {
                let nums = this.info.choiceCount  //可以选中的个数
                let count = 0  //已经选中的个数
                for (let j = 0; j < this.optionActive.length; j++) {
                    if (this.optionActive[j].opt != '0') {
                        count = count + 1
                    }
                }
                if (count >= nums && opt == '0') {
                    for (let i = 0; i < this.optionActive.length; i++) {
                        if (this.optionActive[i].option == id) {
                            this.optionActive[i].opt = opt
                        }
                    }
                    console.log(this.optionActive)
                } else if (count >= nums && opt != '0') {

                    Toast.fail('只能选择不超过 ' + nums + '个 的选项');
                } else {
                    for (let i = 0; i < this.optionActive.length; i++) {
                        if (this.optionActive[i].option == id) {
                            this.optionActive[i].opt = opt
                        }
                    }
                    console.log(this.optionActive)
                }

            },
            submitBtn() {

                let that = this
                let voteId = this.info.id
                let userId = JSON.parse(localStorage.getItem('user')).id
                let selections = JSON.stringify(this.optionActive)
                let weight = JSON.parse(localStorage.getItem('user')).weight
                let remark = '无'

                let cnt = {
                    voteId: voteId,
                    userId: userId,
                    selections: selections,
                    weight: weight,
                    remark: remark,
                };
                this.$util.call('/vote/vote',cnt,function (res) {
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        Toast.success('投票成功')
                        that.$router.push('/vote')
                    } else {
                        Toast.success('投票失败')
                        that.$router.push('/vote')
                    }
                })

            },
        },
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
        margin-top: 2rem;
        width: 100%;
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
</style>
