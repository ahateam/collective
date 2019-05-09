<template>
    <div class="box">
        <el-row :gutter="40">
            <el-col :span="8"   style="overflow: hidden">
                <template>
                    <el-col :span="24">
                        <el-button style="float: right;margin-top: 7px" type="primary" icon="el-icon-plus" circle  @click="addChild"></el-button>
                        <div style="margin-right:5rem;width:auto;height: 30px;padding: 1rem;border-left: 4px solid #63a35c;font-size: 1.6rem; cursor: pointer;" @click="allAsset" >全部资产分组</div>
                    </el-col>
                    <el-col :span="24" >
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
                                        <!--<el-button-->
                                                <!--type="text"-->
                                                <!--size="mini"-->
                                                <!--@click="() => remove(node, data)">-->
                                            <!--<i class="el-icon-minus" style="color: #f60;"></i>-->
                                        <!--</el-button>-->
                                    </div>
                                </div>
                            </el-tree>

                        </el-col>

                    </el-col>
                </template>
            </el-col>
            <el-col :span="16" style="border-left: 1px solid #ddd">
                <el-row>
                    <p>
                        当前分组：<span v-if="nowNode==''">{{orgName}}</span> <span v-if="nowNode != ''">{{nowNode.keyword}}</span>
                    </p>
                </el-row>
                <el-row>
                    <p>
                        <el-button type="primary" size="mini" @click="addModal">移入资产</el-button>
                        <el-button type="primary" size="mini"  @click="loadExcl">资产表模板下载</el-button>
                        <!--<el-button type="primary" size="mini" @click="importModal =true">批量导入</el-button>-->
                        <el-button type="warning" size="mini" @click="delMore">移除职位</el-button>
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
                                        prop="name"
                                        label="资产名称">
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
                                        label="操作"
                                >
                                    <template slot-scope="scope">
                                        <el-button @click="delBtn(scope.row)" type="text" size="small"><span style="color: #F56C6C;">删除</span></el-button>
                                        <el-button @click="infoBtn(scope.row)" type="text" size="small">详细</el-button>

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




        <!--批量移入资产-->
        <el-dialog
                title="导入成员"
                :visible.sync="importModal"
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
                <el-button @click="importModal = false">取 消</el-button>
                <el-button type="primary"   @click="doUpload" v-loading.fullscreen.lock="loadData" element-loading-text="正在努力上传，五千以上数据大约等待1分钟...">确认导入数据</el-button>
            </span>
        </el-dialog>
        <!--新增成员-->
        <el-dialog title="新增成员" :visible.sync="addMemberModal"    width="60%">

            <div style="text-align: center">
                <el-transfer
                        style="text-align: left; display: inline-block"
                        v-model="assetData"
                        filterable
                        :filter-method="filterMethod"
                        :titles="['所有资产', '选中资产']"
                        :format="{
                            noChecked: '${total}',
                            hasChecked: '${checked}/${total}'
                         }"
                        :props="{
                            key:'id',
                            lable:'name'
                        }"

                        @change="handleChange"
                        :data="assetList">
                    <span slot-scope="{ option }">{{ option.name }}</span>
                </el-transfer>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMemberModal = false">取 消</el-button>
                <el-button type="primary" @click="addBtn">确 定</el-button>
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
                loadData:false,
                orgName:'',     //机构名称
                importModal:false,  //导入资产弹出框
                fileName:'',    //文件上传
                fileData:[],
                url:'',         //文件的线上地址
                num:0,          //上传进度
                multipleSelection:[],
                address:'',     //导入地址

                //用户列表
                offset:0,
                count:10,
                tableData:[],
                page:1,
                pageOver:false,

                //新增成员
                name:'',
                idNumber:'',
                mobile:'',
                weight:'',
                shareAmount:'',

                //分组列表
                groups:[],
                addgroupModal:false,        //新增分组弹窗
                keywordAdd:'',               //新增分组的关键字
                parentsAdd:'',              //新增的父节点组信息
                parentId:'',                //新增的父节点信息
                grandId:'',                 //根节点（机构的根分组id）
                defaultProps: {             //数据解构遍历
                    children: 'childs',
                    label: 'keyword'
                },

                nowNode:'',                     //当前选中的分组

                //分组操作-穿梭框相关
                addMemberModal:false, //穿梭框弹窗
                assetList:[],
                assetData:[],
            }
        },
        methods: {
            //ajax请求封装层
            //导入资产列表
            importAssets(cnt){
                this.$api.importAssets(cnt,(res)=>{
                    this.loadData = false
                    this.$message({
                        message: '导入完成，稍后刷新',
                        type: 'success'
                    });
                    this.$router.push('/page')
                })
            },
            //根据条件查询--对应资产列表
            queryAssets(cnt){
              this.$api.queryAssets(cnt,(res)=>{
                  this.tableData = this.$util.tryParseJson(res.data.c)
                  if (this.tableData.length < this.count) {
                      this.pageOver = true
                  } else {
                      this.pageOver = false
                  }
              })
            },
            //根据分组信息获取资产列表
            getAssetsByGroups(cnt){
              this.$api.getAssetsByGroups(cnt,(res)=>{
                  this.tableData = this.$util.tryParseJson(res.data.c)
                  if (this.tableData.length < this.count) {
                      this.pageOver = true
                  } else {
                      this.pageOver = false
                  }
              })
            },
            //新增分组
            createORGUserTagGroup(cnt){
                this.$api.createORGUserTagGroup(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$router.push('/page')
                    }
                })
            },
            //删除资产
            delAsset(cnt){
                this.$api.delAsset(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('删除成功!')
                    }else{
                        this.$message.error('删除出错!')
                    }
                    this.$router.push('/page')
                })
            },
            //移入资产
            batchEditAssetsGroups(cnt){
                this.$api.batchEditAssetsGroups(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('移入成功')
                    }else{
                        this.$message.error('移入失败')
                    }
                    this.$router.push('/page')
                })
            },


            //普通事件层
            //下载资产模板
            loadExcl() {
                window.location.href = this.$baseURL+"固定资产表.xlsx"
            },
            //导入文件上传相关
            //关闭弹出框，重置上传的文件的相关变量
            closeBtn() {
                this.fileName = ''
                this.fileData = []
                this.url = ''
            },
            //讲已经导入到oss的文件传递给服务端进行数据库导入
            importAssetsFile(){
                if(this.url != '' || this.url != undefined){
                    let cnt = {
                        orgId:localStorage.getItem('orgId'),
                        url:this.url
                    }
                    this.importAssets(cnt)
                }
            },
            //进度条
            getProgress(p) {
                this.num = p
            },
            //开始导入到oss
            doUpload() {
                this.loadData = true
                let files = []
                files[0] = this.fileData[0]
                this.getProgress(0)
                let file =files
                this.size = file[0].size
                let tmpName = encodeURIComponent(file[0].name)
                tmpName =this.address+ tmpName
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
                        //导入资产
                        let address = res.res.requestUrls[0]
                        let _index =address.indexOf('?')
                        console.log(_index)
                        if(_index == -1){
                            _this.url = address
                            _this.importAssetsFile()
                        }else{
                            _this.url = address.substring(0,_index)
                            _this.importAssetsFile()
                        }
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
            fileBtn(ev) {
                this.fileData = ev.target.files
                this.fileName = this.fileData[0].name
            },
            handleClose(done) {
                done();
            },
            delMore() {
                console.log(this.multipleSelection)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //上一页下一页
            changePage(key) {
                if (key == 0) {   //上一页
                    this.page = this.page - 1
                } else {          //下一页
                    this.page = this.page + 1
                }
                let offset = (this.page - 1) * this.count
                if(this.nowNode == ''){
                    //请求所有的资产列表
                    let cnt1 = {
                        orgId:localStorage.getItem('orgId'),
                        count:this.count,
                        offset:offset
                    }
                    this.queryAssets(cnt1)
                }else {
                    let group = [this.nowNode.groupId]
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        groups:group, // Array <选填> 角色分组,JSONArray格式
                        count: this.count, // Integer
                        offset: offset, // Integer
                    }
                   this.getAssetsByGroups(cnt)
                }
            },




            //分组相关
            //新增分组根节点
            addChild(){
                this.keywordAdd = ''
                this.addgroupModal = true
                this.parentsAdd = [this.grandId]
                this.parentId = this.grandId
            },

            //根据不同分组请求资产列表
            handleNodeClick(data,node) {
                this.offset = 0
                this.page = 1
                this.nowNode = data;
                let group = [data.groupId]
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    groups:group, // Array <选填> 角色分组,JSONArray格式
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                }
                this.getAssetsByGroups(cnt)
            },
            append( node,data) {
                this.addgroupModal = true
                this.keywordAdd = ''

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
            //新增分组
            addGroupBtn(){
                if(this.keywordAdd == ''){
                    this.$message.error('请输入分组名')
                }else{
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        parentId:this.parentId,
                        parents: this.parentsAdd, // JSONArray 分组父节点编号数组，JSONArray格式。节点顺序自顶向下
                        keyword: this.keywordAdd, // String 分组关键字
                        remark: this.keywordAdd, // String
                    }
                    this.createORGUserTagGroup(cnt)
                }
            },
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
            },
            filterMethod(query, item) {
                return item.name.indexOf(query) > -1;
            },
            //请求所有资产
            allAsset(){
                this.nowNode = ''
                this.offset = 0
                this.page = 1
                //请求所有资产
                let cnt1 = {
                    orgId:localStorage.getItem('orgId'),
                    count:this.count,
                    offset:this.offset
                }
                this.queryAssets(cnt1)
            },
            //批量导入某一分组的用户列表
            addModal(){
                if(this.nowNode == ''){
                    this.$message.error('请先选择一个组织下的分组')
                }else{
                    this.addMemberModal = true
                }
            },

            //删除单个资产
            delBtn(info){
                this.$confirm('此操作将永久删除该资产信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this
                    let cnt = {
                        assetId:info.id
                    }
                    this.delAsset(cnt)

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //资产详情
            infoBtn(info){
                this.$router.push({
                    path:'/assetsInfo',
                    name:'assetsInfo',
                    params:{
                        info:info
                    }
                })
            },

            //批量移入资产
            addBtn(){
                if(this.assetData.length == 0){
                    this.$message.error('请至少选择一个用户引入该分组')
                }else{
                    let groupId = this.nowNode.groupId
                    let cnt  = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        assetIds: this.assetData, // JSONArray 用户编号列表，JSONArray格式
                        groups: [groupId], // JSONArray 分组信息列表，JSONArray格式
                    }
                    this.batchEditAssetsGroups(cnt)
                }
            },

        },
        mounted(){
            const loading = this.$loading({lock: true, text: '拼命加载中...', spinner: 'el-icon-loading'})
            let that = this
            this.orgName = localStorage.getItem('orgName')
            let orgId = localStorage.getItem('orgId')
            this.address = 'asset/'+orgId+'/'
            let cnt ={}
            //分组列表
            this.$api.getORGUserSysTagGroups(cnt,(res)=>{
                let data = this.$util.tryParseJson(res.data.c)
                that.grandId = data[0].groupId
                let cnt2 = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    groupId:this.grandId, // Long 分组编号
                };
                this.$api.getTagGroupTree(cnt2,(res1)=>{
                    if (res1.data.rc == this.$util.RC.SUCCESS) {
                        let groupData = this.$util.tryParseJson(res1.data.c,{})
                        if (groupData == '{}' || groupData == {}) {
                            this.groups = ''
                        } else {
                            this.groups = groupData
                        }
                    }
                })
            })

            //请求所有的资产列表
            let cnt1 = {
                orgId:localStorage.getItem('orgId'),
                count:this.count,
                offset:this.offset
            }
            this.queryAssets(cnt1)
            loading.close()

            //请求所有的资产列表（无分页/等修改）
            let cnt2={
                orgId:localStorage.getItem('orgId'),
                count:500,
                offset:0
            }
            this.$api.queryAssets(cnt2, (res)=> {
                that.assetList = this.$util.tryParseJson(res.data.c)
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
