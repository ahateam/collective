<template>
    <div>
        <div class="footer-comment">
            <div class="footer-list">
                <div class="item-input">
                    <input type="text" class="inp-item" placeholder="请输入评论">
                </div>
                <div class="item-btn">
                    <div class="btn-box">
                        发表
                    </div>
                    <div class="btn-zan" @click="showActive">
                        <span v-if="zanActive == 0">
                            <van-icon name="like-o"/>
                        </span>
                        <span v-if="zanActive == 1">
                            <van-icon name="like"/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footerComment",
        data() {
            return {
                zanActive: 0
            }
        },
        methods: {
            showActive() {
                if (this.zanActive == 0) {
                    this.zanActive = 1
                } else {
                    this.zanActive = 0
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .footer-comment {
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

    .inp-item {
        float: left;
        width: 60%;
        height: 2.5rem;
        margin-left: 1%;
        margin-top: .75rem;
        border-radius: 25px;
        border: 1px solid #aaa;
        padding: 0 1rem;
        font-size: 1.2rem;
    }

    .item-btn {
        width: 100%;
        height: 4rem;
        padding: 0 1rem;
        margin-left: 70%;
    }

    .btn-box {
        float: left;
        padding: 0 1rem;
        line-height: 4rem;
        font-size: 1.4rem;
        color: #1989fa;
    }

    .btn-zan {
        float: left;
        line-height: 4rem;
    }

    .btn-zan i {
        padding: 0 1rem;
        font-size: 1.6rem;
        line-height: 4rem;
        color: #f44;
    }


</style>
