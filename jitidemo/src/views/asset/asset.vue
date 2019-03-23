<template>
      <div class="box">
            <div class="list-box">

                <div class="item-box" @click="assetListBtn(item.groupId)" v-for="(item,index) in list"> {{item.keyword}}</div>

            </div>

      </div>
</template>

<script>
    export default {
        name: "asset",
        data(){
            return{
                list:[]
            }
        },
        methods:{
            assetListBtn(groupId){
                localStorage.setItem('groupId',groupId)
                this.$router.push('/assetList')
            }
        },
        mounted(){
            let that = this
            this.$api.getGroup({},function (res) {
                that.list = JSON.parse(res.data.c)
            })

            localStorage.setItem('groupId','')
            localStorage.setItem('assetId','')
        }
    }
</script>

<style scoped lang="scss">
        .box{
            width: 100%;
            height: 100%;
            padding: 20px 0;
        }
        .list-box{
            padding: 0 2rem;
        }
        .item-box{
            float: left;
            width: 16rem;
            height: 9rem;
            background: #33cccc;
            border-radius: 25px;
            color: #fff;
            font-size: 2rem;

            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin-top: 2rem;
            margin-left: 2rem;

            text-align: center;
            line-height: 9rem;

            cursor: pointer;

            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
        }

</style>
