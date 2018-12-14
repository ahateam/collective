<template>
    <div>
        <header-box title="发起表决"></header-box>
        <div class="main-box">
            <van-cell-group>
                <van-field
                        v-model="voteTitle"
                        label="表决标题"
                        type="textarea"
                        placeholder="请输入表决标题"
                        rows="1"
                        autosize
                />

                <van-field
                        v-model="voteText"
                        label="表决内容"
                        type="textarea"
                        placeholder="请输入表决内容信息"
                        rows="1"
                        autosize
                />


                <van-field
                        v-model="voteTimeStart"
                        label="起始时间"
                        type="text"
                        placeholder="请选择表决开始时间"
                        @click="time"
                />
                <van-field
                        v-model="voteTimeEnd"
                        label="结束时间"
                        type="text"
                        placeholder="请选择表决结束时间"
                        @click="time1"
                />
            </van-cell-group>

            <div class="create-btn" @click="createBtn">发起表决</div>
        </div>
        <!--开始时间弹出层-->
        <van-popup v-model="show" position="bottom">
            <van-datetime-picker
                    type="datetime"
                    @confirm="confirmBtn"
                    @cancel="cancelBtn"
                    :min-date="minDate"
            />
        </van-popup>
        <!--结束时间弹出层-->
        <van-popup v-model="show1" position="bottom">
            <van-datetime-picker
                    type="datetime"
                    @confirm="confirmBtn1"
                    @cancel="cancelBtn1"
                    :min-date="minDate"
            />
        </van-popup>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant';
    export default {
        name: "voteCreate",
        components: {
            HeaderBox
        },
        data() {
            return {
                show: false,
                show1:false,
                voteTitle: '',
                voteTimeStart:'',
                voteText: '',
                currentDate: '',
                minDate: new Date(),
                voteTimeEnd:'',
            }
        },
        methods: {
            time() {
                this.show = true
            },
            time1(){
                this.show1 = true
            },
            confirmBtn(data){
                this.voteTimeStart = data.toLocaleDateString()+' '+ data.toLocaleTimeString('chinese',{hour12:false})
                this.show = false
            },
            cancelBtn(){
                this.show=false
            },
            confirmBtn1(data){
                this.voteTimeEnd = data.toLocaleDateString()+' '+ data.toLocaleTimeString('chinese',{hour12:false})
                this.show1 = false
            },
            cancelBtn1(){
                this.show1=false
            },
            createBtn(){
                if(this.voteTitle == '' || this.voteTimeStart == '' || this.voteText == ''  || this.voteTimeEnd == ''){
                    Toast.fail('表决信息不完整')
                }else{
                    Toast.success('创建表决成功')
                    this.$router.push('/home')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .create-btn{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 1rem;
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
</style>
