<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                投票结果详情
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                >
                    <el-table-column
                            prop="title"
                            label="选项名称">
                    </el-table-column>
                    <el-table-column
                            prop="ballotCount"
                            label="选项票数"
                    >
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            width="250">
                        <template slot-scope="scope">
                            <el-button @click="optionInfo(scope.row)" type="text" size="small">投票用户查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

            <p>
              <router-link to="/areaVote">
                  <el-button type="primary" >返回统计页</el-button>
              </router-link>
            </p>
        </el-row>

        <el-dialog title="投此选项用户列表" :visible.sync="showUserList">
            <el-table   :data="list">
                <el-table-column property="realName" label="姓名" width="150"></el-table-column>
                <el-table-column property="idNumber" label="身份证" width="200"></el-table-column>
                <el-table-column property="mobile" label="手机号"></el-table-column>
            </el-table>
            <div style="margin:2rem 0">
                <span class="page-text">当前页码：第 <span style="color: #f60;">{{page}}</span> 页</span>
                <el-button type="primary" size="mini" :disabled="page==1"   @click="changePage(page-1)">上一页</el-button>
                <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showUserList = false">取 消</el-button>
                <el-button type="primary" @click="showUserList = false">返回选项列表</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>


    export default {
        name: "pollInfo",
        data() {
            return {
                info:'',
                tableData:[],
                showUserList:false,
                userList:[],
                list:[],
                offset:0,
                count:10,
                page:1,
                pageOver:false,
               optionId:'',
        }
        },
        methods: {
            //分页
            changePage(page){
                this.page = page

                this.showUserList = true
                let cnt ={
                    voteId: this.info.id, // Long 投票编号
                    selection:this.optionId, // String 选项
                    count: this.count, // Integer
                    offset: (page-1)*this.count, // Integer
                }
                this.$area.getUserBySelection(cnt, (res)=> {
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.userList = this.$util.tryParseJson(res.data.c)
                    }

                    if(this.userList.length>0){
                        this.list = []
                        for(let i =0;i<this.userList.length;i++){
                            let info = {}
                            let cnt1 = {
                                userId: this.userList[i].userId, // Long 用户编号
                            };
                            this.$area.getUserById(cnt1, (res)=> {
                                if(res.data.rc== this.$util.RC.SUCCESS){
                                    info = this.$util.tryParseJson(res.data.c)
                                    this.list.push(info)
                                }
                            })
                            if(i < this.count-1){
                                this.pageOver = true
                            }else{
                                this.pageOver = false
                            }
                        }
                    }
                })

            },
            optionInfo(info){

                this.page= 1
                this.showUserList = true
                this.optionId =  info.id
                let cnt ={
                    voteId: this.info.id, // Long 投票编号
                    selection: info.id, // String 选项
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                }
                this.$area.getUserBySelection(cnt, (res)=> {
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.userList = this.$util.tryParseJson(res.data.c)
                        }

                        if(this.userList.length>0){
                            this.list = []
                            for(let i =0;i<this.userList.length;i++){
                                let info = {}
                                let cnt1 = {
                                    userId: this.userList[i].userId, // Long 用户编号
                                };
                                this.$area.getUserById(cnt1, (res)=> {

                                    if(res.data.rc== this.$util.RC.SUCCESS){
                                        info = this.$util.tryParseJson(res.data.c)

                                        this.list.push(info)

                                    }
                                })
                                if(i < this.count-1){
                                    this.pageOver = true
                                }else{
                                    this.pageOver = false
                                }
                            }
                        }
                })


            },

        },

        mounted() {

            this.info = this.$route.params.info
            let cnt = {
                voteId:this.info.id
            }
            this.$area.getVoteOptions(cnt, (res)=> {
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.tableData = this.$util.tryParseJson(res.data.c)
                    console.log(this.tableData)
                }
            })
        }

    }
</script>

<style scoped lang="scss">
    .row-text-box {
        margin-top: 1rem;
    }

    .lable-box {
        font-size: 1.6rem;
        line-height: 3rem;
        text-align: right;
        width: 100%;
    }

    .row-box {
        background: #fff;
        padding: 15px;
        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }

    .title-box {
        font-size: 1.6rem;
        line-height: 40px;
        letter-spacing: 2px;
        font-weight: 600;
        color: #666;
        text-align: right;
    }

    .text-box {
        margin-left: 50px;
        line-height: 40px;
    }

    .row-box2 {
        margin-top: 20px;
    }

    .row-box3 {
        margin-top: 40px;
        text-align: center;
        padding-bottom: 20px;
    }

    .el-tag {
        margin-top: 10px;
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .text{
        font-size: 1.6rem;
        line-height: 3rem;
        color: #333;
    }
</style>
