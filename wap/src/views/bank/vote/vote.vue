<template>
    <div>
        <bank-head title="选择机构"></bank-head>
        <div class="main-box">
            <van-search
                    v-model="searchData"
                    placeholder="请输入组织名称查询"
                    show-action
                    @search="onSearch"
                    @cancel="onCancel"
            />
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多可选的组织机构了"
                    @load="onLoad"
            >

                <span v-if="orgList.length>0">
                    <span v-for="(item,index) in orgList" :key="index" @click="chooseBtn(item.id)">
                        <div class="nav-box">
                            <div class="nav-title">
                              {{item.name}}
                            </div>
                            <div class="nav-line">
                            </div>
                            <div class="nav-content">
                             {{item.address}}
                            </div>
                        </div>
                    </span>
               </span>

            </van-list>


            <div class="create-btn" @click="returnBtn">返回首页</div>
        </div>
    </div>
</template>

<script>
    import BankHead from '@/components/head/bankHead'

    export default {
        name: "vote",
        data() {
            return {
                searchData: '',
                orgList: [],
                offset: 0,
                count: 10,
                page: 1,
                loading: false,
                finished: false
            }
        },
        components: {
            BankHead,
        },
        methods: {
            //ajax
            getORGByBank(cnt) {
                this.$bank.getORGByBank(cnt, (res) => {
                    let data = []
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        data = this.$util.tryParseJson(res.data.c)
                    } else {
                        data = []
                    }
                    this.orgList = this.orgList.concat(data)
                    if (data.length < this.count) {
                        this.finished = true
                    }
                })
            },
            //分页
            onLoad() {
                // 异步更新数据
             if(this.searchData == ''){
                 setTimeout(() => {
                     if (this.finished == false) {
                         this.page = this.page + 1
                         let cnt = {
                             offset: (this.page - 1) * this.count,
                             count: this.count,
                             bankId: this.$util.tryParseJson(localStorage.getItem('orgInfo')).orgId, // Long 银行机构id
                         }
                         this.getORGByBank(cnt)
                         // 加载状态结束
                         this.loading = false
                     } else {
                         this.loading = false
                     }
                 }, 60);
             }else{
                 setTimeout(() => {
                     if (this.finished == false) {
                         this.page = this.page + 1
                         let cnt = {
                             offset: (this.page - 1) * this.count,
                             count: this.count,
                             name:this.searchData,
                             bankId: this.$util.tryParseJson(localStorage.getItem('orgInfo')).orgId, // Long 银行机构id
                         }
                         this.getORGByBank(cnt)
                         // 加载状态结束
                         this.loading = false
                     } else {
                         this.loading = false
                     }
                 }, 60);
             }
            },
            //搜索
            onSearch() {
                if (this.searchData != '') {
                    this.orgList = []
                    this.page = 1
                    let cnt = {
                        bankId: this.$util.tryParseJson(localStorage.getItem('orgInfo')).orgId, // Long 银行机构id
                        name: this.searchData, // String <选填> 需要查询的名称
                        count: this.count, // Integer
                        offset: this.offset, // Integer
                    };
                    this.getORGByBank(cnt)
                }else{
                    this.orgList = []
                    let cnt = {
                        bankId: this.$util.tryParseJson(localStorage.getItem('orgInfo')).orgId, // Long 银行机构id
                        count: this.count, // Integer
                        offset: this.offset, // Integer
                    }
                    this.getORGByBank(cnt)
                }
            },
            //取消搜索
            onCancel() {
                this.searchData = ''
                this.orgList = []
                let cnt = {
                    bankId: this.$util.tryParseJson(localStorage.getItem('orgInfo')).orgId, // Long 银行机构id
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                }
                this.getORGByBank(cnt)

            },
            returnBtn() {
                this.$router.push('/bankHome')
            },
            //选中机构
            chooseBtn(id){
                this.$router.push({
                    path:'/bankVoteList',
                    name:'bankVoteList',
                    params:{
                        orgId:id
                    }
                })
            }

        },
        mounted() {
            let cnt = {
                bankId: this.$util.tryParseJson(localStorage.getItem('orgInfo')).orgId, // Long 银行机构id
                count: this.count, // Integer
                offset: this.offset, // Integer
            }
            this.getORGByBank(cnt)


        }
    }
</script>

