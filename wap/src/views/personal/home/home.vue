<template>
    <div>
        <home-header></home-header>
        <div class="main-box">
            <div class="nav-box">
                <van-swipe :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item,index) in swiperData" :key="index" >
                        <img :src="item.image" alt="" style="width: 100%;height: 20rem " @click="checkBtn(item)">
                    </van-swipe-item>
                </van-swipe>
                <span v-if="list.length>0">
                     <van-notice-bar
                             v-if="newNotice.type !=2"
                             :text="newNotice.title+' '+newNotice.content"
                             @click="jumpBtn(newNotice)"
                             left-icon="volume-o"
                     />
                    <van-notice-bar
                            v-if="newNotice.type ==2"
                            :text="newNotice.title"
                            left-icon="volume-o"
                            @click="jumpBtn(newNotice)"
                    />
                </span>
            </div>
                <div :class=" list.length>0?'item box-top':'item' " >

                    <router-link to="/poll">
                        <div class="item-box">
                            <div class="img-box1">
                                <div class="i-box">
                                    <i class="iconfont icon-toupiao1"></i>
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
                                    <i class="iconfont icon-tongyongzichan"></i>
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
                                    <i class="iconfont icon-qian"></i>
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
                                <div class="i-box" style="background: #5bc0de">
                                    <i class="iconfont icon-jigou"></i>
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

                    <router-link to="/noticeList">
                        <div class="item-box">
                            <div class="img-box1">
                                <div class="i-box" style="background: #f0ad4e">
                                    <i class="iconfont icon-gonggao1"></i>
                                </div>
                            </div>
                            <div class="text-box">
                                <div class="item-text">
                                    我的公告
                                </div>
                                <div class="item-next">
                                    <van-icon name="arrow"/>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <router-link to="/examine">
                        <div class="item-box">
                            <div class="img-box1">
                                <div class="i-box" style="background: rgb(244, 81, 108)">
                                    <i class="iconfont icon-shenpi"></i>
                                </div>
                            </div>
                            <div class="text-box">
                                <div class="item-text">
                                    我的审批
                                </div>
                                <div class="item-next">
                                    <van-icon name="arrow"/>
                                </div>
                            </div>
                        </div>
                    </router-link>




                    <div v-for="(item,index) in userInfo.permissions" v-if="userInfo.permissions.length>0" :key="index">
                        <div v-if="item.id !=undefined &&item.id == addVoteId">
                            <router-link to="/voteManage">
                                <div class="item-box">
                                    <div class="img-box1">
                                        <div class="i-box" style="background: #337ab7">
                                            <i class="iconfont icon-toupiao2"></i>
                                        </div>
                                    </div>
                                    <div class="text-box">
                                        <div class="item-text">
                                            发起投票
                                        </div>
                                        <div class="item-next">
                                            <van-icon name="arrow"/>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div v-if="item.id !=undefined &&item.id == editPostId">
                            <router-link to="/position">
                                <div class="item-box">
                                    <div class="img-box1">
                                        <div class="i-box" style="background: #ff976a">
                                            <i class="iconfont icon-nav_user"></i>
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



                        </div>
                    </div>

                    <router-link to="/user">
                        <div class="item-box">
                            <div class="img-box1">
                                <div class="i-box" style="background:#ff976a">
                                    <i class="iconfont icon-fl-renyuan"></i>
                                </div>
                            </div>
                            <div class="text-box">
                                <div class="item-text">
                                    个人信息
                                </div>
                                <div class="item-next">
                                    <van-icon name="arrow"/>
                                </div>
                            </div>
                        </div>
                    </router-link>


                    <!--<router-link to="/file">-->
                    <!--<div class="item-box">-->
                    <!--<div class="img-box1">-->
                    <!--<div class="i-box" style="background: #4cae4c">-->
                    <!--<van-icon name="idcard"/>-->
                    <!--</div>-->
                    <!--</div>-->

                    <!--<div class="text-box">-->
                    <!--<div class="item-text">-->
                    <!--文件管理-->
                    <!--</div>-->
                    <!--<div class="item-next">-->
                    <!--<van-icon name="arrow"/>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</router-link>-->

                </div>

        </div>
    </div>
