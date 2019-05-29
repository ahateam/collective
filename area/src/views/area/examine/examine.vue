<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <div class="tab-box">
                    <div v-for="(item,index) in examineType" :key="index" style="float: left">
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click="changeTypeBtn(item.key)" v-if="type == item.key">{{item.val}}</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" type="info" @click="changeTypeBtn(item.key)" v-if="type != item.key">{{item.val}}</el-tag>
                    </div>
                </div>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
                <div class="tab-box">
                    <div v-for="(item,index) in examineStatus" :key="index" style="float: left">
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click="activeBtn(item.key)" v-if="isActive == item.key">{{item.val}}</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" type="info" @click="activeBtn(item.key)" v-if="isActive != item.key">{{item.val}}</el-tag>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row class="row-box1" >
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="type"
                            label="审批分类"
                            :formatter="typeFilter">
                    </el-table-column>
                    <el-table-column
                            prop="data"
                            label="被审批相关人"
                            :formatter="userFilter">
                    </el-table-column>
                    <el-table-column
                            prop="examineDate"
                            label="最近审批时间"
                            :formatter="timeFilter">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="审批状态"
                            :formatter="statusFilter"
                    >
                    </el-table-column>

                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="infoBtn(scope.row)" type="text" size="small" v-if="scope.row.status==1">开始审批</el-button>
                            <el-button @click="infoBtn(scope.row)" type="text" size="small" v-if="scope.row.status==2">更改证件</el-button>
                            <el-button @click="getShareBtn(scope.row)" type="primary" size="mini" v-if="scope.row.status==5">已取证</el-button>
                            <!--<el-button type="text" size="small" v-if="scope.row.status < 2" @click="delExamine(scope.row)"><span style="color: #f60;">撤回审批</span></el-button>-->
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


    </div>



</template>

<script>
    export default {
        name: "examine",
        data() {
            return {
                tableData:[],
                page:1,
                pageOver:false,
                count:10,
                offset:0,


                examineStatus:[{key:1,val:'等待审核'},{key:2,val:'区级初审通过'},{key:5,val:'等待取证'},{key:6,val:'已取证'}],
                examineType:[{key:1,val:'分户审批'},{key:2,val:'股权变更'}],
                isActive:1,
                type:1,

                activeRow:''

            }
        },
        methods:{
            getExamineByDisId(cnt){
                this.$area.getExamineByDisId(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableData = []
                    }
                    console.log(this.tableData)
                    if(this.tableData.length<this.count){
                        this.pageOver = true
                    }else{
                        this.pageOver = false
                    }
                })
            },



            typeFilter(row,col,val){
                if(val == '1'){
                    return '分户审批'
                }else if(val == '2'){
                    return '股权变更'
                }
            },
            userFilter(row,col,val){
                let arr = JSON.parse(JSON.stringify(JSON.parse(val).oldData))
                let str =''
                for(let i =0;i<arr.length;i++){
                    if(Array.isArray(arr[i])){
                        for(let j=0;j<arr[i].length;j++){
                            str = str+';'+arr[i][j].realName
                        }
                    }else {
                        str = str+';'+arr[i].realName
                    }
                }
                str = str.substr(1)
                return str
            },
            timeFilter(row,col,val){
                let  timer = new Date(val).toLocaleDateString()+ ' '+ new Date(val).toLocaleTimeString('chinese',{hour12:false})
                return timer

            },
            statusFilter(row,col,val){
                for(let i=0;i<this.$constData.examineStatus.length;i++){
                    if(val == this.$constData.examineStatus[i].key){
                        return this.$constData.examineStatus[i].val
                    }
                }
            },
            //已取证
            getShareBtn(row){

                this.$confirm('是否将此家庭户的审批状态更改为已经取证？')
                    .then(_ => {
                        let cnt={
                            examineId: row.id, // Long 任务编号
                            status: this.$constData.examineStatus[6].key, // Byte 状态
                        }
                        this.$area.editExamineStatus(cnt,(res)=>{
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                this.$message.success('操作成功')
                                this.changeList()
                            }else{
                                this.$message.error('操作失败')
                            }
                        })
                    })
                    .catch(_ => {});
            },

            //审批详情
            infoBtn(row){
                if(row.type == 1){
                    this.$router.push({
                        path:'/areaExamineInfo',
                        name:'areaExamineInfo',
                        params:{
                            info:row
                        }
                    })
                }

            },

            changeList(){

                let cnt={
                    districtId: localStorage.getItem('orgId'), // Long 组织编号
                    type: this.type, // Byte 类型
                    status: this.isActive, // Byte 状态
                    count: this.count, // Integer
                    offset: (this.page-1)*this.count, // Integer
                }
                this.getExamineByDisId(cnt)

            },

            changeTypeBtn(type){
                this.page = 1
                this.type = type
                this.changeList()
            },
            activeBtn(active){
                this.page = 1
                this.isActive = active
                this.changeList()
            },

            changePage(page){
                this.page = page
                let cnt={
                    districtId: localStorage.getItem('orgId'), // Long 组织编号
                    type: this.type, // Byte 类型
                    status: this.isActive, // Byte 状态
                    count: this.count, // Integer
                    offset: (this.page-1)*this.count, // Integer
                }
                this.getExamineByDisId(cnt)
            },



        },
        mounted(){

            let cnt={
                districtId: localStorage.getItem('orgId'), // Long 组织编号
                type: this.type, // Byte 类型
                status: this.isActive, // Byte 状态
                count: this.count, // Integer
                offset: this.offset, // Integer
            }
            this.getExamineByDisId(cnt)



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
        font-size: 1.6rem;
        color: #333;
        line-height: 40px;
    }
    .image-box {
        margin-left: 50px;
        width: 200px;
        height: 150px;
        overflow: hidden;
    }

    .image-box img {
        width: 200px;
        height: 150px;
        overflow: hidden;
        cursor: pointer;
    }

</style>
