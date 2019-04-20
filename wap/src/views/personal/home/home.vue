<template>
    <div>
        <home-header></home-header>
        <div class="main-box">
            <div class="nav-box">
                <div class="nav-img-box"  @click="userBtn">
                    <div class="nav-user-img">
                        <img src="../../../assets/image/headImage.png" alt="">
                    </div>
                    <div class="nav-user-info">
                        <div class="nav-user-name">
                            {{realName}}
                        </div>
                        <div class="nav-user-tell">
                            {{mobile}}
                        </div>
                        <div class="nav-user-card">
                            {{idNumber}}
                        </div>
                    </div>

                </div>
                <!--<div class="nav-lable-box">-->
                    <!--<div class="nav-item-box"  @click="userBtn">-->
                        <!--<div class="nav-item-title">机构职务</div>-->
                        <!--<div class="nav-item-content">{{userPost}}</div>-->
                    <!--</div>-->
                    <!--<div class="nav-item-box"  @click="userBtn">-->
                        <!--<div class="nav-item-title">股份数</div>-->
                        <!--<div class="nav-item-content">{{shareAmount}}</div>-->
                    <!--</div>-->
                    <!--<router-link to="/voteMeet">-->
                        <!--<div class="nav-item-box">-->
                            <!--<div class="nav-item-title">进行中会议</div>-->
                            <!--<div class="nav-item-content">{{startedNums}}</div>-->
                        <!--</div>-->
                    <!--</router-link>-->
                <!--</div>-->
            </div>
            <div class="item">
                <!--<router-link to="/voteMeet">-->
                    <!--<div class="item-box">-->
                        <!--<div class="img-box1">-->
                            <!--<div class="i-box">-->
                                <!--<van-icon name="idcard"/>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="text-box">-->
                            <!--<div class="item-text">-->
                                <!--我的会议-->
                            <!--</div>-->
                            <!--<div class="item-next">-->
                                <!--<van-icon name="arrow"/>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</router-link>-->
                <router-link to="/poll">
                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                我的投票
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link to="/list">
                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box" style="background: rgb(54, 163, 247)">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                集体资产
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>

                    </div>
                </router-link>
                <router-link to="/listBonus">
                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box" style="background: #ff976a">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                我的分红
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>
                    </div>
                </router-link>

                <router-link to="/mech">
                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box" style="background: rgb(244, 81, 108)">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                我的机构
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>
                    </div>
                </router-link>
                <!--<router-link to="/article">-->
                    <!--<div class="item-box">-->
                        <!--<div class="img-box1">-->
                            <!--<div class="i-box" style="background: rgb(244, 81, 108)">-->
                                <!--<van-icon name="idcard"/>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="text-box">-->
                            <!--<div class="item-text">-->
                                <!--通知公告-->
                            <!--</div>-->
                            <!--<div class="item-next">-->
                                <!--<van-icon name="arrow"/>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</router-link>-->

               <div v-if="root == true">
                   <router-link to="/meet">
                       <div class="item-box">
                           <div class="img-box1">
                               <div class="i-box" style="background: #E6A23C">
                                   <van-icon name="idcard"/>
                               </div>
                           </div>
                           <div class="text-box">
                               <div class="item-text">
                                   会议管理
                               </div>
                               <div class="item-next">
                                   <van-icon name="arrow"/>
                               </div>
                           </div>
                       </div>
                   </router-link>
                   <router-link to="/position">
                       <div class="item-box">
                           <div class="img-box1">
                               <div class="i-box" style="background: #ff976a">
                                   <van-icon name="idcard"/>
                               </div>
                           </div>
                           <div class="text-box">
                               <div class="item-text">
                                   职务管理
                               </div>
                               <div class="item-next">
                                   <van-icon name="arrow"/>
                               </div>
                           </div>
                       </div>
                   </router-link>
                   <router-link to="/file">
                       <div class="item-box">
                           <div class="img-box1">
                               <div class="i-box" style="background: #4cae4c">
                                   <van-icon name="idcard"/>
                               </div>
                           </div>

                           <div class="text-box">
                               <div class="item-text">
                                   文件管理
                               </div>
                               <div class="item-next">
                                   <van-icon name="arrow"/>
                               </div>
                           </div>
                       </div>
                   </router-link>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HomeHeader from '@/components/head/homeHeader'

    export default {
        name: "home",
        components: {
            HomeHeader
        },
        data() {
            return {
                userInfo: '',


                started: [],
                realName: '',
                mobile:'',
                idNumber:'',
                shareAmount:'',
                userPost:'',
                startedNums:0,
                root:false,
            }
        },
         methods:{
             userBtn(){
                 this.$router.push('/user')
             }
         }  ,
        created(){
            localStorage.setItem('voteInfo', '')  //新增表决所需全局变量
            localStorage.setItem('vote','')     //用户表决所需的全局变量
            let userObj = JSON.parse(localStorage.getItem('userInfo'))  //只有用户信息
            let orgObj =  JSON.parse(localStorage.getItem('orgInfo'))   //只有用户的组织信息

            let user = Object.assign(userObj,orgObj)
            localStorage.setItem('user',JSON.stringify(user))

        },
            mounted() {


                this.userInfo = JSON.parse(localStorage.getItem('user'))



                this.realName = this.userInfo.realName
                this.mobile = this.userInfo.mobile
                this.idNumber = this.userInfo.idNumber
                this.shareAmount = this.userInfo.shareAmount

                this.userPost = '暂无职务'

           //管理员权限
           if(this.userInfo.realName == 'root'){
                this.root = true
           }
           console.log(this.userInfo.realName)
        }
    }