</template>

<script>

    import HomeHeader from '@/components/head/homeHeader'
    /** 在 index.html 进行全局引入广告列表*/
    const swiperData = window.globalConfig.swiperData

    export default {
        name: "home",
        components: {
            HomeHeader,
        },
        data() {
            return {
                //权限
                addVoteId:'',       //发起投票
                editPostId:'',      //修改职务


                userInfo: '',


                started: [],
                realName: '',
                mobile:'',
                idNumber:'',
                shareAmount:'',
                userPost:'',
                startedNums:0,
                root:false,

                swiperData:[],
                list:[],
                newNotice:{}
            }
        },
         methods:{
             checkBtn(item){
                 this.$commen.jumpUrl(item.url)
             },

             getNoticeByRoleGroup(cnt){
                 this.$api.getNoticeByRoleGroup(cnt,(res)=>{
                     let arr = []
                     if(res.data.rc == this.$util.RC.SUCCESS){
                         arr = this.$util.tryParseJson(res.data.c)
                     }else{
                         arr = []
                     }
                     this.list = this.list.concat(arr)
                    if(this.list.length == 0){
                        this.newNotice = []
                    }else{
                        this.newNotice =   this.list[this.list.length-1]
                    }
                 })
             },
             getNotice(){
                 this.userInfo = JSON.parse(localStorage.getItem('orgInfo'))
                 let groups =[]
                 if(this.userInfo.groups == undefined || this.userInfo.groups=='' ||this.userInfo.groups.length ==0){
                     groups[0] =102
                 }else{
                     groups = this.userInfo.groups
                 }
                 let cnt = {
                     orgId: this.userInfo.orgId, // Long 组织编号
                     roles: this.userInfo.orgRoles, // String 角色编号 [102,103,104]
                     groups: groups, // String 分组编号 [1111111,555555,111]
                 }

                 this.getNoticeByRoleGroup(cnt)
             },
             jumpBtn(info){
                 if(info.type ==2){
                     this.$commen.jumpUrl(info.content)
                 }else{
                     this.$router.push({
                         path:'/noticeInfo',
                         name:'noticeInfo',
                         params:{
                             info:info
                         }
                     })
                 }
             }
         }  ,
        created(){
            this.swiperData = swiperData
            console.log( window.globalConfig)
            localStorage.setItem('voteInfo', '')  //新增表决所需全局变量
            localStorage.setItem('vote','')     //用户表决所需的全局变量
            let userObj = JSON.parse(localStorage.getItem('userInfo'))  //只有用户信息
            let orgObj =  JSON.parse(localStorage.getItem('orgInfo'))   //只有用户的组织信息
            let user = Object.assign(userObj,orgObj)
			//
			let userInfo = JSON.parse(localStorage.getItem('user'))
			if(userInfo==null){//user是否已经存在，若存在就不重新赋值
				localStorage.setItem('user',JSON.stringify(user))
			}
			//
            //localStorage.setItem('user',JSON.stringify(user))

        },
            mounted() {
                this.addVoteId = this.$constData.permission[0].key
                this.editPostId = this.$constData.permission[1].key
                this.userInfo = JSON.parse(localStorage.getItem('user'))
                this.realName = this.userInfo.realName
                this.mobile = this.userInfo.mobile
                this.idNumber = this.userInfo.idNumber
                this.shareAmount = this.userInfo.shareAmount

                this.userPost = '暂无职务'

                this.getNotice()

        }
    }

</script>

<style scoped lang="scss">

    .nav-box {
           width: 100%;
           height: 20rem;
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
    .box-top{
        margin-top: 40px;
    }
</style>
