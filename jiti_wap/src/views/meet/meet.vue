<template>
    <div>
        <header-box title="会议管理"></header-box>
        <div class="main-box">

            <div class="box">
                <div class="item-icon">
                    <van-icon name="gift-card"/>
                </div>
                <div class="item-text">
                    <div class="item-title">
                        2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会
                    </div>
                    <div class="item-content">
                        <div class="status-btn">
                            <div class="stared">
                                正在进行
                            </div>
                        </div>
                        <div class="btn-box">
                            <div class="btn">
                                添加议程
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="item-icon">
                    <van-icon name="gift-card" style="color: #40c9c6;"/>
                </div>
                <div class="item-text">
                    <div class="item-title">
                        2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会
                    </div>
                    <div class="item-content">
                        <div class="status-btn">
                            <div class="stared" style="color: #40c9c6;border: 1px  solid  #40c9c6">
                                即将开始
                            </div>
                        </div>
                        <div class="btn-box">
                            <div class="btn" >
                                添加议程
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="item-icon">
                    <van-icon name="gift-card" style="color: rgb(244, 81, 108);"/>
                </div>
                <div class="item-text">
                    <div class="item-title">
                        2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会 2018年年终大会
                    </div>
                    <div class="item-content">
                        <div class="status-btn" style="float: right;margin-right: 1rem">
                            <div class="stared" style="color: rgb(244, 81, 108);border: 1px  solid  rgb(244, 81, 108);">
                                已经结束
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <router-link to="/meetAdd">
               <div class="box1">
                   +
               </div>
           </router-link>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'

    export default {
        name: "meet",
        components: {
            HeaderBox
        },
        mounted(){
            localStorage.setItem('voteInfo','')


        }
    }
</script>

<style scoped lang="scss">
    .main-box {
        background: rgb(240, 242, 245);
    }
    .box1{

        width: 88%;
        height: 6rem;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
        border: 1px dashed #ddd;
        font-size: 6rem;
        color:#666;
        line-height: 5rem;
        text-align: center;
    }

    .box {
        width: 88%;
        height: 8rem;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
    }

    .item-icon {
        float: left;
        width: 8rem;
        height: 8rem;
    }

    .item-icon i {
        width: 8rem;
        height: 8rem;
        font-size: 5rem;
        line-height: 8rem;
        text-align: center;
        color: rgb(54, 163, 247);
    }

    .item-text {
        width: auto;
        height: 8rem;
        margin-left: 8rem;
    }

    .item-title {
        width: auto;
        height: 4rem;
        padding-top: .5rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .item-content {
        width: auto;
        height: 3rem;
        margin-top: .5rem;
    }

    .status-btn {
        float: left;
        width: 50%;
        height: 3rem;

    }
    .btn-box{
        float: left;
        width: 50%;
        height: 3rem;
    }
    .stared{
        float: right;
        width: 5rem;
        height: 2rem;
        padding: 0 .5rem;
        line-height: 2rem;
        margin-top: .4rem;
        text-align: center;
        border: 1px solid #36a3f7;
        color: #36a3f7;
        border-radius: 3px;
    }
    .btn{
        float: right;
        margin-right: 1rem;
        width: 5rem;
        height: 2.2rem;
        padding: 0 .5rem;
        line-height: 2.2rem;
        margin-top: .4rem;
        text-align: center;
        background: #36a3f7;
        color: #fff;
        border-radius: 3px;
    }


</style>
