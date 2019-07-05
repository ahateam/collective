<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24" >
                <span class="title-box" style="line-height: 40px">新增公告</span>
            </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-row>
              <el-col :span="4">
                  <span class="title-text">公告标题：</span>
              </el-col>
              <el-col :span="18">
                  <el-input v-model="noticeTitle" placeholder="请输入公告标题"></el-input>
              </el-col>
          </el-row>
            <el-row class="row-box2">
                <el-col :span="4">
                    <span class="title-text">公告类型：</span>
                </el-col>
                <el-col :span="18">
                   <span class="title-text">
                       <el-radio v-model="type"
                                 :label=item.key
                                 v-for="(item,index) in typeList"
                                 :key="index">
                            {{item.val}}
                        </el-radio>
                   </span>
                </el-col>
            </el-row>
            <el-row class="row-box2">
                <el-col :span="4">
                    <span class="title-text">公告内容：</span>
                </el-col>
                <el-col :span="18">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 10}"
                            placeholder="请输入公告内容（若选择三方外链公告请输入一个有效网址）"
                            v-model="noticeContent">
                    </el-input>
                </el-col>
            </el-row>
            <el-row class="row-box2">
                <el-col :span="4">
                    <span class="title-text">选择角色发送(可选项)：</span>
                </el-col>
                <el-col :span="18">
                    <span class="title-text1" >
                        <el-checkbox-group v-model="roles">
                            <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.roleId" style="margin-left: 30px;padding-top: 10px">
                                {{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </span>
                </el-col>
            </el-row>
            <el-row class="row-box2">
                <el-col :span="4">
                    <span class="title-text">选择分组发送(可选项)：</span>
                </el-col>
                <el-col :span="18">
                    <span class="title-text1" >
                        <el-checkbox-group v-model="groups">
                            <el-checkbox v-for="(item,index) in groupList" :key="index" :label="item.groupId" style="margin-left: 30px;padding-top: 10px">
                                {{item.keyword}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </span>
                </el-col>
            </el-row>

            <el-row class="row-box2" >
                <el-col :span="24" style="text-align: center;line-height: 50px">
                    <el-button type="primary" style="text-align: center" @click="createNoticeBtn">立即发布公告</el-button>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "noticeAdd",
        data(){
            return{
                noticeTitle:'',
                noticeContent:'',
                roles:[],
                groups:[],

                roleList:[],
                groupList:[],

                type:0,
                typeList:[]
            }
        },
        methods:{
            createNoticeBtn(){
                if(this.noticeTitle =='' || this.noticeContent == ''){
                    this.$message.error('请将信息填写完整')
                }else{
                    if(this.groups.length == 0){
                        this.groups = [102]
                    }

                    let orgId = parseInt(localStorage.getItem('orgId'))
                    let cnt = {
                        orgId: orgId, // Long 组织编号
                        noticeTitle: this.noticeTitle, // String 公告名称
                        noticeContent: this.noticeContent, // String 公告内容
                        type: this.type, // Byte 类型
                        crowd: {orgId:[orgId],roles: this.roles,groups:this.groups}, // String 人群  例:{orgId:[],roles:[],groups:[]}
                    }
                    this.$api.createNotice(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.$message.success('操作成功')
                        }else{
                            this.$message.error('操作失败')
                        }
                    })
                    this.$router.push('/noticeList')
                }
            }
        },
        mounted(){
            this.typeList = this.$constData.noticeType
            let cnt = {}
            this.$api.getSysORGUserRoles(cnt, (res) => {
                if (res.data.rc == this.$util.RC.SUCCESS) {
                    this.roleList = this.$util.tryParseJson(res.data.c)
                } else {
                    this.roleList = []
                }
            })
            let cnt1= {
                orgId: localStorage.getItem('orgId'), // Long 组织
                groupId:100
            }
            this.$api.getTagGroupTree(cnt1,(res)=>{
                if (res.data.rc == this.$util.RC.SUCCESS) {
                    this.groupList = this.$util.tryParseJson(res.data.c)
                } else {
                    this.groupList = []
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
    .title-text{
        height: 40px;
        line-height: 40px;
        font-size: 1.6rem;
        text-align: center;
    }
    .title-text{
        height: 40px;
        line-height: 40px;
        font-size: 1.6rem;
    }
    .row-box2{
        margin-top: 20px;
    }
</style>
