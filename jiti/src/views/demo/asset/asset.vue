<template>
      <div class="box">
          <el-row>
              <div class="list-box">
                  <div class="item-box" @click="assetListBtn(item.groupId)" v-for="(item,index) in list"> {{item.keyword}}</div>
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
        name: "asset",
        data(){
            return{
                list:[]
            }
        },
        methods:{
            assetListBtn(groupId){
                localStorage.setItem('groupId',groupId)
                this.$router.push('/demoAssetList')
            },
            page(){
                this.$router.push('/demoDashboard')
            }
        },
        mounted(){
            let that = this
            this.$demo.getGroup({},function (res) {
                that.list = JSON.parse(res.data.c)
                console.log(that.list)

                let obj = {
                    keyword:'组织资产',
                    groupId:102
                }
                that.list.unshift(obj)

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
        .pageBtn{
            width: auto;
            height: 5rem;
            margin-top: 5rem;
        }
</style>
