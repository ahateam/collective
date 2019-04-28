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
                        <el-select
                                v-model="org"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入查询的机构名称"
                                style="width: 70%"
                                :remote-method="orgSearch"
                                :loading="loading">
                            <el-option
                                    v-for="(item,index) in orgList"
                                    :key="index"
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
                            选择资产查询:
                        </div>
                    </el-col>
                    <el-col :span="18" style="line-height: 4rem">
                        <el-select
                                v-model="asset"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入资产的编号或者资产名进行查询"
                                style="width: 70%"
                                :remote-method="assetSearch"
                                :loading="loading">
                            <el-option
                                    v-for="(item,index) in orgList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="22" style="margin-top: 20px;text-align: right">
                    <el-button  type="primary" @click="searchListBtn" >开始查询</el-button>
                </el-col>

            </el-row>

            <el-row >
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                         >
                        <el-table-column
                                prop="name"
                                label="资产名称">
                        </el-table-column>
                        <el-table-column
                                prop="buildTime"
                                label="年份">
                        </el-table-column>
                        <el-table-column
                                prop="sn"
                                label="资产证件号">
                        </el-table-column>
                        <el-table-column
                                prop="location"
                                label="位置">
                        </el-table-column>

                        <el-table-column
                                prop="originPrice"
                                label="价值(万)"
                        >

                        </el-table-column>

                        <el-table-column
                                prop="yearlyIncome"
                                label="年产值(万)"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                        >
                            <template slot-scope="scope">
                                <el-button @click="infoBtn(scope.row)" type="text" size="small">详细</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

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
        name: "asset",
        data(){
            return{

                orgList: [],          //组织列表

                loading:false,


                org:'',
                asset:'',

                //表格相关

                offset:0,
                count:10,
                tableData:[],
                page:1,
                pageOver:false,

            }
        },
        methods:{

            //搜素org列表
            orgSearch(name){
              console.log(name)

            },
            //模糊查询资产列表
            assetSearch(){

            },

            searchListBtn(){
                console.log(this.org);
            },

            //表格分页
            changePage(page){
                this.page = page

                let cnt ={
                    districtId: localStorage.getItem('mechId'), // Long 区id
                    offset:(page-1)*this.count,
                    count:this.count
                }
                if(this.org.length >0){
                    cnt.orgIds = this.org
                }
                if(this.year.length >0){
                    cnt.buildTimes = this.year
                }else{
                    cnt.buildTimes = this.yearList
                }
                if(this.resType.length >0){
                    cnt.resTypes = this.resType
                }
                if(this.assetType.length >0){
                    cnt.assetTypes = this.assetType
                }
                if(this.businessMode.length>0){
                    cnt.businessModes = this.businessMode
                }

                this.$bank.getAssetListByTypes(cnt, (res)=> {
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = JSON.parse(res.data.c)
                        if(this.tableData.length < this.count){
                            this.pageOver = true
                        }else{
                            this.pageOver = false
                        }
                    }
                })
            },

            //查看详情
            infoBtn(info){
                this.$router.push({
                    path:'/bankAssetsInfo',
                    name:'bankAssetsInfo',
                    params:{info:info}
                })
            }
        },
        mounted(){


        }
    }
</script>

<style scoped lang="scss">
    .search-box{
        width: auto;
        margin: 10px;
        /*!*border-radius: 5px;*!*/
        /*border-bottom: 1px solid #409eff;*/
        padding: 10px;
    }
    .nav-btn{
        float: left;
        margin-left: 15px;
    }
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
</style>
