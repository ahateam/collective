<template>
    <div>
        <header-box title="参会人员"></header-box>
        <div class="main-box">

            <div>
                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell
                                v-for="(item,index) in list"
                                clickable
                                :key="item"
                                :title="` ${item}`"
                                @click="toggle(index)"
                        >
                            <van-checkbox :name="item" ref="checkboxes"/>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </div>

            <div class="subBtn" @click="nextBtn">
                下一步
            </div>
           <router-link to="/meetAdd">
               <div class="choose-btn" >上 一 页</div>
           </router-link>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import {Toast} from 'vant';

    export default {
        name: "meetAdd",
        components: {
            HeaderBox,
        },
        data() {
            return {
                list: ['全部选中', '股东成员', '董事会成员', '监事会成员', '董事监事会成员'],
                result: [],
                cntData: '',
                crowd: -1,
                userInfo:''
            }
        },
        methods: {
            toggle(index) {
                if (index == 0) {
                    if(this.crowd != 0){
                        this.crowd = 0
                        this.result = ['全部选中','股东成员', '董事会成员', '监事会成员','董事监事','董事监事会成员']
                    }else{
                        this.crowd = -1
                        this.result = []
                    }
                } else {
                    this.result = []
                    this.crowd = index
                    this.result.push(this.list[index])
                }
            },
            nextBtn() {
                let that = this
                console.log(localStorage.getItem('user'))
                if (this.crowd == -1) {
                    Toast.fail('请选择参会人员')
                } else {
                    let cnt = {
                        orgId : this.userInfo.orgId,
                        userId : this.userInfo.id,
                        crowd : this.crowd,
                        reeditable: false,
                        realName:true,
                        isInternal:true,
                        title:this.cntData.title,
                        remark:this.cntData.remark,
                        startTime:this.cntData.startTime.getTime(),
                        expiryTime:this.cntData.expiryTime.getTime()
                    }
                    this.$util.call('/vote/createVoteProject',cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            let vote = {
                                meetId:JSON.parse(res.data.c).id
                            }
                            localStorage.setItem('voteInfo',JSON.stringify(vote))
                            that.$router.push('/meetChoose')
                        }else{
                            Toast.fail('新增失败')
                            that.$router.push('/meetAdd')
                        }

                    })
                }
            }
        },

        mounted() {
            this.cntData = this.$route.params.cnt
            this.userInfo = JSON.parse(localStorage.getItem('user'))
            if(this.$route.params.cnt == null){
                Toast.fail('信息失效，重新填写')
                this.$router.push('/meetAdd')
            }
        }
    }
</script>

<style scoped lang="scss">
    .box {
        width: 88%;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
    }

    .subBtn {

        width: 88%;
        margin: 0 auto;
        margin-top: 3rem;
        height: 3rem;
        background: #0086b3;
        color: #fff;
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;

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
