<template>
    <div>
        <header-box title="职务管理"></header-box>
        <div class="main-box">
            <div class="search-box">
                <van-search
                        v-model="searchData"
                        placeholder="请输入搜索用户的身份证/生日/姓名"
                        show-action
                        @search="onSearch"
                        style="margin-top: 1rem;height: 5rem"
                >
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </div>
            <div class="box3"  v-if="list.length>0">
                <div class="list" v-for="(item,index) in list" :key="index" @click="Btn(item)">
                        <div class="list-name">
                          {{item.realName}}
                        </div>
                        <div class="list-info">
                            {{item.idNumber}}
                        </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "position",
        components:{
            HeaderBox
        },
        data(){
          return{
              searchData:'',
              list:[]
          }
        },
        methods:{
            onSearch(){
                let that = this



                if(this.searchData != ''){
                    let data = this.searchData.substr(0,1)
                    console.log(data);
                    if(isNaN(data) == false){
                        let orgId = JSON.parse(localStorage.getItem('user')).orgId
                        let count = 100
                        let offset = 0
                        let cnt = {
                            orgId:orgId,
                            idNumber:this.searchData,
                            count:count,
                            offset:offset
                        }
                        this.$api.getORGUsersLikeIDNumber(cnt,function (res) {
                            if(res.data.rc == that.$util.RC.SUCCESS){
                                that.list = JSON.parse(res.data.c)
                                console.log(that.list)
                            }
                        })
                    }else{
                        let orgId = JSON.parse(localStorage.getItem('user')).orgId
                        let count = 100
                        let offset = 0
                        let cnt = {
                            orgId:orgId,
                            realName:this.searchData,
                            count:count,
                            offset:offset
                        }

                        this.$api.getORGUsersLikeRealName(cnt,function (res) {
                            if(res.data.rc == that.$util.RC.SUCCESS){
                                that.list = JSON.parse(res.data.c)
                                console.log(that.list)
                            }
                        })
                    }




                }
            },
            Btn(item){
                // console.log(item)
                localStorage.setItem('userPosition',JSON.stringify(item))
                this.$router.push('/positionSet')

            }
        },
        mounted(){
            localStorage.setItem('userPosition','')
        }

    }
</script>

<style scoped lang="scss">
    .main-box{
        width: 100%;
        height: 100%;
    }
    .search-box{

        margin: 0 auto;

    }
    .box3{
        width: 88%;
        background: #fff;
        margin: 0 auto;

    }
    .list{
        width: auto;
        height: 4rem;
        padding: 0 1rem;
        margin-top: .2rem;
        background: #fff;
        border-bottom: 1px solid #ddd;
    }
    .list-name{
        float: left;
        width: 8rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
        color: #333;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .list-info{
        width: auto;
        margin-left: 8rem;
        height: 4rem;
        text-align: right;
        line-height: 4rem;
        color: #666;
        font-size: 1.4rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>
