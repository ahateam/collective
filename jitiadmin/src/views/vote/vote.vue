<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <router-link to="/voteInfo">
                    <el-button type="primary" class="nav-btn">新增会议</el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="24">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="会议标题">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="表决状态">
                        </el-table-column>
                        <el-table-column
                                prop="startTime"
                                label="开始时间"
                                :formatter="startTimeFilter">
                        </el-table-column>
                        <el-table-column
                                prop="expiryTime"
                                label="截止时间"
                                :formatter="startTimeFilter">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <!--<el-button @click="voteOption(scope.row)" type="text" size="small">选项管理</el-button>-->
                                <!--<el-button @click="editBtn(scope.row)" type="text" size="small">修改</el-button>-->
                                <el-button @click="voteInfo(scope.row)" type="text" size="small">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

            </el-col>
        </el-row>

        <el-dialog
                title="删除表决信息"
                :visible.sync="dialogVisible"
                width="30%">
            <span>是否确认删除该表决信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="delBtn" >确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="修改表决选项" :visible.sync="showDialog">

            <el-row>
                <el-col :span="24">

                    <el-tag
                            :key="tag.id"
                            v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag.id)"
                            type="primary"
                    >
                        {{tag.title}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >

                    </el-input>
                    <el-row  v-else class="row-box2">
                        <el-col :span="24">
                            <el-button class="button-new-tag" size="small" @click="showInput" type="primary">添加选项</el-button>
                        </el-col>
                    </el-row>

                </el-col>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="editOption">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    export default {
        name: "vote",
        data(){
            return{
                showDialog:false,

                delId:'',
                dialogVisible:false,
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                showInput:'',


                tableData:[],
                count:10,
                page:1

            }
        },
       methods:{
           del(row){
               this.delId = row.voteId
               this.dialogVisible = true
           },
           delBtn(){
               console.log(this.delId)
               this.dialogVisible = false
               this.$message({
                   showClose: true,
                   message: '删除成功',
                   type: 'warning'
               })
           },
           info(row){
                this.$router.push({
                    path:'/voteInfo',
                    name:'voteInfo',
                    params:{
                        voteId:row.voteId
                    }
                })
           },
           startTimeFilter(row,col,value){
               let dateTime = new Date(value)
               let dateTime1 = dateTime.toLocaleDateString()+ ' '+dateTime.toLocaleTimeString('chinese',{hour12:false})
               return dateTime1
           },
           typeFilter(row,col,value){
               if(value == '0'){
                   return '单选'
               }else {
                   return '多选'
               }
           },

           voteOption(row){
               let that = this
               console.log(row.id)

               let cnt = {
                   voteId: row.id,
               };
               this.$api.getVoteOptions(cnt,function (res) {
                   if(res.data.rc == that.$util.RC.SUCCESS){
                       let data = JSON.parse(res.data.c)
                       for(let i = 0; i<data.length;i++){

                           let obj = {
                               id:data[i].id,
                               title:data[i].title
                           }
                           that.dynamicTags.push(obj)
                       }
                   }
                   that.showDialog = true
               })
           },
           editOption(row){
                this.$router.push({
                    path:'/voteInfo',
                    name:'voteInfo',
                    params:{
                        info:row
                    }
                })
           },
           editBtn(row){
               this.$router.push({
                   path:'/voteEdit',
                   name:'voteEdit',
                   params:{
                        info:row
                   }
               })
           },

           voteInfo(row){
               this.$router.push({
                   path:'/voteInfo',
                   name:'voteInfo',
                   params:{
                       info:row
                   }
               })
           }
       },
        mounted(){
            let that = this
            let orgId = localStorage.getItem('orgId')
            let cnt = {
                orgId: orgId,
                isActive:true,
                count: this.count,
                offset:0
            };
            this.$api.getVoteProjectsByOrgId(cnt,function (res) {
                let data = JSON.parse(res.data.c)
                if(data != '' || data != undefined){
                    console.log(data)
                    let dataList = []
                    for(let i=0;i<data.started.length;i++){
                        let obj ={ status:'正在进行'}
                        let item = Object.assign(data.started[i],obj)
                        dataList.push(item)
                    }
                    for(let i=0;i<data.fininshed.length;i++){
                        let obj ={ status:'已结束'}
                        let item = Object.assign(data.fininshed[i],obj)
                        dataList.push(item)
                    }
                    for(let i=0;i<data.waiting.length;i++){
                        let obj ={ status:'等待开始'}
                        let item = Object.assign(data.waiting[i],obj)
                        dataList.push(item)
                    }
                    that.tableData = dataList
                }
            })


        }

    }
</script>

<style scoped lang="scss">
    .row-box{
        background: #fff;
        padding: 15px;
        font-size: 1.6rem;
        color: #666;
    }
    .nav-btn {
        float: left;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .el-tag{
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
    .row-box2{
        margin-top: 20px;
    }
</style>
