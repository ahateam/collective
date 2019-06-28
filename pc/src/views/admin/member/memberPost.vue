<template>
    <div class="box">
        <el-row :gutter="40">
            <el-col :span="5"   style="overflow: hidden">
                <template>
                    <el-col :span="24">
                        <div style="width:auto;height: 30px;padding: 1rem;border-left: 4px solid #63a35c;font-size: 1.6rem; ">全部职务</div>
                    </el-col>
                    <el-col :span="24" >

                        <div :class=" item.name == roleActive.name?'post-list post-active':'post-list'"  v-for="(item,index) in roleList" :key="index" @click="roleChange(item)">
                            {{item.name}}
                        </div>
                    </el-col>
                </template>
            </el-col>
            <el-col :span="19" style="border-left: 1px solid #ddd">
                <el-row>
                  <el-col :span="12">
                      <!--<el-button type="primary" size="mini" @click="addMemberModal = true" style="margin-top: 6px">添加成员</el-button>-->
                      <el-button type="primary" size="mini"  @click="loadExcl" style="margin-top: 6px">用户表模板下载</el-button>
                      <!--<el-button type="warning" size="mini" @click="delMore" style="margin-top: 6px">移除职位</el-button>-->
                  </el-col>

                    <el-col :span="12">
                        <el-input placeholder="请输入用户姓名" v-model="searchData" >
                            <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                        </el-input>
                    </el-col>

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
                                        prop="orgUser.familyNumber"
                                        label="户序号">
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
                                       >
                                    <template slot-scope="scope">
                                        <el-button @click="infoBtn(scope.row)" type="text" size="small">基础信息</el-button>
                                        <el-button @click="infoPostBtn(scope.row)" type="text" size="small">职务信息</el-button>
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

        <!--批量导入成员-->
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
                <el-button type="primary"   @click="doUpload" v-loading.fullscreen.lock="loadData" element-loading-text="正在努力上传，五千以上数据大约等待1分钟...">确认导入数据</el-button>
            </span>
        </el-dialog>
        <!--新增成员-->
        <el-dialog title="新增成员" :visible.sync="addMemberModal" width="60%">
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
                <el-form-item label="用户地址" label-width="100px">
                    <el-input v-model="address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="户序号" label-width="100px">
                    <el-input v-model="familyNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="户主姓名" label-width="100px">
                    <el-input v-model="familyMaster" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="股权证书编号" label-width="100px">
                    <el-input v-model="shareCerNo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否持证人" label-width="100px">
                    <template>
                        <el-radio v-model="shareCerHolder" :label="true"   >是</el-radio>
                        <el-radio v-model="shareCerHolder" :label="false"  >否</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="股份数" label-width="100px">
                    <el-input v-model="shareAmount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="投票权重" label-width="100px">
                    <el-input v-model="weight" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="职务角色" label-width="100px">
                    <template>
                        <el-checkbox-group v-model="roles">
                            <el-checkbox  v-for="(item,index) in roleList" :key="index" :label="item.roleId" >{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMemberModal = false">取 消</el-button>
                <el-button type="primary" @click="addMemberBtn">确 定</el-button>
            </div>
        </el-dialog>
        <!--成员基本信息-->
        <el-dialog title="成员基本信息" :visible.sync="memberInfoModal">
           <el-row style="margin-bottom: 20px">
               <el-button type="primary" icon="el-icon-edit" size="mini" style="float: right;margin-right: 30px" @click="editMember =1">编辑基本信息</el-button>
               <el-button type="primary" icon="el-icon-edit" size="mini" style="float: right;margin-right: 30px" @click="editMember =2">修改身份证号</el-button>
           </el-row>
            <el-row>
                <el-form>
                    <el-form-item label="用户姓名" label-width="100px">
                        <el-input v-model="realNameInfo" autocomplete="off"  :disabled="editMember != 1"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" label-width="100px">
                        <el-input v-model="idNumberInfo" autocomplete="off"  :disabled="editMember != 2"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" label-width="100px">
                        <el-input v-model="mobileInfo" autocomplete="off"  :disabled="editMember != 1"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="memberInfoModal = false">取 消</el-button>
                <el-button type="primary" @click="memberInfoModal=false"  v-if="editMember ==0">返回列表</el-button>
                <el-button type="primary" @click="editUserBtn" v-if="editMember ==1">确认修改</el-button>
                <el-button type="primary" @click="editUserNumber" v-if="editMember ==2">确认修改</el-button>
            </div>
        </el-dialog>
        <!--成员职位信息-->
        <el-dialog title="成员职务信息" :visible.sync="memberPostInfoModal">
            <el-row style="margin-bottom: 20px">
                <el-button type="primary" icon="el-icon-edit" size="mini" style="float: right;margin-right: 30px" @click="editMember =1">编辑基本信息</el-button>
            </el-row>
            <el-row>
                <el-form>

                    <el-form-item label="户序号" label-width="100px">
                        <el-input v-model="familyNumberInfo" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="户主姓名" label-width="100px">
                        <el-input v-model="familyMasterInfo" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户住址" label-width="100px">
                        <el-input v-model="addressInfo" autocomplete="off" :disabled="editMember !=1"></el-input>
                    </el-form-item>
                    <el-form-item label="证书编号" label-width="100px">
                        <el-input v-model="shareCerNoInfo" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="是否持证人" label-width="100px">
                        <template>
                            <el-radio v-model="shareCerHolderInfo" :label="true"   disabled>是</el-radio>
                            <el-radio v-model="shareCerHolderInfo" :label="false"   disabled>否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="股份数" label-width="100px">
                        <el-input v-model="shareAmountInfo" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="选举权重" label-width="100px">
                        <el-input v-model="weightInfo" autocomplete="off" :disabled="editMember !=1"></el-input>
                    </el-form-item>
                    <el-form-item label="职务角色" label-width="100px">
                        <template>
                            <el-checkbox-group v-model="rolesInfo">
                                <el-checkbox  v-for="(item,index) in roleList" :key="index" :label="item.roleId" :disabled="editMember !=1">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="分组信息" label-width="100px">
                        <template>
                            <el-checkbox-group v-model="groupsInfo">
                                <el-checkbox  v-for="(item,index) in groups" :key="index" :label="item.groupId" :disabled="editMember !=1">{{item.keyword}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="memberPostInfoModal = false">取 消</el-button>
                <el-button type="primary" @click="memberPostInfoModal=false":disabled="editMember ==0">返回列表</el-button>
                <el-button type="primary" @click="editORGUserBtn" v-if="editMember ==1">确认修改</el-button>
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
                importAddress:'',       //导入地址

                //新增成员
                name:'',
                idNumber:'',
                mobile:'',
                pwd:'',
                address:'',
                shareCerNo:'',
                shareCerHolder:'',
                shareAmount:'',
                weight:'',
                roles:[],
                groups:[],
                groupsList:[],
                familyNumber:'',
                familyMaster:'',


                //职务角色列表
                roleList:[],                //角色列表
                roleActive:'',              //选中的角色

                //修改成员信息
                memberInfoModal:false,          //基本信息弹窗
                memberInfo:'' ,                 //成员详情
                editMember:0,              //是否进行修改操作
                realNameInfo:'',                    //姓名
                idNumberInfo:'',                //身份证号
                mobileInfo:'',                  //手机号
                userIdInfo:'',                  //uerId

                //修改成员职务信息
                memberPostInfoModal:false,      //职务信息弹窗
                addressInfo:'',                  //用户住址
                shareCerNoInfo:'',              //股权证书编号
                shareCerImgInfo:'',             //股权证书图片地址
                shareCerHolderInfo:'',          //是否持证人
                shareAmountInfo:'',             //股份数
                weightInfo:'',                  //选举权重
                rolesInfo:[],                       //用户角色id 列表
                tagsInfo:[],                    //用户标签/分组信息
                groupsInfo:[],
                familyNumberInfo:'',            //户序号
                familyMasterInfo:'',            //户主姓名

                //搜索相关
                searchData:'',

            }
        },
        methods: {
            //ajax请求层
            //根据姓名模糊搜索用户列表
            getORGUsersLikeRealName(cnt){
                this.$api.getORGUsersLikeRealName(cnt,(res)=>{
                    this.tableData =this.$util.tryParseJson(res.data.c)
                    if (this.tableData.length < this.count) {
                        this.pageOver = this
                    } else {
                        this.pageOver = false
                    }
                })
            },
            //创建组织用户
            createORGUser(cnt){
              this.$api.createORGUser(cnt,(res)=>{
                  if(res.data.rc == this.$util.RC.SUCCESS){
                      this.$message.success('新增用户成功')
                  }else{
                      this.$message.error('新增失败')
                  }
                  this.$router.push('/page')
              })
            },
            //获取组织成员列表
            getORGUserByRole(cnt){
              this.$api.getORGUserByRole(cnt,(res)=>{
                  this.tableData = this.$util.tryParseJson(res.data.c)
                  if (this.tableData.length < this.count) {
                      this.pageOver = true
                  } else {
                      this.pageOver = false
                  }
              })
            },
            //获取组织类所有的用户信息
            getORGUsers(cnt){
                this.$api.getORGUsers(cnt,(res)=>{
                    this.tableData = this.$util.tryParseJson(res.data.c)
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                })
            },
            //修改用户基本信息
            editUser(cnt){
                this.$api.editUser(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('修改成功')
                    }else{
                        this.$message.error('修改失败')
                    }
                    this.$router.push('/page')
                })
            },
            //修改组织用户信息-职务修改
            editORGUser(cnt){
                this.$api.editORGUser(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('修改成功')
                    }else{
                        this.$message.error('修改失败')
                    }
                    this.$router.push('/page')
                })
            },
            //修改成员的身份证号码
            editUserIdNumber(cnt){
                this.$api.editUserIdNumber(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('修改成功')
                        this.$router.push('/page')
                    }else{
                        this.$message.error('修改失败')
                        this.$router.push('/page')
                    }
                })
            },
            //请求系统角色列表
            getSysORGUserRoles(cnt){
                this.$api.getSysORGUserRoles(cnt,(res)=>{
                    this.roleList =this.$util.tryParseJson(res.data.c)
                })
            },


            //普通事件层
            //搜索用户
            searchBtn(){
                let that = this
                if(this.searchData == ''){
                    this.$message.error('请输入查找的用户姓名')
                }else{
                    this.offset = 0
                    this.page = 1
                    this.roleActive = ''
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        realName: this.searchData,
                        count: this.count, // Integer
                        offset: this.offset, // Integer
                    };
                    this.getORGUsersLikeRealName(cnt)
                }
            },
            loadExcl() {
                window.location.href = this.$baseURL+"用户模板.xlsx"
            },
            //导入用户文件上传相关
            //关闭弹出框，重置上传的文件的相关变量
            closeBtn() {
                this.fileName = ''
                this.fileData = []
                this.url = ''
            },
            //讲已经导入到oss的文件传递给服务端进行数据库导入
            importUsers() {
                if (this.url != '' || this.url != undefined) {
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        url: this.url
                    }
                    this.$api.importORGUsers(cnt,  (res)=> {
                        this.loadData = false
                        this.$message.success('导入完成，稍后刷新')
                        this.$router.push('/page')
                    })
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

                // this.$emit('getProgress', 0)
                this.getProgress(0)
                let file = files
                this.size = file[0].size
                let tmpName = encodeURIComponent(file[0].name)
                tmpName = this.importAddress + tmpName

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
                        let address = res.res.requestUrls[0]
                        let _index =address.indexOf('?')
                        console.log(_index)
                        if(_index == -1){
                            _this.url = address
                            _this.importUsers()
                        }else{
                            _this.url = address.substring(0,_index)
                            _this.importUsers()
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

            //新增用户
            addMemberBtn() {
                if(this.name == '' || this.idNumber == '' || this.mobile == '' ){
                    this.$message.error('请输入完整的用户基础信息')
                }else{
                    let groups = [102]
                    let tags = {
                        tags:['无']
                    }
                    let cnt = {
                        orgId:localStorage.getItem('orgId'),
                        mobile: this.mobile, // String 手机号
                        realName: this.name, // String 姓名（实名）
                        idNumber: this.idNumber, // String 身份证号
                        address:this.address,
                        shareCerNo:this.shareCerNo,
                        shareCerImg:'无',
                        shareCerHolder:this.shareCerHolder,
                        shareAmount:this.shareAmount,
                        weight:this.weight,
                        roles:this.roles,
                        groups:JSON.stringify(groups),
                        tags:JSON.stringify(tags),
                        familyNumber:this.familyNumber,
                        familyMaster:this.familyMaster
                    }
                    this.createORGUser(cnt)
                }

            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },


            //过滤用户职务
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


            //更换职务请求用户列表
            roleChange(info) {
                let that = this
                this.searchData = ''
                this.roleActive = info
                this.count = 10
                this.offset = 0
                this.page = 1
                let roles = [info.roleId]
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    roles: roles, // JSONArray <选填> 角色权限列表,JSONArray格式
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                };
                //请求对应的角色列表
                this.getORGUserByRole(cnt)

            },
            //上一页下一页
            changePage(key) {
                let that = this

                if (key == 0) {   //上一页
                    this.page = this.page - 1
                } else {          //下一页
                    this.page = this.page + 1
                }
                let offset = (this.page - 1) * this.count


                //请求所有的用户的分页
                if (this.roleActive != '') {
                    let roles = [this.roleActive.roleId]
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        roles:roles, // JSONArray <选填> 角色权限列表,JSONArray格式
                        count: this.count, // Integer
                        offset: offset, // Integer
                    };
                    //请求对应的角色列表
                    this.getORGUserByRole(cnt)
                } else {
                        if(this.searchData == ''){
                            let cnt = {
                                orgId: localStorage.getItem('orgId'),
                                offset: offset,
                                count: this.count
                            }
                            this.getORGUsers(cnt)
                        }else{
                            let cnt = {
                                orgId: localStorage.getItem('orgId'),
                                realName: this.searchData,
                                count: this.count, // Integer
                                offset:offset, // Integer
                            };
                            this.getORGUsersLikeRealName(cnt)
                        }
                    }

            },

            //修改组织用户的职位信息
            infoPostBtn(info){
                console.log(info)
                this.memberInfo = info
                this.userIdInfo = this.memberInfo.user.id
                this.editMember = 0
                this.addressInfo = this.memberInfo.orgUser.address
                this.shareCerNoInfo = this.memberInfo.orgUser.shareCerNo
                this.shareCerImgInfo = this.memberInfo.orgUser.shareCerImg
                this.shareCerHolderInfo = this.memberInfo.orgUser.shareCerHolder
                this.shareAmountInfo = this.memberInfo.orgUser.shareAmount
                this.weightInfo = this.memberInfo.orgUser.weight
                this.rolesInfo = JSON.parse(this.memberInfo.orgUser.roles)
                this.tagsInfo = this.memberInfo.orgUser.tags
                this.memberPostInfoModal = true

                this.familyNumberInfo = this.memberInfo.orgUser.familyNumber
                this.familyMasterInfo = this.memberInfo.orgUser.familyMaster
                if(this.memberInfo.orgUser.groups != undefined || this.memberInfo.orgUser.groups != ''){
                    this.groupsInfo = JSON.parse(this.memberInfo.orgUser.groups)
                }else {
                    this.groupsInfo = []
                }


            },


            //用户信息
            infoBtn(info){
                this.memberInfo = info
                console.log(this.memberInfo)
                this.memberInfoModal =true
                this.realNameInfo = this.memberInfo.user.realName
                this.idNumberInfo = this.memberInfo.user.idNumber
                this.mobileInfo = this.memberInfo.user.mobile
                this.userIdInfo = this.memberInfo.user.id
                this.editMember =0

            },
            //修改用户基本信息
            editUserBtn(){
                let that = this
                let cnt = {
                    userId: this.userIdInfo,
                    mobile:this.mobileInfo,
                    realName:this.realNameInfo,
                }
                this.editUser(cnt)
            },
            //修改用户信息
            editORGUserBtn(){

                if(this.addressInfo == ''  || this.weightInfo == '' || this.rolesInfo.length == 0) {
                    this.$message.error('请输入完整的用户信息')
                }else{
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        userId: this.userIdInfo, // Long 用户编号
                        address: this.addressInfo, // String 地址
                        shareCerNo: this.shareCerNoInfo, // String 股权证书编号
                        // shareCerImg: this.shareCerImgInfo, // String 股权证书图片地址
                        shareCerImg:'无', // String 股权证书图片地址
                        shareCerHolder: this.shareCerHolderInfo, // Boolean 是否持证人
                        shareAmount: this.shareAmountInfo, // Integer 股份数
                        weight: this.weightInfo, // Integer 选举权重
                        roles: this.rolesInfo, // JSONArray 角色（股东，董事长，经理等）
                        groups:this.groupsInfo,
                        tags: this.tagsInfo, // JSONObject 标签，包含groups,tags,以及其它自定义分组标签列表
                        familyNumber:this.familyNumberInfo,
                        familyMaster:this.familyMasterInfo
                    }
                    // console.log(cnt)
                    this.editORGUser(cnt)
                }
            },
            //修改用户身份证号
            editUserNumber(){
                let that = this
                let cnt = {
                    adminUsreId: localStorage.getItem('userId'),
                    userId: this.userIdInfo,
                    IdNumber: this.idNumberInfo,
                };
                this.editUserIdNumber(cnt)
            },
        },
        mounted(){
            const loading = this.$loading({lock: true, text: '拼命加载中...', spinner: 'el-icon-loading'})
            let orgId = localStorage.getItem('orgId')
            this.importAddress = 'user/'+orgId+'/'
            let cnt ={}
            // 请求职位列表
            this.getSysORGUserRoles(cnt)
            //请求所有组织用户
            let cnt1 = {
                orgId: localStorage.getItem('orgId'),
                count: this.count,
                offset: this.offset
            }
            this.getORGUsers(cnt1)


            //获取所有分组列表
            this.$api.getORGUserSysTagGroups(cnt, (res)=> {
                let data = this.$util.tryParseJson(res.data.c)
                this.grandId = data[0].groupId
                let cnt2 = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    groupId:this.grandId, // Long 分组编号
                };

                this.$api.getTagGroupTree(cnt2, (res)=> {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        let groupData = this.$util.tryParseJson(res.data.c)
                        if (groupData == '{}' || groupData== {}) {
                            this.groups = ''
                        } else {
                            this.groups = groupData
                        }
                    }
                    console.log(this.groups)
                })
            })

            loading.close()
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
