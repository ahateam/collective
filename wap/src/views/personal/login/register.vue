<template>
    <div>
        <head-return title="注册机构"></head-return>
        <div class="main-box">

            <van-cell-group>
                <van-field
                        v-model="name"
                        type="text"
                        label="机构名称"
                        placeholder="请输入机构名称"
                        class="input-box"
                />
                <van-field
                        v-model="addressMax"
                        type="text"
                        label="机构层级"
                        placeholder="请输入机构层级"
                        class="input-box"
                        @click="showArea"
                />
                <van-field
                        v-model="addressMin"
                        type="text"
                        label="具体层级"
                        placeholder="请输入（镇/街道，村、居、社区）"
                        class="input-box"
                />
                <van-field
                        v-model="code"
                        type="text"
                        label="组织代码"
                        placeholder="请输入机构组织代码"
                        class="input-box"
                />
                <van-field
                        v-model="person"
                        type="number"
                        label="董事会人数"
                        placeholder="请输入董事会总人数"
                        class="input-box"
                />
                <van-field
                        v-model="shares"
                        type="number"
                        label="总股份数"
                        placeholder="请输入总股份数"
                        class="input-box"
                />
                <van-field
                        v-model="shareHolder"
                        type="number"
                        label="总股东数"
                        placeholder="请输入总股东数"
                        class="input-box"
                />
            </van-cell-group>

            <div class="image-input">
                <div class="label">
                    集体代码证
                </div>
                <div class="icon-box">
                    <van-uploader :after-read="onRead">
                        <i class="iconfont icon-shangchuantupian"></i>
                    </van-uploader>
                </div>
            </div>

            <div class="image-input">
                <div class="label">
                    授权证书
                </div>
                <div class="icon-box">
                    <van-uploader :after-read="onRead1">
                        <i class="iconfont icon-shangchuantupian"></i>
                    </van-uploader>
                </div>
            </div>

            <van-cell-group>
                <van-field
                        v-model="ChairmanName"
                        type="text"
                        label="董事长姓名"
                        placeholder="请输入董事长姓名"
                        class="input-box"
                />
                <van-field
                        v-model="ChairmanCard"
                        type="text"
                        label="董事长身份证"
                        placeholder="请输入董事长身份证号"
                        class="input-box"
                />
                <van-field
                        v-model="ChairmanTell"
                        type="text"
                        label="董事长电话"
                        placeholder="请输入董事长联系电话"
                        class="input-box"
                />
                <van-field
                        v-model="ChairmanTell"
                        type="text"
                        label="董事长电话"
                        placeholder="请输入董事长联系电话"
                        class="input-box"
                />
                <van-field
                        v-model="adminName"
                        type="text"
                        label="管理员姓名"
                        placeholder="请输入管理员姓名"
                        class="input-box"
                />
                <van-field
                        v-model="adminCard"
                        type="text"
                        label="管理员身份证"
                        placeholder="请输入管理员身份证号"
                        class="input-box"
                />
                <van-field
                        v-model="adminTell"
                        type="text"
                        label="管理员电话"
                        placeholder="请输入管理员联系电话"
                        class="input-box"
                />
            </van-cell-group>

             <div class="register-btn" @click="registerBtn">注 册</div>




            <!--地址弹出层-->
            <van-popup v-model="show" position="bottom">
                <van-area
                        :area-list="areaList"
                        title="机构层级"
                        value="520303"
                        @confirm="areaBtn"
                        @cancel="cancelBtn"/>
            </van-popup>
        </div>
    </div>
</template>

<script>
    import HeadReturn from '@/components/head/headReturn'
    import { Toast } from 'vant';

    export default {
        name: "register",
        components: {
            HeadReturn
        },
        data() {
            return {
                show: false,
                areaList: {},
                name: '',                 //机构名
                addressMax: '',          //机构层级
                addressMin: '',          //具体层级
                code: '',                //组织代码
                person: '',              //董事会人数
                shares: '',              //总股份数
                shareHolder: '',         //总股东数
                codeCardImg:'',          //经济组织代码证
                certificate:'',          //授权证书
                ChairmanName:'',         //董事长姓名
                ChairmanCard:'',         //董事长身份证
                ChairmanTell:'',         //董事长电话
                adminName:'',            //管理员姓名
                adminCard:'',            //管理员身份证
                adminTell:'',            //管理员电话
            }
        },
        methods: {
            areaBtn(data) {
                let add = ''
                for (let i = 0; i < data.length; i++) {
                    add = add + data[i].name
                }
                this.addressMax = add
                this.show = false
            },
            showArea() {
                this.show = true
            },
            cancelBtn(){
              this.show = false
            },
            onRead(file) {
                this.codeCardImg = file
                console.log(this.codeCardImg)
            },
            onRead1(file) {
                this.certificate = file
                console.log(this.certificate)
            },

            //组数据 请求后端，存注册数据
            registerBtn(){
                //注册成功之后跳转账号页面
                Toast.success('注册成功');
                this.$router.push('/registerSuccess')
            },
        },
        mounted() {
            let that = this
            this.$http.post('/area')
                .then(function (res) {
                    that.areaList = res.data.data
                })
        },
    }
</script>

<style scoped lang="scss">
    .input-box {
        border-bottom: 1px solid #eee;
    }
    .image-input{
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 10px 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 24px;
        position: relative;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        overflow: hidden;
        border-bottom: 1px solid #eee;
    }
    .label{
        float: left;
        width: 90px;

    }
    .icon-box{
        float: left;
        width: auto;
        padding: 0 100px 0 40px ;

    }
    .icon-box i{
       line-height: 2.4rem;
        font-size: 2.2rem;
        color: #1989fa;
    }
    .register-btn{
           width: 90%;
           height: 3rem;
           margin:0 auto;
           margin-top: 1rem;
           border-radius: 25px;
           background: rgb(125,177,253);
           text-align: center;
           line-height: 3rem;
           font-size: 1.4rem;
           color: #fff;
       }
</style>
