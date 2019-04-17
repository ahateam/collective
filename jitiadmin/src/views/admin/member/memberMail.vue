<template>
    <div class="box">
        <el-row :gutter="40">
            <el-col :span="10"   style="overflow: hidden">
                <template>
                    <el-tabs v-model="active" @tab-click="handleClick">
                        <el-tab-pane label="分组管理" name="groups">
                            <el-col :span="24">
                                <el-button type="info" @click="addChild">+新增分组</el-button>
                            </el-col>
                            <el-col :span="24">
                                <el-tree
                                        v-if="groups != ''"
                                        :data="groups"
                                        node-key="groupId"
                                        :props="defaultProps"
                                        default-expand-all
                                        :expand-on-click-node="false"
                                        @node-click="handleNodeClick">
                                    <div  class="custom-tree-node " slot-scope="{ node, data }">
                                        <div class="label-box">{{ node.label }}</div>
                                        <div class="icon-box">

                                            <el-button
                                                    type="text"
                                                    size="mini"
                                                    @click="() => append(node,data)">
                                                <i class="el-icon-plus" ></i>
                                            </el-button>
                                            <el-button
                                                    type="text"
                                                    size="mini"
                                                    @click="() => remove(node, data)">
                                                <i class="el-icon-minus" style="color: #f60;"></i>
                                            </el-button>
                                        </div>
                                    </div>
                                </el-tree>

                            </el-col>
                        </el-tab-pane>
                        <el-tab-pane label="标签管理" name="tags">
                            <el-col :span="24" >
                                标签分组管理
                            </el-col>
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </el-col>
            <el-col :span="14" style="border-left: 1px solid #ddd">
                <el-row>
                    <p>当前选中分组：{{nowNode}}  </p>
                    <p>
                        <el-button type="primary" size="mini" @click="addMemberModal = true">添加成员</el-button>
                        <el-button type="primary" size="mini"  @click="loadExcl">用户表模板下载</el-button>
                        <el-button type="primary" size="mini" @click="importUserModal =true">批量导入</el-button>
                        <el-button type="warning" size="mini" @click="delMore">删除</el-button>
                    </p>
                </el-row>
                <el-row>
                    <el-col :span="24" >
                        <template>
                            <el-table
                                    ref="multipleTable"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="user.realName"
                                        label="姓名">
                                </el-table-column>
                                <el-table-column
                                        prop="user.mobile"
                                        label="手机">
                                </el-table-column>
                                <el-table-column
                                        prop="orgUser.roles"
                                        label="职务"
                                        :formatter="roleFilter">
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                        <el-button type="text" size="small">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>

                        <p>
                            当前第 {{page}} 页
                            <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(0)">上一页</el-button>
                            <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(1)">下一页</el-button>
                        </p>
                    </el-col>

                </el-row>
            </el-col>
        </el-row>

        <el-dialog
                title="导入成员"
                :visible.sync="importUserModal"
                width="30%"
                :before-close="handleClose"
                center
                @close="closeBtn">
            <span>
                        <div class="file-msg">
                            目前只支持后缀为 '.xlsx'的Excl文件.
                        </div>
                        <div class="file-box">
                            <span class="icon-box"><i class="el-icon-upload"></i></span> <span class="icon-text">上传文件</span>
                             <input type="file" class="input-file-box" @change="fileBtn($event)">
                        </div>

                        <div class="fine-name" v-if="fileName != ''">
                            文件名：{{fileName}}
                        </div>

                        <div class="line" v-if="num >0 && num<100">
                            <div class="line-title">上传进度:</div>
                            <div class="line-box">
                                <el-progress :percentage="num"></el-progress>
                            </div>
                        </div>

                        <div class="line" v-if="num == 100">
                            <div class="line-title">上传进度:</div>
                            <div class="line-text">
                                上传成功！
                            </div>
                        </div>



            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="importUserModal = false">取 消</el-button>
                <el-button type="primary"   @click="doUpload">确认导入数据</el-button>
            </span>
        </el-dialog>
        <!--新增成员-->
        <el-dialog title="新增成员" :visible.sync="addMemberModal">
            <el-form>
                <el-form-item label="成员名称" label-width="100px">
                    <el-input v-model="name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" label-width="100px">
                    <el-input v-model="idNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" label-width="100px">
                    <el-input v-model="mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="表决权重" label-width="100px">
                    <el-input v-model="weight" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="股份数量" label-width="100px">
                    <el-input v-model="shareAmount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMemberModal = false">取 消</el-button>
                <el-button type="primary" @click="addMemberBtn">确 定</el-button>
            </div>
        </el-dialog>
        <!--新增分组-->
        <el-dialog title="新增分组" :visible.sync="addgroupModal">
            <el-form>
                <el-form-item label="分组关键字" label-width="100px">
                    <el-input v-model="keywordAdd" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addgroupModal = false">取 消</el-button>
                <el-button type="primary" @click="addGroupBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ossAuth from '@/assets/api/oss/ossAuth'
    let client = ossAuth.client

    export default {

        name: "memberMail",
        data(){
            return {
                addMemberModal:false, //新增用户弹窗
                importUserModal:false,  //导入用户弹出框
                fileName:'',    //文件上传
                fileData:[],
                url:'',         //文件的线上地址
                num:0,          //上传进度
                multipleSelection:[],


                //用户列表
                offset:0,
                count:10,
                tableData:[],
                page:1,
                pageOver:false,
                //上一页下一页 之前请求的数据
                requestData:'',


                //新增成员
                name:'',
                idNumber:'',
                mobile:'',
                weight:'',
                shareAmount:'',

                active:'',  //选中的tab

                //分组+标签+用户列表 管理
                nowNode:'',

                defaultProps: {
                    children: 'childs',
                    label: 'keyword'
                },
                orgName:'',         //默认最高级分组（机构名）
                activeGroupId:'',   //选中的tabid:groupId
                tags:[],
                groups:'',          //分组数据
                addgroupModal:false,        //新增分组弹窗
                keywordAdd:'',               //新增分组的关键字
                parentsAdd:'',              //新增的父节点组信息
                parentId:'',                //新增的父节点信息




            }
        },
        methods:{
            loadExcl(){
              window.location.href="/用户模板.xlsx"
            },


            //导入用户文件上传相关
            //关闭弹出框，重置上传的文件的相关变量
            closeBtn(){
                this.fileName = ''
                this.fileData = []
                this.url = ''
            },
            //讲已经导入到oss的文件传递给服务端进行数据库导入
            importUsers(){
                let that = this
                if(that.url != '' || that.url != undefined){
                    let cnt = {
                        orgId:localStorage.getItem('orgId'),
                        url:this.url
                    }
                    this.$api.importORGUsers(cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS ){
                            that.$message({
                                message: '导入成功',
                                type: 'success'
                            });
                            that.$router.push('/page')
                        }else{
                            that.$message.error('导入失败，文件有误');
                            that.$router.push('/page')
                        }
                    })

                }
            },
            //进度条
            getProgress(p){
                this.num = p
            },
            //开始导入到oss
            doUpload() {
                let files = []
                files[0] = this.fileData[0]

                // this.$emit('getProgress', 0)
                this.getProgress(0)
                let file =files
                this.size = file[0].size
                let tmpName = encodeURIComponent(file[0].name)
                tmpName =this.address+ tmpName

                console.log(tmpName)

                this.multipartUpload(tmpName, file[0])
            },
            //分片上传
            multipartUpload(upName, upFile) {
                //Vue中封装的分片上传方法（详见官方文档）
                let _this = this
                const progress = async function (p) {
                    //项目中需获取进度条，故调用进度回调函数（详见官方文档）
                    // _this.$emit('getProgress', Math.round(p * 100))
                    _this.getProgress(Math.round(p * 100))
                }
                try {
                    let result = client.multipartUpload(upName, upFile, {
                        progress,
                        meta: {
                            year: 2017,
                            people: 'test'
                        }
                    }).then(res => {
                        //导入用户
                        _this.url  = res.res.requestUrls[0]
                        _this.importUsers()

                    }).catch(err => {
                        console.log(result)
                        console.log(err)
                    });

                } catch (e) {
                    // 捕获超时异常
                    if (e.code === 'ConnectionTimeoutError') {
                        console.log("Woops,超时啦!");
                    }
                    console.log(e)
                }
            },
            // 获取文件名显示
            fileBtn(ev){
                this.fileData= ev.target.files
                this.fileName = this.fileData[0].name
            },
            handleClose(done){
                done();
            },
            delMore(){
                console.log(this.multipleSelection)
            },

            //新增用户
            addMemberBtn(){
               console.log('111')

            },
            //分组相关操作
            //新增分组根节点
            addChild(){
                this.keywordAdd = ''
                this.addgroupModal = true
                this.parentsAdd = [this.activeGroupId]
                this.parentId = this.activeGroupId
            },

            handleNodeClick(data,node) {
                console.log(node.key);
                this.nowNode = node.label;
            },
            append( node,data) {
                // appendData
                console.log(data)
                this.keywordAdd = ''
                this.addgroupModal = true
                this.parentId = data.groupId
                this.parentsAdd = JSON.parse(data.parents)
                this.parentsAdd.push(this.parentId)
                console.log(this.parentsAdd)
            },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //分组+标签+用户列表 操作

            // activeGroup(blo){
            //     this.isGroup = blo
            //     if(blo){
            //         this.activeGroupId = this.tags[0].groupId
            //     }else{
            //         this.activeGroupId = this.tags[1].groupId
            //     }
            //
            //
            // },

            //过滤用户职务
            roleFilter(row,col,value){
                let arr = JSON.parse(value)   //取出默认的全部是id的数组
                let name = '';
                for(let i = 0;i<arr.length;i++){
                    let name1 = ''
                    for(let j =0;j<this.roleList.length;j++){
                        if(arr[i] == this.roleList[j].roleId){
                            name1 = this.roleList[j].name
                        }
                    }
                    name += ';'
                    name += name1
                }
                return name.substr(1)


            },
            //新增分组
            addGroupBtn(){
                let that = this
                if(this.keywordAdd == ''){
                    this.$message.error('请输入分组名')
                }else{
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        parentId:this.parentId,
                        parents:this.parentsAdd, // JSONArray 分组父节点编号数组，JSONArray格式。节点顺序自顶向下
                        keyword: this.keywordAdd, // String 分组关键字
                        remark: this.keywordAdd, // String
                    }
                    this.$api.createORGUserTagGroup(cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            that.$router.push('/page')
                        }
                    })
                }
            },
            //切换左侧tab
            handleClick(tab, event) {
                console.log(tab, event);
                let that = this
                this.$store.state.memberActive = tab.name
                this.active = this.$store.state.memberActive
                this.roleActive = ''                        //将选中的角色置空

                let cnt={
                    orgId:localStorage.getItem('orgId'),
                    count:this.count,
                    offset:this.offset
                }
                this.$api.getORGUsers(cnt,function (res) {
                    that.tableData = JSON.parse(res.data.c)
                    if(that.tableData.length <that.count){
                        that.pageOver = true
                    }else{
                        that.pageOver = false
                    }
                })

            },

            //更换职务请求用户列表
            roleChange(info){
                let that = this
                this.roleActive = info
                this.count = 10
                this.offset = 0
                this.page = 1
                let roles=[info.roleId]


                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    roles: roles, // JSONArray <选填> 角色权限列表,JSONArray格式
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                };
                //请求对应的角色列表
                console.log(cnt)
                this.$api.getORGUserByRole(cnt,function (res) {
                    that.tableData = JSON.parse(res.data.c)
                    if(that.tableData.length <that.count){
                        that.pageOver = true
                    }else{
                        that.pageOver = false
                    }
                })
            },
            //上一页下一页
            changePage(key){
                let that = this

                if(key == 0){   //上一页
                    this.page = this.page-1
                }else{          //下一页
                    this.page = this.page+1
                }
                let offset = (this.page-1 )* this.count


                //请求所有的用户的分页
                if(this.active == 'groups'){
                    console.log('groups')

                }else if(this.active == 'tags'){
                    console.log('tags')

                }else if(this.active == 'post'){        //角色请求
                    if(this.roleActive != ''){

                        let roles=[this.roleActive.roleId]

                        let cnt = {
                            orgId: localStorage.getItem('orgId'), // Long 组织编号
                            roles: roles, // JSONArray <选填> 角色权限列表,JSONArray格式
                            count: this.count, // Integer
                            offset: offset, // Integer
                        };

                        console.log(cnt);
                        //请求对应的角色列表
                        this.$api.getORGUserByRole(cnt,function (res) {
                            that.tableData = JSON.parse(res.data.c)
                            if(that.tableData.length <that.count){
                                that.pageOver = true
                            }else{
                                that.pageOver = false
                            }
                        })
                    }else{

                        let cnt = {
                            orgId:localStorage.getItem('orgId'),
                            offset:offset,
                            count:this.count
                        }
                        this.$api.getORGUsers(cnt,function (res) {
                            that.tableData = JSON.parse(res.data.c)

                            if(that.tableData.length <that.count){
                                that.pageOver = true
                            }else{
                                that.pageOver = false
                            }
                        })
                    }

                }



            }
        },
      mounted(){
            let that = this
            let that1 = this
            let cnt ={}
            //默认选中tab
            this.active = this.$store.state.memberActive
            this.$api.getORGUserSysTagGroups(cnt,function (res) {

                that.tags = JSON.parse(res.data.c)
                that.activeGroupId = that.tags[0].groupId
                let cnt = {
                    groupId: that.activeGroupId,
                    orgId: localStorage.getItem('orgId')
                }
                //请求分组列表
                that.$api.getTagGroupTree(cnt, function (res1) {
                    if (res1.data.rc == that1.$util.RC.SUCCESS) {
                        if (res1.data.c == '{}') {
                            that1.groups = ''
                        } else {
                            that1.groups = JSON.parse(res1.data.c)
                        }
                    }
                })
                //请求所有组织用户
                let cnt1 = {
                    orgId: localStorage.getItem('orgId'),
                    count: that.count,
                    offset: that.offset
                }
                that.$api.getORGUsers(cnt1, function (res2) {
                    that1.tableData = JSON.parse(res2.data.c)
                    if (that1.tableData.length < that1.count) {
                        that1.pageOver = true
                    } else {
                        that1.pageOver = false
                    }
                })
                // 请求职位列表
                that.$api.getSysORGUserRoles(cnt, function (res3) {
                    that1.roleList = JSON.parse(res3.data.c)
                })
            })
      }
    }
</script>

<style scoped lang="scss">

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
