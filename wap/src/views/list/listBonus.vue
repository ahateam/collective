<template>
    <div>
        <header-box title="财务分红信息"></header-box>
        <div class="main-box">
            <div class="box" v-for="(item,index) in list" :key="index" @click="infoBtn(item)">
                <div class="box-img">
                    <div class="img-title">
                        <i class="iconfont icon-biaoge"></i>
                    </div>
                </div>
                <div class="box-text">
                    {{item.textName}}
                </div>

            </div>

            <div class="btn">
                <router-link to="/home">
                    <div class="create-btn" >返回首页</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant';
    import ossAuth from '@/assets/api/oss/ossAuth'

    let client = ossAuth.client
    export default {
        name: "jiti2",
        components: {
            HeaderBox
        },
        data() {
            return {
                list: '',
            }
        },
        methods: {
            infoBtn(info) {
                this.$router.push({
                    path:'/bonusInfo',
                    name:'bonusInfo',
                    params:{
                        info:info
                    }
                })

            }
        },
        mounted() {
            let orgId = JSON.parse(localStorage.getItem('user')).orgId
            let that = this
            async function list(){
                let prefix = 'fenhong/' + orgId + '/'       //请求的前缀
                try {
                    let result = await client.list({
                        prefix: prefix
                    });
                    let arr = result.objects
                        if (arr.length != 0) {
                                let listData = []
                                for (let i = 0; i < arr.length; i++) {
                                    let obj = {
                                        name: arr[i].name,
                                        url:arr[i].url,
                                        textName: decodeURIComponent(arr[i].name.replace(prefix, ''))
                                    }
                                    listData.push(obj)
                                }
                                that.list = listData
                            }
                } catch (e) {
                    console.log(e)
                       Toast.fail({
                        duration:500,
                        message:'请求出错啦'
                    })
                }
            }
            list();
        }
    }
</script>

<style scoped lang="scss">
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
    .main-box {
        background: #fff;
    }

    .box {
        width: 88%;
        height: 6rem;
        margin: 0 auto;
        margin-top: 1rem;
        border-radius: 5px;
        background: #fff;
        border-bottom: 1px solid #ddd;
    }

    .box-img {
        float: left;
        margin-left: 1rem;
        width: 6rem;
        height: 6rem;

    }

    .box-text {
        width: auto;
        height: 6rem;
        margin-left: 8rem;
        font-size: 1.4rem;
        color: #666;
        line-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;

    }

    .img-title {
        width: 6rem;
        height: 6rem;
    }

    .img-title i {
        width: 6rem;
        height: 6rem;
        font-size: 5rem;
        text-align: center;
        line-height: 6rem;
        color: #40c9c6;
    }

    .text-title {
        width: auto;
        height: 4rem;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #666;
        font-weight: 600;
        text-align: left;
        padding-right: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .text {
        width: auto;
        height: 4rem;
        text-align: left;
        padding-right: 1rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

    }

    .btn {
        width: 100%;
        height: 4rem;
        margin-top: 2rem;
        line-height: 4rem;
        text-align: center;
    }

</style>