<style scoped lang="scss">
    .create-btn {
        width: 90%;
        height: 3rem;
        margin: 0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: rgb(125, 177, 253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }

    .main-box {
        background: #fff;
    }

    .list-box {
        width: 85%;
        margin: 0 auto;
        background: #fff;
        margin-top: .5rem;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 5px 5px #ddd;
    }

    .list-title {
        width: auto;
        line-height: 2rem;
        font-size: 1.6rem;
        color: #444;
        letter-spacing: 1.5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

    }

    .list-content {
        width: auto;
        margin-top: .5rem;
        color: #666;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;

    }

    .vote-item-box {
        width: 90%;
        margin: 0 auto;
        height: 7rem;
        margin-top: 1rem;
        border-radius: 5px;
        padding: 0 .5rem;
        box-shadow: 0 0 20px #ccc;
    }

    .vote-item-title {
        width: 100%;
        height: 3rem;
        border-bottom: 1px solid #ddd;
    }

    .vote-item-content {
        width: auto;
        height: 4rem;
    }

    .vote-item-note {
        float: left;
        width: 3rem;
        height: 3rem;
    }

    .vote-item-text {
        width: auto;
        height: 3rem;
        margin-left: 3rem;
        text-align: left;
        font-size: 1.4rem;
        color: #333;
        line-height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }

    .vote-item-note i {
        width: 3rem;
        height: 3rem;
        display: block;
        color: #ff6397;
        font-size: 2.7rem;
        text-align: center;
    }

    .vote-item-title-box {
        width: auto;
        height: 3rem;
        margin-right: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }

    .vote-item-status {
        float: right;
        width: 5rem;
        height: 3rem;
        font-size: 1.2rem;
        color: #666;
        text-align: center;
    }

    .vote-item-info {
        width: auto;
        height: 4rem;
        margin-right: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666;
        font-size: 1.4rem;
        line-height: 4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }

    .vote-item-btn {
        float: right;
        width: 5rem;
        height: 4rem;
        font-size: 1.2rem;
        color: #666;
        text-align: center;
        line-height: 4rem;

    }

    .info-title {
        margin: 1rem auto;
        padding-bottom: .5rem;
        width: 96%;
        font-size: 1.6rem;
        color: #333;
        line-height: 3rem;
        border-bottom: 1px solid #ddd;

    }

    .info-text {
        width: 96%;
        margin: 0 auto;
        font-size: 1.6rem;
        color: #666;
    }

    .info-btn {
        margin-top: 2rem;
        width: 100%;
        height: auto;
        overflow: hidden;
    }

    .item-btn {
        float: left;
        width: 20%;
        margin-left: 10%;
    }

    .info-time {
        width: 96%;
        margin: 0 auto;
        height: 2rem;
        font-size: 1.2rem;
        color: #666;

    }

    .item {
        width: auto;
        padding: 0 15px;
        height: 4rem;
    }

    .option-title {
        float: left;
        width: 8rem;
        height: 4rem;
        font-size: 1.6rem;
        line-height: 4rem;
        color: #333;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .option-vote {
        width: auto;
        margin-left: 8rem;
        height: 4rem;
    }

    .option-box {
        float: left;
        width: 33%;
        height: 4rem;
        cursor: pointer;
        position: relative;

    }

    .option-btn {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -15px;
        text-align: center;
    }

    .submitBtn {
        width: 96%;
        margin-top: 20px;
        text-align: center;

    }

    .item-box {
        width: auto;
        padding: 0px 15px;
    }

    .vote-title {
        width: 100%;
        height: 3rem;
        border-left: 4px solid #63a35c;
        padding-left: 1rem;
        font-size: 1.4rem;
        color: #666;
        font-weight: 600;
        line-height: 3rem;
    }

    .vote-item {
        width: 80%;
        margin: 1rem auto;
        height: 4rem;
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 0px 15px;
        margin-top: 2rem;
    }

    .item-title {
        float: left;
        width: 80%;
        height: 4rem;
        line-height: 4rem;
        padding-left: 1rem;
        font-size: 1.4rem;
        color: #444;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .vote-btn {
        float: left;
        width: auto;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
    }

    .nav-box {
        width: 80%;
        height: 10rem;
        margin: 40px auto;
        background: #5bc0de;
        border-radius: 5px;
    }

    .nav-title {
        width: auto;

        padding: 0 1rem;
        padding-top: 1rem;
        color: #fff;
        line-height: 2rem;
        font-size: 1.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .nav-line {
        width: 3rem;
        height: 4px;
        margin-top: 1rem;
        margin-left: 1rem;
        background: #fff;

    }

    .nav-content {
        width: auto;
        height: 2rem;
        margin-top: .5rem;
        padding: 0 1rem;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
