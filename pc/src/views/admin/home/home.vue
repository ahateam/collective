<template>
    <div>
        <el-container>
            <el-aside width="200px" class="slide-box">
                <div class="logo-box">
                    <i class="iconfont icon-logo"></i>
                </div>
                <el-menu
                        :default-active="this.$store.state.navDefaultActive"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        style="overflow: hidden;width: 200px;background: #545c64;"
                >
                    <span v-for="(item,key) in menuList" >
                        <el-menu-item v-if="item.child.length ==0"    :index="''+key" @click="navActive(item,key)" >
                            <i class="iconfont icon-box" :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </el-menu-item>

                        <el-submenu :index="''+key"  v-if="item.child.length >0" >
                            <template slot="title">
                                <i class="iconfont icon-box" :class="item.icon"></i>
                                <span>{{item.title}}</span>
                            </template>
                                <el-menu-item :index="key+'-'+key1" v-for="(item1,key1) in item.child" @click="navActive1(key,item1,key1)">{{item1.title}}</el-menu-item>
                        </el-submenu>
                    </span>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="header-box">
                    <div class="system-box">集体经济管理系统</div>
                    <div class="system-mech">
                        <span v-if="tableData.length != 0">
                           <div class="system-center"> {{orgName}}</div>
                        </span>
                        <div class="system-right" @click="show">
                            <el-tag>更换机构</el-tag>
                        </div>
                        <div style="float: right">
                            <el-button type="danger" plain size="mini" @click="outLogin">注销登录</el-button>
                        </div>
                    </div>

                </el-header>
                <el-main style="background: #f0f2f5;height: 100vh;overflow-y: auto;padding-bottom:100px; ">
                    <router-view v-if="isRouterActive"></router-view>
                </el-main>
            </el-container>
        </el-container>

        <el-dialog title="机构列表" :visible.sync="showActive">

            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="机构名称">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="组织机构代码">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="active(scope.row)" type="text" size="small">确认选中</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <p>
                当前第 {{page}} 页
                <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(page-1)">上一页</el-button>
                <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
            </p>

        </el-dialog>
        <el-dialog title="选择机构"
                   :before-close="handleClose"
                   :visible.sync="showActive1">
            <template>
                    <el-button type="primary" style="margin-bottom: 2rem" @click="addMech" v-if="grade ==0">申请机构</el-button>

                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="机构名称">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="组织机构代码">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="active1(scope.row)" type="text" size="small">确认选中</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <p>
                当前第 {{page}} 页
                <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(page-1)">上一页</el-button>
                <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
            </p>

        </el-dialog>
    </div>
</template>

