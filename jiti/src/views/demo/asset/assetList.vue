<template>
    <div class="box">
        <el-row>
            <div class="list-box">
                <div class="item-box" @click="assetInfo(item.id)" v-for="(item,index) in assetlist">
                    <div class="title">
                        {{item.name}}
                    </div>
                </div>

            </div>
        </el-row>

       <el-row>
           <div class="pageBtn">
               <el-button type="primary" @click="page" style="float: right;margin-right: 10rem">上一页</el-button>
           </div>
       </el-row>
    </div>
</template>

<script>
    export default {
        name: "assetList",
        data(){
            return{
                assetlist:[],
            }
        },
        methods:{
            assetInfo(index){
                localStorage.setItem('assetId',index)
                this.$router.push('/demoAssetInfo')
            },
            page(){
                this.$router.push('/demoAsset')
            }
        },
        mounted(){
            if(localStorage.getItem('groupId') == ''){
                this.$message.error('请选择一个分组')
            }else{
                localStorage.setItem('assetId','')
                let groups = [localStorage.getItem('groupId')]
                let cnt={
                    groups:groups
                }
                this.$demo.getAsset(cnt, (res)=> {
                  this.assetlist = this.$util.tryParseJson(res.data.c)
                })
            }

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
        width: 21.3rem;
        height: 12rem;
        background: #5cb85c;
        border-radius: 25px;
        color: #fff;
        font-size: 2rem;

        overflow:hidden;
        margin-top: 2rem;
        margin-left: 2rem;


        cursor: pointer;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .pageBtn{
        width: auto;
        height: 5rem;
        margin-top: 5rem;
    }
    .title{
        width: 19rem;
        height: 6rem;
        margin: 3rem 1rem;
        line-height: 3rem;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;

    }
</style>
