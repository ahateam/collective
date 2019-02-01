<template>
    <div>
        <header-box title="组织资产"></header-box>
        <div class="main-box">
            <van-cell-group>
                <van-field
                        v-model="info.name"
                        label="组织名称："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.capital"
                        label="组织资金："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.debt"
                        label="负债资金："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.receivables"
                        label="债权资金："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.income"
                        label="年毛收入："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.bonus"
                        label="每股分红："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.budget"
                        label="工作预算："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="moreDudget"
                        label="剩余工作预算："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.investment"
                        label="对外投资："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.valuation"
                        label="资产估值："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
            </van-cell-group>

            <router-link to="/list">
                <div class="create-btn" style="background: #4fb338" >查看资产详情</div>
            </router-link>

            <div class="create-btn" @click="returnBtn">切换组织</div>
            <div class="btn">
                <router-link to="/mech">
                    <div class="create-btn1" >返回上页</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "mechMoney",
        components:{
            HeaderBox
        },
        data(){
            return{
                info:'',
                moreDudget:''
            }
        },
        methods:{
            returnBtn(){
                this.$router.push('/choose')
            }
        },
        mounted(){
            console.log('1111')
            let orgId = JSON.parse(localStorage.getItem('user')).orgId
            let that = this
            let cnt = {
                orgId:orgId
            }
            this.$util.call('/org/getORGById',cnt,function (res) {
                if(res.data.rc == that.$util.RC.SUCCESS){
                    that.info = JSON.parse(res.data.c)
                    that.moreDudget =parseInt( that.info.budget)-parseInt(that.info.financialBudget)
                }
                console.log(that.info)
            })
        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: #fff;
    }
    .item-box{
        padding: 10px 15px;
        text-align: left;
        line-height: 3rem;
        font-size: 1.4rem;
        line-height: 3rem;
        height: auto;
    }
    .item-title{
        width: auto;
    }
    .item-img {
        padding: 10px 15px;
        width: auto;
        height: 15rem;
    }
    .item-img img{
        width: 20rem;
        height: 15rem;
    }
    .create-btn{
        width: 90%;
        height: 3rem;
        margin:2rem auto;
        border-radius: 25px;
        background:rgb(244, 81, 108);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .create-btn1{
        width: 90%;
        height: 3rem;
        margin:1rem auto 3rem auto;
        border-radius: 25px;
        background:rgb(125,177,253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
</style>
