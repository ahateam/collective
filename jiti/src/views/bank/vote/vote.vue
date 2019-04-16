<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <div class="title-text">
                    资产统计信息
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
                                   multiple
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

            <el-row >
                <el-col :span="22" style="margin-top: 20px;text-align: right">
                    <el-button  type="primary" @click="searchBtn" >查询统计</el-button>
                    <el-button  type="primary" @click="searchListBtn">查询列表</el-button>
                </el-col>

            </el-row>

            <el-row v-if="isList == false">
                <ve-pie :data="chartData"></ve-pie>
            </el-row>
            <el-row v-if="isList == true">
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

                                <el-button @click="voteInfo(scope.row)" type="text" size="small">详情</el-button>

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

    </div>
</template>

<script>
    export default {
        name: "vote",
        data(){
            return{
                isList:false,
                chartData: {
                    columns: ['是否参与', '占比'],
                    rows: []
                },
                orgList: [],          //组织列表
                org: [],

                orgData:[],

                tableData:[],
                page:1,
                offset:0,
                count:10,
                pageOver:false,
            }
        },
        methods:{
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


            searchListBtn(){
                this.page = 1
                this.isList = true
                if(this.org.length == 0){
                    let arr = []
                    for(let i=0;i<this.orgList.length;i++){
                        arr.push(this.orgList[i].id)
                    }
                    this.orgData = arr
                }else{
                    this.orgData = this.org
                }
                let cnt = {
                    districtId: localStorage.getItem('mechId'),
                    orgIds:this.orgData,
                    offset:this.offset,
                    count:this.count
                }
                this.$bank.getVotesByOrgId(cnt, (res)=> {

                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                        if(this.tableData.length <this.count){
                            this.pageOver = true
                        }
                    }
                })


            },
            searchBtn(){
                this.isList = false

                if(this.org.length == 0){
                    let arr = []
                    for(let i=0;i<this.orgList.length;i++){
                        arr.push(this.orgList[i].id)
                    }
                    this.orgData = arr
                }else{
                    this.orgData = this.org
                }
                let cnt = {
                    districtId: localStorage.getItem('mechId'),
                    orgIds:this.orgData
                }
                this.$bank.countVoteTurnout(cnt, (res)=> {
                    if(res.data.rc == this.$util.RC.SUCCESS){

                        let resData = 0
                        if(res.data.c == 'null' || res.data.c == null){
                            resData = 0
                        }else{
                            resData = JSON.parse(res.data.c).toFixed(4)
                        }
                        let rows  =  [
                            { '是否参与': '已参与', '占比': resData*100 },
                            { '是否参与': '未参与', '占比': 100-resData*100},
                        ]
                        this.chartData.rows = rows
                    }
                })

            },
            voteInfo(info){
                this.$router.push({
                    path:'/bankVoteInfo',
                    name:'bankVoteInfo',
                    params:{
                        info:info
                    }
                })
            },
            changePage(page){
                this.page = page
                this.isList = true

                let offset = (this.page-1)*this.count
                if(this.org.length == 0){
                    let arr = []
                    for(let i=0;i<this.orgList.length;i++){
                        arr.push(this.orgList[i].id)
                    }
                    this.orgData = arr
                }else{
                    this.orgData = this.org
                }

                let cnt = {
                    districtId: localStorage.getItem('mechId'),
                    orgIds:this.orgData,
                    offset:offset,
                    count:this.count
                }
                this.$bank.getVotesByOrgId(cnt, (res)=> {

                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                        if(this.tableData.length <this.count){
                            this.pageOver = true
                        }
                    }
                })


            }
        },
        mounted(){


            let cnt ={
                districtId: localStorage.getItem('mechId'),
            }
            //org列表
            this.$bank.getORGSByDistrictId(cnt, (res)=> {
                this.orgList = this.$util.tryParseJson(res.data.c)
                let arr = []
                for(let i=0;i<this.orgList.length;i++){
                    arr.push(this.orgList[i].id)
                }
                let cnt1 = {
                    districtId: localStorage.getItem('mechId'),
                    orgIds:arr
                }
                this.$bank.countVoteTurnout(cnt1, (res1)=> {
                    console.log(res1)
                    if(res1.data.rc == this.$util.RC.SUCCESS){
                        let resData = 0
                        if(res.data.c == 'null' || res.data.c == null){
                            resData = 0
                        }else{
                            resData = JSON.parse(res1.data.c).toFixed(4)
                        }

                        let rows  =  [
                            { '是否参与': '已参与', '占比': resData*100 },
                            { '是否参与': '未参与', '占比':100-resData*100},
                        ]
                        this.chartData.rows = rows
                        console.log(rows)
                    }
                })
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
