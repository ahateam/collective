<template>
    <div>
        <div class="footer-nav" >
            <div class="footer-list">
                <ul>
                    <li class="item" @click="onChang(0)">
                        <div class="item-icon">
                            <van-icon name="wap-home" v-if=" this.$store.state.footActive != 0" />
                            <van-icon name="wap-home"  v-if=" this.$store.state.footActive == 0" style="color: #609eff;"/>
                        </div>
                        <div class="item-text" :class="{isActive: this.$store.state.footActive==0}">
                            首页
                        </div>
                    </li>
                    <li class="item" @click="onChang(1)">
                        <div class="item-icon">
                            <van-icon name="pending-evaluate"  v-if=" this.$store.state.footActive != 1"/>
                            <van-icon name="pending-evaluate" v-if=" this.$store.state.footActive == 1" style="color:#609eff;"/>
                        </div>
                        <div class="item-text" :class="{isActive: this.$store.state.footActive==1}">
                            消息
                        </div>
                    </li>
                    <li class="item" @click="onChang(2)">
                        <div class="item-icon">
                            <van-icon name="cart" v-if=" this.$store.state.footActive != 2" />
                            <van-icon name="cart" v-if=" this.$store.state.footActive == 2" style="color:#609eff;"/>
                        </div>
                        <div class="item-text" :class="{isActive: this.$store.state.footActive==2}">
                            购物车
                        </div>
                    </li>
                    <li class="item" @click="onChang(3)" >
                        <div class="item-icon">
                            <van-icon name="contact" v-if=" this.$store.state.footActive != 3" />
                            <van-icon name="contact" v-if=" this.$store.state.footActive == 3" style="color:#609eff;"/>
                        </div>
                        <div class="item-text" :class="{isActive: this.$store.state.footActive==3}">
                            我的
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footerBox",
        methods: {
            onChang(key){
                this.$store.state.footActive = key
                if(key == 0){
                    this.$router.push('/')
                }else if( key == 1){
                    this.$router.push('/')
                }else if(key == 2){
                    this.$router.push('/')
                }else{
                    this.$router.push('/user/userCenter')
                }
            }
        }
    }
</script>

<style scoped>
    .footer-nav {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 5rem;
        padding-top: .5rem;
        background: #fff;
        z-index: 1000;
        border-top: 1px solid #ddd
    }

    .footer-list {
        width: 100%;
        height: 5rem;
    }

    .item {
        float: left;
        margin-left: 1%;
        width: 23.5%;
        height: 5rem;
        text-align: center;
        cursor: pointer;
    }

    .item-icon {
        width: 100%;
        height: 3rem;
        text-align: center;

    }

    .item-icon i {
        font-size: 2.5rem;
        text-align: center;
        line-height: 3rem;
        color: #999;
    }

    .item-text {
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        color: #999;
    }

    .isActive {
        color: #609eff;
    }
</style>
