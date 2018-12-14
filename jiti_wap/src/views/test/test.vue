<template>
    <div>

        <div class="main-box" style="width: 80%;margin:  0 auto">
                <div class="address">
                    接口：
                </div>
                <div class="address-data">
                    <input type="text" class="input" v-model="apiAddress">
                </div>
                <div class="address" style="margin-top: 5rem">
                    输出：
                </div>
                <div class="address-data" style="border: 1px solid #ddd;padding:4rem;margin-top: 5rem">
                    {{requestData}}
                </div>
               <div style="width:100%;margin-top:4rem" >
                   <van-button type="primary" size="large" @click="Btn">发送请求</van-button>
               </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                apiAddress:'',
                requestData:''
            }
        },
        methods:{
            Btn(){
                let that = this
                let cnt = {
                    id:'1111233'
                }
                this.$util.call(this.apiAddress,cnt,function (res) {
                    that.requestData = res
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .address{
        float: left;
        height: 4rem;
        width: 20%;
        line-height: 4rem;
        font-size: 2rem;
    }
    .address-data{
        margin-left: 20%;
        height: 4rem;
    }
    .input{
        width: 100%;
        height: 3rem;
        margin-top: .5rem;
        font-size: 1.6rem;
    }
</style>
