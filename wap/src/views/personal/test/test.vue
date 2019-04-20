<template>
    <div>

        <div class="main-box" style="width: 80%;margin:  0 auto">
             <div>aaa</div>
        </div>
    </div>
</template>

<script>


    import ossAuth from '@/assets/api/oss/ossAuth'

    let client = ossAuth.client
    export default {
        name: "test",
        data(){
            return{
                apiAddress:'',
                requestData:''
            }
        },
        methods:{
            // Btn(){
            //     let that = this
            //     let cnt = {
            //         id:'1111233'
            //     }
            //     this.$util.call(this.apiAddress,cnt,function (res) {
            //         that.requestData = res
            //         console.log(res)
            //     })
            // }
        },
        mounted(){

            async function list(){
                try {
                    let result = await client.list();
                    console.log(result)
                } catch (e) {
                    console.log(e)
                }
            }

            list();


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
