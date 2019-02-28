<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <el-button type="primary" class="nav-btn" @click="addShow = true">+新增标签</el-button>
                <!--<el-button type="warning" class="nav-btn" @click="addSystemShow1 = true">+自定义标签分组</el-button>-->
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row class="row-box-tilte">
                <el-col :span="6">
                    <div class="col-title-box">
                        标签列表
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="tab-box">
                        <el-button :type="status==1?'primary':''" size="mini" @click="change()">已启用</el-button>
                        <el-button :type="status==0?'primary':''" size="mini"  @click="change()">已禁用</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-col :span="24">
                <template>
                    <el-table
                            :data="list"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="标签名">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">

                                <el-button  type="text" size="small" v-if="status == 0" @click="enableBtn(scope.row)">启用</el-button>
                                <!--<el-button @click="load(scope.row)" type="text" size="small">下载</el-button>-->
                                <el-button @click="disableBtn(scope.row)" type="text" size="small"  v-if="status ==1"><span style="color: #f56c6c;">禁用</span></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>

            <el-col :span="24" >
                <!--<div class="page-btn">-->
                <!--<span class="page-text">当前页码：<span style="color: #f60;">{{page}}</span> 页</span>-->
                <!--<el-button type="primary" :disabled="page==1"   @click="changePage(0)">上一页</el-button>-->
                <!--<el-button type="primary" :disabled="pageOver ==true"  @click="changePage(1)">下一页</el-button>-->
                <!--</div>-->
            </el-col>
        </el-row>

        <el-dialog
            title="新增标签"
            :visible.sync="addShow"
            width="45%"
            center>
            <span>
                <el-row>
                        <div class="title-box">标签名：</div>
                        <div class="input-box">
                                    <el-input v-model="name" placeholder="请输入标签名"></el-input>
                        </div>
                </el-row>
            </span>
        <span slot="footer" class="dialog-footer">
                <el-button @click="addSystemShow = false">取 消</el-button>
                <el-button type="primary" @click="addTag">确 定</el-button>
              </span>
    </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "tagSet",
        data(){
            return{
                list:[],
                status:1,
                offset:0,
                count:10,
                addShow:false,
                name:'',



            }
        },
        methods:{
            enableBtn(info){

                let that = this
                let cnt = {
                    userId: localStorage.getItem('userId'), // Long 用户编号
                    groupKeyword: this.$store.state.groupKeyword, // String 标签分组关键字
                    name: info.name, // String 标签名称
                }
                this.$util.call('/tag/enableTag',cnt,function (res) {
                    if(that.$util.RC.SUCCESS == res.data.rc){
                        that.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                    }else{
                        that.$message.error('操作失败')
                    }
                    that.$router.push('/page')
                })
            },
            disableBtn(info){
                console.log(info)
                let that = this
                let cnt = {
                    userId: localStorage.getItem('userId'), // Long 用户编号
                    groupKeyword: this.$store.state.groupKeyword, // String 标签分组关键字
                    name: info.name, // String 标签名称
                }
                this.$util.call('/tag/disableTag',cnt,function (res) {
                    if(that.$util.RC.SUCCESS == res.data.rc){
                        that.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                    }else{
                        that.$message.error('操作失败')
                    }
                    that.$router.push('/page')
                })


            },
            //新增标签
            addTag(){
                let that = this
                let cnt = {
                    userId:localStorage.getItem('userId'),
                    groupKeyword:this.$store.state.groupKeyword,
                    name:this.name
                }
                this.$util.call('/tag/createTag',cnt,function (res) {
                   if(that.$util.RC.SUCCESS == res.data.rc) {
                       that.$message({
                           message: '新增标签成功',
                           type: 'success'
                       });
                   }else{
                       that.$message.error('新增失败');
                   }
                })
                this.addShow = false
            },


            change(){
                let that = this
                if(this.status == 1){
                    this.status = 0
                }else{
                    this.status = 1
                }
                let cnt = {
                    userId :localStorage.getItem('userId'),
                    groupKeyword:this.$store.state.groupKeyword,
                    status:this.status
                }
                this.$util.call('/tag/getTags',cnt,function (res) {
                    if(res.data.c !='{}'){

                        let data = JSON.parse(res.data.c)
                        console.log(data);
                        let list = data.sys_content_tag
                        let tableList = []
                        for(let i=0;i<list.length;i++){
                            let obj = {
                                name:list[i]
                            }
                            tableList.push(obj)
                        }
                        that.list = tableList
                    }else{
                        that.list = []
                    }
                })


            }
        },
        mounted(){
            let that = this

            let cnt = {
                userId :localStorage.getItem('userId'),
                groupKeyword:this.$store.state.groupKeyword,
                status:this.status
            }

            this.$util.call('/tag/getTags',cnt,function (res) {
                if(res.data.c !='{}'){

                    let data = JSON.parse(res.data.c)
                    console.log(data);
                    let list = data.sys_content_tag
                    let tableList = []
                    for(let i=0;i<list.length;i++){
                        let obj = {
                            name:list[i]
                        }
                        tableList.push(obj)
                    }
                    that.list = tableList
                }else{
                  that.list = []
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .row-box {
        background: #fff;
        padding: 15px 0;
    }

    .nav-btn {
        float: left;
        margin-left: 15px;
    }
    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .row-box-tilte{
        background: #fff;

        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;
        margin-bottom: 15px;
    }
    .col-title-box{
        padding:15px;
    }
    .tab-box{
        line-height: 50px;
    }
    .tab{
        cursor: pointer;
    }
    .title-box{
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 1.4rem;
        color: #333;

    }
    .input-box{
        width: auto;
        float: left;
        margin-left: 20px;
    }
</style>
