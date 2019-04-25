<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24" >
               <span class="title-box">权限管理列表</span>
            </el-col>
        </el-row>
        <el-row class="row-box1" >
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="permissionName"
                            label="权限">
                    </el-table-column>
                    <el-table-column
                            prop="roles"
                            label="角色"
                            :formatter="rolesFilter">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="setBtn(scope.row)" type="text" size="small">设置权限</el-button>
                            <!--<el-button type="text" size="small">编辑</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-row>

        <el-dialog title="设置权限" :visible.sync="setModalShow">
            <div>
                <div class="title-box">
                    设置 【 {{info.permissionName}} 】权限：
                    <div class="content-box">
                        <el-checkbox-group v-model="roles">
                            <el-checkbox :label="item.roleId" v-for="(item,index) in roleList " :key="index" > {{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>

            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="setModalShow = false">取 消</el-button>
                <el-button type="primary" @click="setPerBtn">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "permission",
        data(){
            return{
                setModalShow:false,
                info:'',
                roles:[],            //选中的角色
                roleList:[],        //所有角色
                tableData:[]


            }
        },
        methods:{

            rolesFilter(row,col,value){
                let arr  = value
                if(arr.length >0){
                    let str = ''
                    for(let i=0;i<arr.length;i++){
                        str =  str +';'+arr[i].name
                    }
                    str = str.substr(1)
                    return str
                }else{
                    return '暂无角色'
                }
            },

            setBtn(info){
                this.info = info
                let arr = []
                for(let i=0;i<this.info.roles.length;i++){
                    arr.push(this.info.roles[i].roleId)
                }
                this.roles = arr
                this.setModalShow = true
            },
            handleClick(row) {
                console.log(row);
            },
            setPerBtn(){
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织id
                    permissionId: this.info.permissionId, // Long 权限id
                    role: this.roles, // String 角色id String[] 例[1,2,3,4]
                }

                this.$api.insertPermissionRole(cnt,(res)=>{
                   if(res.data.rc == this.$util.RC.SUCCESS){
                       this.$message.success('设置成功')
                   }else{
                       this.$message.error('设置失败')
                   }
                    this.$router.push('/page')
                })
            }
        },
        mounted(){
            this.$api.getPermission({},(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    let perList = this.$util.tryParseJson(res.data.c,[])
                    let arr = []
                    for(let i=0;i<perList.length;i++){

                        let cnt = {
                            orgId: localStorage.getItem('orgId'), // Long 组织id
                            permissionId: perList[i].permissionId, // Long 权限id
                            count: 30, // Integer
                            offset: 0, // Integer
                        };
                        this.$api.getRolesByPermission(cnt,(res)=>{
                            let roles = []
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                 roles = this.$util.tryParseJson(res.data.c,[])
                            }else{
                                 roles  = []
                            }
                            let obj  = {roles:roles}
                            Object.assign(obj,perList[i])
                            arr.push(obj)
                        })
                    }
                    this.tableData = arr
                }
            })
            this.$api.getSysORGUserRoles({},(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS ){
                    this.roleList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.roleList = []
                }
                console.log(this.roleList)
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
</style>
