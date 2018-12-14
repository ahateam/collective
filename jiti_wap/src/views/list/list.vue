<template>
    <div>
        <header-box title="集体资产"></header-box>
        <div class="main-box">
           <router-link to="/jiti">
               <div class="box">
                   <div class="box-img">
                       <div class="img-title">
                           <i class="iconfont icon-biaodanyemian2"></i>
                       </div>
                   </div>
                   <div class="box-text">
                       <div class="text-title">
                           松居杜村组
                       </div>
                       <div class="text">
                           贵州省遵义市汇川区松居杜村组
                       </div>
                   </div>
               </div>
           </router-link>
            <router-link to="/jiti1">
                <div class="box">
                    <div class="box-img">
                        <div class="img-title">
                            <i class="iconfont icon-caiwuguanli" style="color:#36a3f7;"></i>
                        </div>
                    </div>
                    <div class="box-text">
                        <div class="text-title">
                            松林居黄莲组
                        </div>
                        <div class="text">
                            贵州省遵义市汇川区松林居黄莲组
                        </div>
                    </div>
                </div>
            </router-link>
            <router-link to="/jiti2">
                <div class="box">
                    <div class="box-img">
                        <div class="img-title">
                            <i class="iconfont icon-zichan1" style="color:#f4516c;"></i>
                        </div>
                    </div>
                    <div class="box-text">
                        <div class="text-title">
                            松林居小河组
                        </div>
                        <div class="text">
                            贵州省遵义市汇川区松林居小河组
                        </div>
                    </div>
                </div>
            </router-link>
            <router-link to="/jiti3">
                <div class="box">
                    <div class="box-img">
                        <div class="img-title">
                            <i class="iconfont icon-report"></i>
                        </div>
                    </div>
                    <div class="box-text">
                        <div class="text-title">
                            松林居杨村沟组
                        </div>
                        <div class="text">
                            贵州省遵义市汇川区松林居杨村沟组
                        </div>
                    </div>
                </div>
            </router-link>
            <router-link to="/jiti4">
                <div class="box">
                    <div class="box-img">
                        <div class="img-title">
                            <i class="iconfont icon-fenhongjilu" style="color:#36a3f7;"></i>
                        </div>
                    </div>
                    <div class="box-text">
                        <div class="text-title">
                            松林镇松林居水草坝山塘
                        </div>
                        <div class="text">
                            贵州省遵义市汇川区松林镇松林居水草坝山塘
                        </div>
                    </div>
                </div>
            </router-link>
           <router-link to="/jiti5">
               <div class="box">
                   <div class="box-img">
                       <div class="img-title">
                           <i class="iconfont icon-zichanliebiao"></i>
                       </div>
                   </div>
                   <div class="box-text">
                       <div class="text-title">
                           松林镇微菜基地
                       </div>
                       <div class="text">
                           贵州省遵义市汇川区松林镇微菜基地
                       </div>
                   </div>
               </div>
           </router-link>

            <div class="btn">
                <router-link to="/home">
                    <van-button  type="primary">返回首页列表</van-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "list",
        components:{
            HeaderBox
        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: rgb(240, 242, 245);
    }
    .box{
        width: 88%;
        height: 8rem;
        margin: 0 auto;
        margin-top: 1rem;
        border-radius: 5px;
         background: #fff;
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
        color: #40c9c6;
    }

    .text-title{
        width:auto;
        height: 4rem;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #666;
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
        color: #666;
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