<script>
    import menu from '@/data/menu/menu'
    export default {
        name: "home",
        components: {},
        data() {
            return {
                showActive: false,
                showActive1: true,
                tableData: [],
                orgName: '',
                isRouterActive: true,
                menuList:[],
                offset:0,
                count:10,
                page:1,
                pageOver:false,
                grade:''

            }
        },
        methods: {
            //ajax请求封装层
            //获取用户的所有组织列表
            getUserORGs(cnt){
                this.$api.getUserORGs(cnt,(res)=>{
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        let data = this.$util.tryParseJson(res.data.c)
                        this.tableData = data
                    } else {
                        this.tableData = []
                    }
                    if(this.tableData.length <this.count){
                        this.pageOver =true
                    }else{
                        this.pageOver = false
                    }
                })
            },

            //事件层
            //分页
            changePage(page){
                this.page =page
                let cnt = {
                    offset:(this.page-1)*this.count,
                    count:this.count,
                    level:4,
                    userId:localStorage.getItem('userId')
                }
                this.getUserORGs(cnt)
            },

            //一级菜单选中事件
            navActive(item,key) {
                this.$store.state.navDefaultActive = ''+key
                this.$router.push(item.path)
            },
            //二级菜单选中事件
            navActive1(key,item1,key1) {
                this.$store.state.navDefaultActive = key+'-'+key1
                this.$router.push(item1.path)
            },

            show() {
                this.page = 1
                let cnt = {
                   offset:this.offset,
                   count:this.count,
                    level:4,
                   userId:localStorage.getItem('userId')
                }
                this.getUserORGs(cnt)
                this.$router.push('/dashboard')
                this.$store.state.navDefaultActive = '0'
                this.showActive = true
            },
            addMech(){
                this.showActive1 = false
                this.$router.push('/addMech')
            },
            active(row) {

                let cnt = {
                    userId: localStorage.getItem('userId'),
                    orgId: row.id, // Long 组织编号
                }
                this.$api.adminLoginInORG(cnt, (res)=> {
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        localStorage.setItem('orgUser',res.data.c)
                        localStorage.setItem('orgId', row.id)
                        localStorage.setItem('orgName', row.name)
                        this.orgName = localStorage.getItem('orgName')


                        if(localStorage.getItem('grade') == '0'){
                            this.menuList = menu.menu
                        }else{
                            this.menuList = menu.demoMenu
                        }

                        this.$router.push('/dashboard')
                        this.$message({
                            showClose: true,
                            message: '更换机构成功',
                            type: 'success'
                        });
                        this.showActive = false
                        this.showActive1 = false
                    }else{
                        this.$message({
                            showClose: true,
                            message: '更换机构失败，你不是该机构的管理员',
                            type: 'error'
                        });
                    }
                })
            },
            handleClose() {
                this.$confirm('请先选择某一机构')
                    .then()
            },
            active1(row) {

                let cnt = {
                    userId: localStorage.getItem('userId'),
                    orgId: row.id, // Long 组织编号
                }

                this.$api.adminLoginInORG(cnt, (res)=> {

                    if(res.data.rc == this.$util.RC.SUCCESS){
                        localStorage.setItem('orgUser',res.data.c)
                        localStorage.setItem('orgId', row.id)
                        localStorage.setItem('orgName', row.name)
                        this.orgName = localStorage.getItem('orgName')
                        if(localStorage.getItem('grade') == '0'){
                            this.menuList = menu.menu
                        }else{
                            this.menuList = menu.demoMenu
                        }

                        this.$router.push('/dashboard')
                        this.$message({
                            showClose: true,
                            message: '更换机构成功',
                            type: 'success'
                        });
                        this.showActive = false
                        this.showActive1 = false
                    }else{
                        this.$message({
                            showClose: true,
                            message: '更换机构失败，你不是该机构的管理员',
                            type: 'error'
                        });
                    }
                })


            },
            outLogin(){
                localStorage.setItem('orgId','')
                localStorage.setItem('orgName', '')
                localStorage.setItem('userId', '')
                this.$router.push('/login')
            },

        },
        mounted() {
            const loading = this.$loading({lock: true, text: '拼命加载中...', spinner: 'el-icon-loading'})
            this.grade = localStorage.getItem('grade')
            if(localStorage.getItem('userId') == '' || localStorage.getItem('userId') == null){
                this.$message.error({
                    showClose: true,
                    message: '登录信息失效，重新登录',
                });
               this.outLogin()
            }

            if(localStorage.getItem('orgId') == '' || localStorage.getItem('orgId') == null){
                this.menuList = menu.lowMenu
                this.showActive1 = true
            }else{
                this.$router.push('/dashboard')
                if(localStorage.getItem('grade') == '0'){
                    this.menuList = menu.menu
                }else{
                    this.menuList = menu.demoMenu
                }
                this.orgName = localStorage.getItem('orgName')
                this.showActive1 = false
            }
            let cnt = {
                offset:this.offset,
                count:this.count,
                level:4,
                userId:localStorage.getItem('userId')
            }
            this.getUserORGs(cnt)
            loading.close()
        }

    }
</script>

<style scoped lang="scss">
    .slide-box {
        width: 200px;
        background: #545c64;
        min-height: 100vh;
        overflow: hidden;
    }

    .logo-box {
        width: 200px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 40px;
        color: #fff;
    }

    .logo-box i {
        width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 40px;

    }

    .header-box {
        background: #545c64;
        font-size: 1.8rem;
        line-height: 60px;
        color: #fff;

    }

    .icon-box {
        display: block;
        float: left;
        width: 2rem;
        height: 56px;
        margin-right: 10px;
        font-size: 2rem;
    }

    .system-box {
        float: left;
        width: 250px;
        height: 60px;
        letter-spacing: 5px;
        font-weight: 600;
        text-align: center;
    }

    .system-mech {
        position: relative;
        width: auto;
        height: 60px;
        margin-left: 250px;
        letter-spacing: 5px;
        font-weight: 600;
        text-align: center;

    }

    .system-center {
        position: absolute;
        width: 300px;
        height: 60px;
        left: 50%;
        margin-left: -250px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .system-right {
        position: absolute;
        right: 100px;
        cursor: pointer;
    }

    .system-right span {
        color: #fff;
        border: 1px solid #ddd;
        background: rgba(255, 255, 255, .3);
    }

</style>
