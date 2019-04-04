<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <div class="title-text">
                    根据用户查询投票
                </div>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row :gutter="40" >
                <el-col :span="24" style="margin: 10px 0">
                    <el-col :span="4">
                        <div class="title">
                            选择机构查询:
                        </div>
                    </el-col>
                    <el-col :span="18" style="line-height: 4rem">
                        <el-select v-model="org"
                                   placeholder="不选择默认为所有组织机构"
                                   style="margin-left: 20px; width: 100%;">
                            <el-option
                                    v-for="item in orgList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="40" >
                <el-col :span="24" style="margin: 10px 0">
                    <el-col :span="4">
                        <div class="title">
                            选择机构查询:
                        </div>
                    </el-col>
                    <el-col :span="18" style="line-height: 4rem">
                        <el-input placeholder="请输入用户姓名" v-model="searchData">
                            <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                        </el-input>
                        <el-row v-if="searchList.length>0">
                            <el-col :span="24">
                                <div v-for="(item,index) in searchList" :key="index"   @click="userBtn(item.user)" style="cursor: pointer;" >
                                    <el-row style="margin-top: 1rem;border-bottom: 1px solid #ddd;padding: 1rem;">
                                        <el-col :span="5"  >{{item.user.realName}} </el-col>
                                        <el-col :span="19" > {{item.user.idNumber}}</el-col>
                                    </el-row>
                                </div>

                            </el-col>
                        </el-row>
                    </el-col>
                </el-col>
            </el-row>

            <el-row >
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%"
                    >
                        <el-table-column
                                prop="title"
                                label="投票名称">
                        </el-table-column>
                        <el-table-column
                                prop="template"
                                label="投票模板"
                                :formatter="templateFilter"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="选项类型"
                                width="100"
                                :formatter="typeFilter">
                        </el-table-column>
                        <el-table-column
                                prop="quorum"
                                label="应到参会人数"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="startTime"
                                label="开始时间"
                                :formatter="timeFilter"
                        >
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                width="250">
                            <template slot-scope="scope">

                                <el-button @click="optionInfo(scope.row)" type="text" size="small">选项详情</el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <p>
                    当前第 {{page}} 页
                    <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(page-1)">上一页</el-button>
                    <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
                </p>
            </el-row>
        </el-row>

        <el-dialog
                title="用户所投选项"
                :visible.sync="optionShow"
                width="30%">
            <span>
                <p>
                    <span v-for="(item,index) in optionList" style="margin-left: 15px;color: #f60;" :key="index">
                        <el-tag type="danger" style="cursor: pointer;"> {{item.title}}</el-tag>
                    </span>
                </p>

            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="optionShow = false">取 消</el-button>
                <el-button type="primary" @click="optionShow = false">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "voteUser",
        data(){
            return{
                optionShow:false,
                optionList:[],
                searchData:'',
                searchDataId:'',
                searchList:[],

                orgList: [],          //组织列表
                org: '',



                tableData:[],
                page:1,
                offset:0,
                count:10,
                pageOver:false,
            }
        },
        methods:{
            userBtn(userInfo){
                console.log(userInfo)
                let that = this
                this.searchList = []
                this.searchData = userInfo.realName
                this.searchDataId = userInfo.id
                let cnt = {
                    orgId:this.org,
                    userId: this.searchDataId, // Long 用户编号
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                }
                this.$api.getVoteTicketByUserId(cnt,function (res) {
                   if(res.data.rc == that.$util.RC.SUCCESS){
                        that.tableData = JSON.parse(res.data.c)
                        if(that.tableData.length <that.count){
                            that.pageOver = true
                        }else{
                            that.pageOver = false
                        }

                   }
                })


            },
            //选人搜索事件
            searchBtn(){
                let that = this
                if(this.org == ''){
                    this.$message.error('请先选择一个组织机构')
                }else if(this.searchData == ''){
                    this.$message.error('请输入用户姓名')
                }else{
                    let cnt = {
                        orgId: this.org,
                        realName: this.searchData,
                        count: this.count, // Integer
                        offset: this.offset, // Integer
                    };
                    this.$api.getORGUsersLikeRealName(cnt,function (res) {
                        that.searchList = JSON.parse(res.data.c)
                    })
                }


            },

            templateFilter(row,col,value){
                if(value == '0'){
                    return '选举投票'
                }else{
                    return '普通投票'
                }
            },
            typeFilter(row,col,value){
                if(value == '0'){
                    return '单选'
                }else if(value === '1'){
                    return '多选'
                }else{
                    return '用户权重'
                }
            },
            timeFilter(row,col,value){
                let timer = new Date(value)
                return timer.toLocaleDateString()+ ' '+timer.toLocaleTimeString('chinese',{hour12:false})
            },


            changePage(page){
                this.page = page
                let that = this
                let offset = (this.page-1)*this.count
                if(this.org == ''){
                    this.$message.error('请先选择一个组织机构')
                }else if(this.searchData == ''){
                    this.$message.error('请输入用户姓名')
                }else{
                    let cnt = {
                        orgId: this.org,
                        realName: this.searchData,
                        count: this.count, // Integer
                        offset: offset, // Integer
                    };
                    this.$api.getORGUsersLikeRealName(cnt,function (res) {
                        that.searchList = JSON.parse(res.data.c)
                        if(that.tableData.length <that.count){
                            that.pageOver = true
                        }else{
                            that.pageOver = false
                        }
                    })
                }

            },
            optionInfo(info){
                this.optionShow = true
                let that = this
                let cnt = {
                    userId: this.searchDataId, // Long 用户编号
                    voteId: info.id, // Long 投票编号
                }
                this.$api.getOptionByUserSelection(cnt,function (res) {
                    console.log(JSON.parse(res.data.c))
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.optionList = JSON.parse(res.data.c)
                    }
                })

            }
        },
        mounted(){
            let that = this
            let cnt ={
                districtId: localStorage.getItem('areaId'),
            }
            //org列表
            this.$api.getORGSByDistrictId(cnt,function (res) {
                that.orgList = JSON.parse(res.data.c)
            })



        }
    }
</script>

<style scoped lang="scss">
    .row-box{
        background: #fff;
    }
    .row-box1{
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .tab-box{
        width: auto;
        margin-left: 20px;

    }
    .title-text{
        width: auto;
        padding: 0 15px;
        border-left:4px solid rgb(99, 163, 92);
        font-size: 1.6rem;
        line-height: 5rem;
    }
    .title{
        width: auto;
        overflow: hidden;
        font-size: 1.6rem;
        color: #333;
        line-height: 4rem;
        text-align: right;

    }

</style>
