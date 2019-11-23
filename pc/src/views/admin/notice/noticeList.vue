<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24" >
                <span class="title-box" style="line-height: 40px">公告列表</span>
            </el-col>

        </el-row>
        <el-row class="row-box1" >
            <el-col :span="24" >
                <router-link to="/noticeAdd">
                    <el-button type="primary" >新建公告</el-button>
                </router-link>
            </el-col>
			
			<el-row class="row-search" style="margin-top: 50px;">
				<el-col :span="12">
					<el-input placeholder="请输入公告标题查询" v-model="title">
						<el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
					</el-input>
				</el-col>
			</el-row>
            <el-col :span="24" style="margin-top: 15px">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="公告标题"
                              >
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="公告类型"
                                :formatter="typeFilter">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="创建时间"
                                :formatter="timeFilter">
                        </el-table-column>

                        <el-table-column
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="getInfoBtn(scope.row)">详情</el-button>
                                <el-button type="text" size="small" @click="delBtn(scope.row)"><span style="color: #f44;">删除</span></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <p>
                    当前第 {{page}} 页
                    <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(page-1)">上一页</el-button>
                    <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
                </p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "noticeList",
        data(){
            return{

                tableData:[],
                offset:0,
                count:10,
                page:1,
                pageOver:false,
				title:''
            }
        },
        methods:{
            getNotice(cnt){
                this.$api.getNotice(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableData = []
                    }

                    if(this.tableData.length <this.count){
                        this.pageOver = true
                    }else{
                        this.pageOver = false
                    }
                })
            },

            typeFilter(row,col,val){
                let typeList = this.$constData.noticeType
                for(let i= 0;i<typeList.length;i++){
                    if(typeList[i].key == val){
                        return typeList[i].val
                    }
                }
            },
            timeFilter(row,col,val){
               let timer = new Date(val).toLocaleDateString()+ ' '+new Date(val).toLocaleTimeString('chinese',{hour12:false})
                return timer
            },

            getInfoBtn(row){
                this.$router.push({
                    path:'/noticeInfo',
                    name:'noticeInfo',
                    params:{info:row}
                })
            },
            delBtn(row){
                let cnt = {
                    noticeId:row.id
                }
                this.$api.deleteNotice(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('删除成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        count: this.count, // Integer
                        offset: (this.page-1)*this.count, // Integer
                    }
                    this.getNotice(cnt)
                })
            },
			
			//搜索公告名称
			searchBtn() {
				this.page = 1
				let cnt = {}
				if (this.title) {
					cnt = {
						orgId: localStorage.getItem('orgId'),
						title: this.title,
						count: this.count,
						offset: (this.page - 1) * this.count,
					}
				} else {
					cnt = {
						orgId: localStorage.getItem('orgId'),
						count: this.count,
						offset: (this.page - 1) * this.count,
					}
				}
				this.getNotice(cnt)
			},
			
			
            changePage(page){
                this.page = page
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    count: this.count, // Integer
                    offset: (this.page-1)*this.count, // Integer
                }
                this.getNotice(cnt)
            }
        },
        mounted(){
            let cnt = {
                orgId: localStorage.getItem('orgId'), // Long 组织编号
                count: this.count, // Integer
                offset: this.offset, // Integer
            }
            this.getNotice(cnt)
        }
    }
</script>

<style scoped lang="scss">
    .nav-btn{
        float: left;
        margin-left: 15px;
    }
    .row-box{
        background: #fff;
        padding:15px 0;
        border-left: 4px solid #63a35c;
    }
    .row-box1{
        margin-top: 20px;
        padding: 15px;
        background: #fff;

    }
    .title-box{
        font-size: 16px;
        line-height: 30px;
        padding: 0 15px;

    }
    .content-box{
        margin-top: 10px;
    }
</style>
