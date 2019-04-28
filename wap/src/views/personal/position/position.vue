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
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多用户了"
                        @load="onLoad"
                >
                    <div class="list" v-for="(item,index) in list" :key="index" @click="Btn(item)">
                            <div class="list-name">
                              {{item.user.realName}}
                            </div>
                            <div class="list-info">
                                {{item.user.idNumber}}
                            </div>

                    </div>
                </van-list>

            </div>
            <div class="box4" v-else>
                暂无用户信息
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
              list:[],
              finished:false,
              loading:false,
              offset:0,
              count:10,
              page:1,


          }
        },
        methods:{

            //分页
            onLoad(){
                setTimeout(()=>{
                    if(this.finished == false){
                        if(this.searchData !=''){
                            let data = this.searchData.substr(0,1)
                            this.page = this.page+1

                            if(isNaN(data) == false){   //输入身份证的分页
                                let orgId = JSON.parse(localStorage.getItem('user')).orgId
                                let cnt = {
                                    orgId:orgId,
                                    idNumber:this.searchData,
                                    count:this.count,
                                    offset:(this.page-1)*this.count
                                }
                                this.$api.getORGUsersLikeIDNumber(cnt, (res)=> {
                                    let arr = []
                                    if(res.data.rc == this.$util.RC.SUCCESS){
                                        arr= this.$util.tryParseJson(res.data.c)
                                    }else{
                                        arr = []
                                        this.finished = true
                                    }
                                    this.list = this.list.concat(arr)
                                    if(arr.length <this.count){
                                        this.finished = true
                                    }
                                })
                                this.loading = false
                            }else{          //输入姓名的分页
                                let orgId = JSON.parse(localStorage.getItem('user')).orgId
                                let cnt = {
                                    orgId:orgId,
                                    realName:this.searchData,
                                    count:this.count,
                                    offset:(this.page-1)*this.count
                                }
                                this.$api.getORGUsersLikeRealName(cnt, (res)=> {
                                    let arr = []
                                    if(res.data.rc == this.$util.RC.SUCCESS){
                                        arr= this.$util.tryParseJson(res.data.c)
                                    }else{
                                        arr = []
                                        this.finished = true
                                    }
                                    this.list = this.list.concat(arr)
                                    if(arr.length <this.count){
                                        this.finished = true
                                    }
                                })
                                this.loading = false
                            }
                        }
                    }else {
                        this.loading = false
                    }

                },300)


            },


            onSearch(){
                this.page = 1
                this.loading = false
                this.finished = false
                this.list = []

                if(this.searchData != ''){
                    let data = this.searchData.substr(0,1)
                    console.log(data);
                    if(isNaN(data) == false){
                        let orgId = JSON.parse(localStorage.getItem('user')).orgId
                        let cnt = {
                            orgId:orgId,
                            idNumber:this.searchData,
                            count:this.count,
                            offset:this.offset
                        }
                        this.$api.getORGUsersLikeIDNumber(cnt, (res)=> {
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                this.list = this.$util.tryParseJson(res.data.c)
                            }else{
                                this.list = []
                            }
                        })
                    }else{
                        let orgId = JSON.parse(localStorage.getItem('user')).orgId
                        let cnt = {
                            orgId:orgId,
                            realName:this.searchData,
                            count:this.count,
                            offset:this.offset
                        }

                        this.$api.getORGUsersLikeRealName(cnt, (res)=> {
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                this.list = this.$util.tryParseJson(res.data.c)
                            }else{
                                this.list = []
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
    .box4{
        width: auto;
        height: 4rem;
        line-height: 4rem;
        color: #666;
        font-size: 1.6rem;
        text-align: center;
    }
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
