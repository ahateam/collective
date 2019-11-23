<template>
    <div >

        <el-row class="row-box1">
            <el-col :span="4">
                <span style="line-height: 40px;color: #666;font-size: 1.6rem;width: auto;text-align: center;display: block">
                    搜索股东
                </span>
            </el-col>
            <el-col :span="12">
                <el-input placeholder="请输入股东姓名或者身份证号" v-model="searchData" >
                    <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                </el-input>
            </el-col>

        </el-row>
        <el-row class="row-box1" style="margin-top:0 ">
            <el-col :span="24" >
                <template>
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                    >
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="orgUser.familyNumber"
                                label="户序号">
                        </el-table-column>
                        <el-table-column
                                prop="user.realName"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="user.idNumber"
                                label="身份证号">
                        </el-table-column>
                        <el-table-column
                                prop="orgUser.roles"
                                label="职务"
                                :formatter="roleFilter">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                        >
                            <template slot-scope="scope">
                                <el-button @click="setUserBtn(scope.row)" type="text" size="small">选择股东用户</el-button>

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
        name: "shareUserList",
        data(){
            return{
                count:10,
                offset:0,
                page:1,
                pageOver:false,
                tableData:[],
                searchData:'',
                roleList:[],    //职务列表
            }
        },
        methods:{
            getSysORGUserRoles(cnt){
                this.$api.getSysORGUserRoles(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.roleList =this.$util.tryParseJson(res.data.c)
                    }else{
                        this.roleList = []
                    }
                })
            },
            getORGUsers(cnt){
              this.$api.getORGUsers(cnt,(res)=>{
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
            getORGUsersLikeIDNumber(cnt){
                this.$api.getORGUsersLikeIDNumber(cnt,(res)=>{
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
            getORGUsersLikeRealName(cnt){
                this.$api.getORGUsersLikeRealName(cnt,(res)=>{
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

            //搜索
            searchBtn(){
                this.page = 1
                if(this.searchData == ''){
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        count: this.count, // Integer
                        offset: (this.page-1)*this.count, // Integer
                    }
                    this.getORGUsers(cnt)

                }else{
                    let data = this.searchData.substr(0,1)
                    if(isNaN(data) == false){
                        let orgId = localStorage.getItem('orgId')
                        let cnt = {
                            orgId:orgId,
                            idNumber:this.searchData,
                            count:this.count,
                            offset:this.offset
                        }
                        this.getORGUsersLikeIDNumber(cnt)

                    }else{

                        let orgId = localStorage.getItem('orgId')
                        let cnt = {
                            orgId:orgId,
                            realName:this.searchData,
                            count:this.count,
                            offset:this.offset
                        }
                        this.getORGUsersLikeRealName(cnt)
                    }
                }

            },
            //分页
            changePage(page){
                this.page = page
                if(this.searchData == ''){
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        count: this.count, // Integer
                        offset: (this.page-1)*this.count, // Integer
                    }
                    this.getORGUsers(cnt)
                }else {
                    let data = this.searchData.substr(0,1)
                    if(isNaN(data) == false){
                        let orgId = localStorage.getItem('orgId')
                        let cnt = {
                            orgId:orgId,
                            idNumber:this.searchData,
                            count:this.count,
                            offset:(this.page-1)*this.count
                        }
                        this.getORGUsersLikeIDNumber(cnt)

                    }else{

                        let orgId = localStorage.getItem('orgId')
                        let cnt = {
                            orgId:orgId,
                            realName:this.searchData,
                            count:this.count,
                            offset:(this.page-1)*this.count
                        }
                        this.getORGUsersLikeRealName(cnt)
                    }
                }
            },

            setUserBtn(row){
                console.log(row)
				this.$store.state.nowPage = this.page
                this.$router.push({
                    path:'/share',
                    name:'share',
                    params:{
                        info:row
                    }
                })
            },
            roleFilter(row, col, value) {
                let arr = JSON.parse(value)   //取出默认的全部是id的数组
                let name = '';
                for (let i = 0; i < arr.length; i++) {
                    let name1 = ''
                    for (let j = 0; j < this.roleList.length; j++) {
                        if (arr[i] == this.roleList[j].roleId) {
                            name1 = this.roleList[j].name
                        }
                    }
                    name += ';'
                    name += name1
                }
                return name.substr(1)


            },
        },
        mounted(){
			this.page =this.$store.state.nowPage 
            let cnt ={}
            // 请求职位列表
            this.getSysORGUserRoles(cnt)
            let cnt1 = {
                orgId: localStorage.getItem('orgId'), // Long 组织编号
                count: this.count, // Integer
                offset: (this.page-1)*this.count, // Integer
            };
            this.getORGUsers(cnt1)
        }

    }
</script>

<style scoped lang="scss">
    .nav-btn {
        float: left;
        margin-left: 15px;
    }

    .row-box {
        background: #fff;
        padding: 15px 0;
        border-left: 4px solid #63a35c;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;

    }

    .title-box {
        font-size: 16px;
        line-height: 30px;
        padding: 0 15px;

    }

    .content-box {
        margin-top: 10px;
    }

    .table-title {
        line-height: 40px;
        color: #666;
        font-size: 16px
    }

    .table-del {
        line-height: 40px;
        color: #f44;
        font-size: 20px;
        float: right;
        margin-right: 20px;
        padding: 0 20px;
        cursor: pointer;
    }

    .table-del i {
        font-size: 25px;
    }

    .table-add {
        float: right;
        line-height: 40px;
    }

    .table-master {
        font-size: 14px;
        margin-left: 20px;
        line-height: 40px;
        color: #666;
    }

    .box{
        background: #fff;
        padding: 15px;
    }
    .el-tree-node__content{
        width: 100%;
        height: 32px !important;
        line-height: 32px;
    }
    .custom-tree-node{
        width: 100%;
        line-height: 32px;
        height: 32px;
        margin: 10px 0;
    }
    .label-box{
        float: left;
        width: 150px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 600;
    }
    .icon-box{
        float: right;
        width: 50px ;
        height: 32px;
        z-index: 100;
        background: #fff;
    }

    .el-tree-node:focus>.el-tree-node__content{
        background:#00a0e9 !important;
        border-bottom: 1px solid #ddd;
    }

    .page-text{
        line-height: 4rem;
        margin-left: 2rem;
        margin-right: 2rem;
        font-size: 1.6rem;
        color: #555;
    }
    .page-btn{
        margin-top: 2rem;
        margin-bottom: 1rem;
        float: right;
        margin-right: 5rem;
    }
    .line-title{
        float: left;
        width: 5rem;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #666;

    }
    .line{
        width: 90%;
        height: 3rem;
        margin-top: 2rem;
        margin: 0 auto;
    }
    .line-box{
        width: auto;
        padding-top: 1.2rem;
        margin-left: 6rem;
    }
    .line-text{
        width: auto;
        height: 3rem;
        color:rgb(76, 174, 76);
        margin-left: 6rem;
        line-height: 3rem;
        font-size: 1.4rem;
    }


    .file-msg{
        width: 90%;
        margin: 0 auto;
        height: 2rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #f60;
        margin-bottom:1rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .fine-name{
        width: 90%;
        margin: 0 auto;
        margin-top: 2rem;
        font-size: 1.4rem;
        height: 2rem;
        line-height: 2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
    .upload-btn{
        margin-left: 5%;
        margin-top: 1rem;
    }
    .input-file-box{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5rem;
        opacity: 0;
    }

    .icon-text{
        display: block;
        float: left;
        width: 50%;
        height: 5rem;
        text-align: left;
        line-height: 5rem;
    }
    .file-box{
        margin: 0 auto;
        width: 90%;
        height: 5rem;
        border: 1px dashed #f4516c;
        position: relative;

    }
    .col-title-box{
        padding:15px;
    }
    .tab-btn{
        margin-left: 15px;
        line-height: 50px;
        padding: 5px 15px;
        border-radius: 5px;
        font-size: 1.4rem;
        border: 1px solid #409EFF;
        color: #409EFF;
        cursor: pointer;
        background: #fff;
    }
    .tab-btn-active{
        background:#409EFF;
        color: #fff;
    }
    .groups-box {
        width: 100%;
        line-height: 2rem;
        font-size: 1.6rem;
        color: #666;
    }
    .post-list{
        width: auto;
        height: 2rem;
        padding: 1rem;
        border-bottom: 1px solid #eee;
        line-height: 2rem;
        color: #333;
        font-size: 1.4rem;
        font-weight: 500;
    }
    .post-list:hover{
        background: rgb(236,245,255);
    }
    .post-list:active{
        color: #333;
        font-weight: 600;
    }
    .post-active{
        color: #333;
        font-weight: 600;
        background: rgb(236,245,255);
    }
</style>
