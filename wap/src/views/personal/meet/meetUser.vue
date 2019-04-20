<template>
    <div>
        <header-box title="参会人员"></header-box>
        <div class="main-box">

            <div>
                <!--<van-checkbox-group v-model="result">-->
                    <!--<van-cell-group>-->
                        <!--<van-cell-->
                                <!--v-for="(item,index) in list"-->
                                <!--clickable-->
                                <!--:key="item"-->
                                <!--:title="` ${item}`"-->
                                <!--@click="toggle(index)"-->
                        <!--&gt;-->
                            <!--<van-checkbox :name="item" ref="checkboxes"/>-->
                        <!--</van-cell>-->
                    <!--</van-cell-group>-->
                <!--</van-checkbox-group>-->

                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell
                                v-for="(item,index) in list"
                                clickable
                                :key="index"
                                :title="`${item.val}`"
                                @click="toggle(index)"
                        >
                            <van-checkbox :name="item" ref="checkboxes" />
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
                list: [
                    {
                        key:0,
                        val:'全部选中'
                    },
                    {
                        key:1,
                        val:'股东户代表'
                    },
                    {
                        key:2,
                        val:'股东代表'
                    },
                    {
                        key:3,
                        val:'董事会'
                    },
                    {
                        key:4,
                        val:'监事会'
                    },
                ],
                result: [],
                cntData: '',
                crowd: '',
                status:-1,
                userInfo:''
            }
        },
        methods: {
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
                if(index == 0){
                    if(this.status == -1){
                        this.status = 0
                        this.result = this.list
                    }else{
                        this.status = -1
                        this.result = []
                    }
                }else{
                    if(this.result.length == 4){
                        let _index = -1
                       for(let i =0;i<4;i++){
                           console.log(this.result[i].val)
                           if(this.result[i].val == '全部选中' ){
                               _index = i
                           }
                       }
                       if(_index != -1){
                           this.result.splice(_index,1)
                           this.status = -1
                       }
                    }
                }

                console.log(this.result)
            },


            nextBtn() {
                let that = this
                let arr = []
                for(let i = 0;i<this.result.length;i++){
                    arr.push(this.result[i].key)
                }
                this.crowd = JSON.stringify(arr)
                if (this.crowd == '[]') {
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
