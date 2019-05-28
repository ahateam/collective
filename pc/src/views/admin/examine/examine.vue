<template>
    <div>
        <el-row class="row-box" >
                <el-col :span="24">
                    <div class="tab-box">
                        <el-tag style="cursor: pointer;" @click.native="changeTypeBtn(1)" v-if="type == 1">分户申请</el-tag>
                        <el-tag style="cursor: pointer;" type="info" @click.native="changeTypeBtn(1)" v-if="type != 1">分户申请</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click.native="changeTypeBtn(2)" v-if="type == 2">股权变更</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" type="info" @click.native="changeTypeBtn(2)" v-if="type != 2">股权变更</el-tag>

                    </div>
                </el-col>
                <el-col :span="24" style="margin-top: 10px">
                    <div class="tab-box">
                        <el-tag style="cursor: pointer;" @click.native="activeBtn(0)" v-if="isActive == 0">等待组织审批人审批</el-tag>
                        <el-tag style="cursor: pointer;" type="info" @click.native="activeBtn(0)" v-if="isActive != 0">等待组织审批人审批</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click.native="activeBtn(1)" v-if="isActive == 1">等待区级审批</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" type="info" @click.native="activeBtn(1)" v-if="isActive != 1">等待区级审批</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click.native="activeBtn(2)" v-if="isActive == 2">开始制证</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" type="info" @click.native="activeBtn(2)" v-if="isActive != 2">开始制证</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click.native="activeBtn(3)" v-if="isActive == 3">制证成功</el-tag>
                        <el-tag type="info" style="margin-left: 20px;cursor: pointer;" @click.native="activeBtn(3)" v-if="isActive != 3">制证成功</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click.native="activeBtn(4)" v-if="isActive == 4">制证失败</el-tag>
                        <el-tag type="info" style="margin-left: 20px;cursor: pointer;" @click.native="activeBtn(4)" v-if="isActive != 4">制证失败</el-tag>
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
                            <el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
                            <el-button type="text" size="small" v-if="scope.row.status < 2" @click="delExamine(scope.row)"><span style="color: #f60;">撤回审批</span></el-button>
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


                isActive:0,
                type:1,


            }
        },
        methods:{
            getExamine(cnt){
                this.$api.getExamine(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableData = []
                    }
                    if(this.tableData.length<this.count){
                        this.pageOver = true
                    }else{
                        this.pageOver = false
                    }

                })
            },



            typeFilter(row,col,val){
                console.log(val)
                if(val == '1'){
                    return '分户审批'
                }else if(val == '2'){
                    return '股权变更'
                }
            },
            userFilter(row,col,val){
                let arr = JSON.parse(val).oldData
                console.log(arr)
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

            //撤回审批
            delExamine(row){
              console.log(row)


            },
            //审批详情
            infoBtn(row){
                console.log(row)
            },

            changeList(){
                let cnt={
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    type: this.type, // Byte 类型
                    status: this.isActive, // Byte 状态
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                }
                this.getExamine(cnt)

            },

            changeTypeBtn(type){
                this.type = type
                this.page = 1
                this.changeList()
            },
            activeBtn(active){
                this.isActive = active
                this.page = 1
                this.changeList()
            },

            changePage(page){
                this.page = page
                let cnt={
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    type: this.type, // Byte 类型
                    status: this.isActive, // Byte 状态
                    count: this.count, // Integer
                    offset: (this.page-1)*this.count, // Integer
                }
                this.getExamine(cnt)
            },

        },
        mounted(){
            let cnt={
                orgId: localStorage.getItem('orgId'), // Long 组织编号
                type: this.type, // Byte 类型
                status: this.isActive, // Byte 状态
                count: this.count, // Integer
                offset: this.offset, // Integer
            }
            this.getExamine(cnt)
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