</script>

<style scoped lang="scss">

    .nav-box {
           width: 100%;
           height: 14rem;
           background-image: url("../../../assets/image/banner.jpg");
           background-position: center;
           background-size: cover;
       }
    .nav-img-box{
        width: auto;
        height: 8rem;
        padding:2rem 1rem 1rem 1rem;
        cursor: pointer;
    }
    .nav-user-img{
        float: left;
        margin-left: 3rem;
        margin-top: 1.5rem;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .nav-user-img img{
        width:6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .nav-user-info{
        margin-left: 12rem;
        width: auto;
        height: 8rem;

    }
    .nav-user-name{
        margin-top: 1rem;
        width: 100%;
        height:3rem;
        color: #fff;
        font-size: 1.6rem;
        line-height: 3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .nav-user-tell{
        width: 100%;
        height:2rem;
        color: #fff;
        font-size: 1.6rem;
        line-height: 2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .nav-user-card{
        width: 100%;
        height:3rem;
        color: #fafafa;
        font-size: 1.4rem;
        line-height: 3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .nav-lable-box{
        width:auto;
        height: 5rem;
        padding: 0 1rem ;
    }
    .nav-item-box{
        float: left;
        width: 33%;
        height: 5rem;
        cursor: pointer;
    }
    .nav-item-title{
        margin-top: .3rem;
        width: 100%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #eee;
    }
    .nav-item-content{
        width: 100%;
        height: 2rem;
        text-align: center;
        font-size: 1.4rem;
        line-height: 2rem;
        color: #fff;
    }



    .img-box {
        position: absolute;
        top: 20%;
        left: 50%;
        margin-left: -3rem;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
    }

    .img-box img {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
    }

    .nav-text {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        margin-left: -13rem;
        width: 12rem;
        height: 2.5rem;
        background: #a4fe00;
        border-radius: 25px;
        text-align: center;
        line-height: 2.5rem;
        color: #666;
    }

    .nav-text1 {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        margin-left: 1rem;
        width: 12rem;
        height: 2.5rem;
        background: #f0fe46;
        border-radius: 25px;
        text-align: center;
        line-height: 2.5rem;
        color: #666;
    }

    .item-box {
        width: 100%;
        height: 5rem;
        margin: 1rem 0;
        border-bottom: 1px solid #ddd;
    }

    .img-box1 {
        float: left;
        width: 5rem;
        height: 5rem;
    }

    .text-box {
        margin-left: 5rem;
        width: auto;
        height: 5rem;
    }

    .i-box {
        width: 3rem;
        height: 3rem;
        margin: 1rem;
        border-radius: 5px;
        background: #40c9c6;
        text-align: center;
        line-height: 3rem;
    }

    .i-box i {
        font-size: 1.6rem;
        line-height: 3rem;
        color: #fff;

    }

    .item-text {
        float: left;
        width: 80%;
        height: 5rem;
        margin-left: 3%;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #333;

    }

    .item-next {
        float: right;
        width: 15%;
        height: 5rem;
        margin-left: 2%;
        line-height: 5rem;
        text-align: center;
    }

    .item-next i {
        font-size: 1.6rem;
        color: #666;
    }
</style>
