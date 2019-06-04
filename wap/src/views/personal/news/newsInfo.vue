<template>
    <div>
        <header-box title="消息详情"></header-box>
        <div class="main-box">
            <div class="oldData">
                <van-row>
                    <van-col span="12"><h1>原始家庭户</h1></van-col>
                </van-row>
                <div v-for="item in list">
                <van-cell style="border-bottom: 1px solid #ebedf0;" :title="item.name" :value="item.id"/>
                </div>
            </div>

            <div class="newData">
                <van-row style="margin: 20px">
                    <van-col span="12"><h1>家庭户1</h1></van-col>
                </van-row>
                <van-col span="24">
                    <van-panel title="李四" desc="444444444444444444" status="移出" use-footer-slot>
                    </van-panel>
                </van-col>
            </div>

            <div class="newData">
                <van-row style="margin: 20px">
                    <van-col span="12"><h1>家庭户2</h1></van-col>
                </van-row>
                <van-col span="24">
                    <van-panel title="二狗" desc="555555555555555555" status="移入" use-footer-slot>
                    </van-panel>
                </van-col>
            </div>

            <div class="btn">
                <van-button type="primary" style="margin-right: 10px">审批通过</van-button>
                <van-button type="default" style="margin-top: 20px;" @click="_routerLink">返回上一页</van-button>
            </div>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import RouterLink from "vant/es/mixins/router-link";

    export default {
        name: "newsInfo",
        components: {
            RouterLink,
            HeaderBox
        },
        data() {
            return {
                list: [
                    {
                        name: '张三',
                        id: '1234567891234567'
                    },
                    {
                        name: '李四',
                        id: '1236667891234567'
                    }
                ]
            }
        },
        methods: {
            _routerLink() {
                this.$router.push('/news')
            }
        }
    }
</script>

<style scoped lang="scss">
    .main-box {
        background: #fff;
    }

    .oldData {
        margin: 20px;
        font-size: 12px;
    }

    .newData{
        font-size: 12px;
    }

    .btn {
        text-align: center;
    }
</style>
