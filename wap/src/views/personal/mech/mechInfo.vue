<template>
    <div>
        <header-box title="组织信息"></header-box>
        <div class="main-box">
            <van-cell-group>
                <van-field
                        v-model="info.name"
                        label="机构名称："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.address"
                        label="机构地址："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />
                <van-field
                        v-model="info.shareAmount"
                        label="机构股份："
                        type="textarea"
                        disabled
                        rows="1"
                        autosize
                />

            </van-cell-group>
            <div class="item-box">
                <div class="item-title">
                    集体经济代码证书:
                </div>
                <div class="item-img">
                    <img :src="info.imgOrg" alt="">
                </div>
            </div>
            <div class="item-box">
                <div class="item-title">
                    集体经济授权证书:
                </div>
                <div class="item-img">
                    <img :src="info.imgAuth" alt="">
                </div>
            </div>
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
        name: "mechInfo",
        components:{
            HeaderBox
        },
        data(){
            return{
                info:'',
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

            let cnt = {
                orgId:orgId
            }
            this.$api.getORGById(cnt, (res)=> {
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.info = JSON.parse(res.data.c)
                }
                console.log(this.info)
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
