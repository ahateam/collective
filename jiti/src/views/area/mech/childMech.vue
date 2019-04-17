<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <div class="tab-box">
                    <el-tag style="cursor: pointer;" @click="activeBtn(0)" v-if="isActive == 0">正在申请</el-tag>
                    <el-tag style="cursor: pointer;" type="info" @click="activeBtn(0)" v-if="isActive != 0">正在申请</el-tag>
                    <el-tag style="margin-left: 20px;cursor: pointer;" @click="activeBtn(3)" v-if="isActive == 3">再次申请</el-tag>
                    <el-tag style="margin-left: 20px;cursor: pointer;" type="info" @click="activeBtn(3)" v-if="isActive != 3">再次申请</el-tag>
                    <el-tag style="margin-left: 20px;cursor: pointer;" @click="activeBtn(1)" v-if="isActive == 1">成功申请</el-tag>
                    <el-tag type="info" style="margin-left: 20px;cursor: pointer;" @click="activeBtn(1)" v-if="isActive != 1">成功申请</el-tag>
                    <el-tag style="margin-left: 20px;cursor: pointer;" @click="activeBtn(2)" v-if="isActive == 2">失败申请</el-tag>
                    <el-tag type="info" style="margin-left: 20px;cursor: pointer;" @click="activeBtn(2)" v-if="isActive != 2">失败申请</el-tag>
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
                            prop="name"
                            label="机构名称"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="组织机构代码">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="机构具体层级">
                    </el-table-column>
                    <el-table-column
                            prop="examine"
                            label="申请状态"
                            :formatter="statusFliter">
                    </el-table-column>

                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
                            <el-button type="text" size="small" @click="editStatusBtn(scope.row)">修改审核</el-button>
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

        <el-dialog title="机构详情" :visible.sync="infoShow">

                <el-col :span="24">
                    <el-col :span="6">
                        <div class="title-box">机构名称:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box" >
                            {{info.name}}
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <div class="title-box">机构层级:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            {{info.province}}{{info.city}}{{info.district}}
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <div class="title-box">机构地址:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            {{info.address}}
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <div class="title-box">机构代码:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            {{info.code}}
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <div class="title-box">总股份数:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            {{info.shareAmount}}
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <div class="title-box">机构证书:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="image-box">
                            <img :src="info.imgOrg" alt="">
                        </div>
                    </el-col>
                </el-col>
            <el-col :span="24">
                <el-col :span="6">
                    <div class="title-box">授权证书:</div>
                </el-col>
                <el-col :span="18">
                    <div class="image-box">
                        <img :src="info.imgAuth" alt="">
                    </div>
                </el-col>
            </el-col>

            <el-col :span="24" style="margin-top: 10px">
                <el-col :span="6">
                    <div class="title-box">更改审核:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-select v-model="examine" placeholder="选择更改状态">
                            <el-option
                                    v-for="item in examineList"
                                    :key="item.key"
                                    :label="item.val"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>

                </el-col>
            </el-col>

            <div slot="footer" class="dialog-footer">
                <el-button @click="infoShow = false">取 消</el-button>
                <el-button type="primary" @click="Btn">确认审核</el-button>
            </div>
        </el-dialog>


        <el-dialog title="修改审核" :visible.sync="statusShow">
            <el-form >
                <el-col :span="6">
                    <div class="title-box">更改审核:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-select v-model="examine" placeholder="选择更改状态">
                            <el-option
                                    v-for="item in examineList"
                                    :key="item.key"
                                    :label="item.val"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>

                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="statusShow = false">取 消</el-button>
                <el-button type="primary" @click="Btn">确 定</el-button>
            </div>
        </el-dialog>

    </div>



</template>

<script>
    export default {
        name: "mech",
        data() {
            return {
                tableData:[],
                page:1,
                pageOver:false,

                count:10,
                offset:0,

                isActive:0,
                infoShow:false,
                info:'',
                examine:'',
                examineList:[
                    {key:0,val:'正在申请'},{key:3,val:'再次申请'},{key:1,val:'申请通过'},{key:2,val:'申请失败'}
                ],
                statusShow:false,



            }
        },
        methods:{
            changePage(page){
                this.page = page
                let offset = (page-1)*this.count
                let cnt = {
                    areaId: localStorage.getItem('mechId'),
                    examine:this.isActive,
                    count: this.count, // Integer
                    offset: offset, // Integer
                }
                this.$area.getORGExamine(cnt, (res)=> {
                    this.tableData = JSON.parse(res.data.c)
                    if(this.tableData.length < this.count){
                        this.pageOver = true
                    }else{
                        this.pageOver = false
                    }
                })
            },

            activeBtn(index){
                this.isActive= index
                this.page = 1
                let cnt = {
                    areaId: localStorage.getItem('mechId'),
                    examine:this.isActive,
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                }
                this.$area.getORGExamine(cnt, (res)=> {

                    this.tableData = this.$util.tryParseJson(res.data.c)
                    if(this.tableData.length < this.count){
                        this.pageOver = true
                    }else{
                        this.pageOver = false
                    }
                })
            },
            statusFliter(row,col,value){
                if(value == '0'){
                    return '正在申请'
                }else if(value == '1'){
                    return '申请成功'
                }else if(value == '3'){
                    return '再次申请审核'
                }else {
                    return '申请失败'
                }
            },
            //详情
            infoBtn(info){
                this.info = info
                this.infoShow = true
                this.examine = this.info.examine
            },
            editStatusBtn(info){
                this.info = info
                this.statusShow = true
                this.examine = this.info.examine
            },
            //审核
            Btn(){
                let cnt ={
                    orgExamineId:  this.info.id,
                    userId:  this.info.userId,
                    name:  this.info.name,
                    code:  this.info.code,
                    province:  this.info.province,
                    city:  this.info.city,
                    district:  this.info.district,
                    address:  this.info.address,
                    imgOrg:  this.info.imgOrg,
                    imgAuth:  this.info.imgAuth,
                    shareAmount:  this.info.shareAmount,
                    examine: this.examine,
                }

                this.$area.upORGApply(cnt,(res)=> {
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                    this.$router.push('/page')
                })
            },
        },
        mounted(){
            let cnt = {
                areaId: localStorage.getItem('mechId'),
                examine:this.isActive,
                count: this.count,
                offset: this.offset,
            }
            this.$area.getORGExamine(cnt, (res)=> {
                this.tableData = this.$util.tryParseJson(res.data.c)
                if(this.tableData.length < this.count){
                    this.pageOver = true
                }else{
                    this.pageOver = false
                }
            })

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
