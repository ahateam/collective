<template>
    <div>
        <header-box title="修改资料"></header-box>
        <div class="bg-box">
            <div class="form-box">
                <div class="item">
                    <div class="item-title">
                        用户名:
                    </div>
                    <div class="item-input">
                        <div class="input-text">
                            <input type="text" class="text" placeholder="请输入修改后的用户名（与身份证保持一致）" v-model="realName" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">
                        手机号:
                    </div>
                    <div class="item-input">
                        <div class="input-text">
                            <input type="text" class="text" placeholder="请输入修改后的手机号" v-model="mobile">
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">
                        新密码:
                    </div>
                    <div class="item-input">
                        <div class="input-text">
                            <input type="text" class="text" placeholder="请输入修改后的新密码" v-model="pwd">
                        </div>
                    </div>
                </div>

                <div class="form-btn" @click="formBtn">
                    立 即 修 改
                </div>
                <div class="form-btn1"  @click="returnBtn">
                   返 回 上 页
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import HeaderBox from '@/components/head/headerBox'

    export default {
        name: "userUpdate",
        components: {
            HeaderBox
        },
        data() {
            return {
                info: '',
                mobile: '',
                realName:'',
                pwd:''
            }
        },
        mounted() {
            this.info = JSON.parse(localStorage.getItem('user'))
            this.mobile = this.info.mobile
            this.realName = this.info.realName
        },
        methods: {
            formBtn() {
                let userId = this.info.id
                let that = this
                if(this.mobile =='' || this.realName == '' || this.pwd == ''){
                    Toast.fail('请填写完整');
                }else{

                    let cnt = {
                        userId: userId,
                        mobile: this.mobile,
                        realName: this.realName,
                        pwd: this.pwd,
                    };

                    this.$api.editUser(cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            Toast.success('修改成功，重新登录')
                            localStorage.clear()
                            that.$router.push('/login')
                        }else{
                            Toast.fail('修改失败')
                        }
                    })





                }




            },
            returnBtn(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .bg-box {
        width: 100%;
        height: 100vh;
        background-image: url('../../../assets/image/banner.jpg');
        background-position: center;
        background-size: cover;
        overflow: hidden;
        position: relative;
    }

    .form-box {
        position: absolute;
        left: 10%;
        margin-top: 35%;
        width: 80%;
        height: 25rem;
    }

    .item {
        width: 100%;
        height: 3.5rem;
        margin-top: 2rem;
        border-bottom: 1px solid #ddd;
    }

    .item-title {
        float: left;
        width: 8rem;
        font-size: 1.4rem;
        color: #fff;
        text-align: center;
        line-height: 3.5rem;
    }

    .item-input {
        width: auto;
        height: 3.5rem;
        margin-left: 8rem;
    }

    .input-box {
        width: 100%;
        height: 3.5rem;
        background: rgba(255, 255, 255, .5);
        border-radius: 25px;
        overflow: hidden;
    }

    .input-box1 {
        width: 100%;
        height: 3.5rem;
        margin-top: 2rem;
        background: rgba(255, 255, 255, .5);
        border-radius: 25px;
        overflow: hidden;
    }

    .input-img {
        float: left;
        width: 3.5rem;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
    }

    .input-img i {
        width: 3.5rem;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
    }

    .input-item {
        width: auto;
        height: 3.5rem;
        margin-left: 3.5rem;
    }

    .input-text {
        height: 3.5rem;

    }

    .input-btn {
        float: right;
        width: 3.5rem;
        height: 3.5rem;
        text-align: center;
        line-height: 3.5rem;
    }

    .input-btn i {
        width: 3.5rem;
        height: 3.5rem;
        text-align: center;
        line-height: 3.5rem;
        font-size: 1.6rem;
        color: #fff;
    }

    .text {
        width: 100%;
        height: 3.5rem;
        background-color: transparent;
        border: none;
        color: #555;
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 3.5rem;
    }

    .text::-webkit-input-placeholder {
        color: #999;
        text-align: center;
        font-size: 1.4rem;
    }

    .text:-moz-placeholder {
        color: #999;
        text-align: center;
        font-size: 1.4rem;
    }

    .text::-moz-placeholder {
        color: #999;
        text-align: center;
        font-size: 1.4rem;
    }

    .text:-ms-input-placeholder {
        color: #999;
        text-align: center;
        font-size: 1.4rem;
    }

    .form-btn {
        width: 100%;
        height: 3.5rem;
        background: rgba(125, 177, 253, .5);
        border-radius: 25px;
        margin-top: 4rem;
        text-align: center;
        line-height: 3.5rem;
        font-size: 1.4rem;
        color: #fff;
    }

    .form-btn1 {
        width: 100%;
        height: 3.5rem;
        background: rgba(25, 177, 253, 0.6);
        border-radius: 25px;
        margin-top: 2rem;
        text-align: center;
        line-height: 3.5rem;
        font-size: 1.4rem;
        color: #fff;
    }

    .form-btn:active {
        background: rgb(125, 177, 253);
    }

    .form-btn1:active {
        background: rgb(125, 177, 253);
    }

</style>
