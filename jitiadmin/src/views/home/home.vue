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
                    <el-menu-item v-if="item.child.length ==0" v-for="(item,key) in menuList"   :index="''+key" @click="navActive(item,key)" >
                        <i class="iconfont icon-box" :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                    <el-submenu :index="''+key"  v-if="item.child.length >0" v-for="(item,key) in menuList">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.title}}</span>
                        </template>
                            <el-menu-item :index="key+'-'+key1" v-for="(item1,key1) in item.child" @click="navActive1(key,item1,key1)">{{item1.title}}</el-menu-item>
                    </el-submenu>




                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="header-box">
                    <div class="system-box">集体经济管理系统</div>
                    <div class="system-mech">
                        <span v-if="tableData.length != 0">
                           <div class="system-center"> {{this.orgName}}</div>
                        </span>
                        <div class="system-right" @click="show">
                            <el-tag>更换机构</el-tag>
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

        </el-dialog>
        <el-dialog title="选择机构"
                   :before-close="handleClose"
                   :visible.sync="showActive1">
            <template>
                    <el-button type="primary" style="margin-bottom: 2rem" @click="addMech">新增机构</el-button>

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

        </el-dialog>
    </div>
</template>

<script>
    import menu from '@/assets/menu/menu'
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
                menuList:[]
            }
        },
        methods: {
            //一级菜单事件
            navActive(item,key) {
                this.$store.state.navDefaultActive = ''+key
                this.$router.push(item.path)
            },
            //二级菜单事件
            navActive1(key,item1,key1) {
                this.$store.state.navDefaultActive = key+'-'+key1
                this.$router.push(item1.path)
            },

            show() {
                let that = this

                let cnt = {
                    count: 40,
                    offset: 0
                }
                this.$util.call('/org/getORGs', cnt, function (res) {
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.tableData = JSON.parse(res.data.c)
                    } else {
                        that.tableData = []
                    }
                })


                this.$router.push('/dashboard')
                this.$store.state.navDefaultActive = '0'
                this.showActive = true


            },
            addMech(){
                this.showActive1 = false
                this.$router.push('/addMech')
            },
            active(row) {
                localStorage.setItem('orgId', row.id)
                localStorage.setItem('userId','396364975641204')
                localStorage.setItem('orgName', row.name)
                this.orgName = localStorage.getItem('orgName')
                this.$message({
                    showClose: true,
                    message: '更换机构成功',
                    type: 'success'
                });
                this.showActive = false

            },
            handleClose() {
                this.$confirm('请先选择某一机构')
                    .then()
            },
            active1(row) {
                localStorage.setItem('orgId', row.id)
                localStorage.setItem('orgName', row.name)
                this.orgName = localStorage.getItem('orgName')
                this.showActive1 = false
            }

        },
        created() {
            this.$router.push('/dashboard')
            console.log('11111')
            this.menuList = menu.menu
            console.log(this.menuList)
        },
        mounted() {

            let that = this
            let cnt = {
                count: 40,
                offset: 0
            }
            this.$util.call('/org/getORGs', cnt, function (res) {
                if (res.data.rc == that.$util.RC.SUCCESS) {
                    that.tableData = JSON.parse(res.data.c)
                }else{
                    that.tableData = []
                }
            })

            // this.$ajax.api.getORGs(40, 0, function (res) {
            //     if (res.data.rc == 'succ') {
            //         that.tableData = JSON.parse(res.data.c)
            //     }
            //
            // })
            console.log(that.tableData)
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
    }

    .system-right {
        position: absolute;
        right: 0;
        cursor: pointer;
    }

    .system-right span {
        color: #fff;
        border: 1px solid #ddd;
        background: rgba(255, 255, 255, .3);
    }

</style>
