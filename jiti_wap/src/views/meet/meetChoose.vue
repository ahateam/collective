<template>
    <div>
        <header-box title="创建表决"></header-box>
        <div class="main-box">

               <router-link to="/meetAloneVoteAdd">
                   <div class="box" >
                       <div class="box-img">
                           <div class="img-title">
                               <i class="iconfont icon-toubiao"></i>
                           </div>
                       </div>
                       <div class="box-text">
                           <div class="text-title">
                               单选表决
                           </div>
                           <div class="text">
                               创建单选事件表决入口
                           </div>
                       </div>
                   </div>
               </router-link>
                <router-link to="/meetMoreVoteAdd">
                    <div class="box1" >
                        <div class="box-img">
                            <div class="img-title">
                                <i class="iconfont icon-toupiao1"></i>
                            </div>
                        </div>
                        <div class="box-text">
                            <div class="text-title">
                                多选选举
                            </div>
                            <div class="text">
                                创建选举多选事件的入口
                            </div>
                        </div>
                    </div>
                </router-link>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import {Toast} from 'vant';
    export default {
        name: "meetChoose",
        data(){
          return{
              voteInfo:''
          }
        },
        components:{
            HeaderBox
        },
        mounted(){
            this.voteInfo = JSON.parse(localStorage.getItem('voteInfo'))
            if(this.voteInfo == null){
                Toast.fail('请选择会议')
                this.$router.push('/meet')
            }
        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 88%;
        height: 8rem;
        margin: 0 auto;
        margin-top: 3rem;
        border-radius: 5px;
        background:#40c9c6;;
    }
    .box1{
        width: 88%;
        height: 8rem;
        margin: 0 auto;
        margin-top: 3rem;
        border-radius: 5px;
        background:#36a3f7;
    }
    .box-img{
        float: left;
        margin-left: 1rem;
        width: 8rem;
        height: 8rem;

    }
    .box-text{
        width: auto;
        height: 8rem;
        margin-left: 10rem;

    }
    .img-title{
        width: 6rem;
        height:6rem;
        margin-top: 1rem;
        margin-left: 1rem;
    }
    .img-title i{
        font-size: 6rem;
        text-align: center;
        line-height: 6rem;
        color:#fff;
    }

    .text-title{
        width:auto;
        height: 4rem;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #fff;
        font-weight: 600;
        text-align: left;
        padding-right: 1rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .text{
        width: auto;
        height: 4rem;
        text-align: left;
        padding-right: 1rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #fff;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;

    }
    .btn{
        width: 100%;
        height: 4rem;
        margin-top: 2rem;
        line-height: 4rem;
        text-align: center;
    }
</style>
