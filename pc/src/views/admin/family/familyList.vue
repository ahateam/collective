<template>
    <div>
        <el-row class="row-box">
            <el-col :span="23" :offset="1">
                <p><span style="color: #666;line-height: 20px;font-size: 14px;">请先选择操作的家庭户才能完成对应的操作</span></p>
            </el-col>
        </el-row>

        <el-row class="row-box1">
            <el-row>
                <el-col :span="12">
                    <span style="font-size: 1.6rem;color: #666;">家庭户列表</span>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入搜索的内容" v-model="searchData" class="input-with-select">
                        <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 120px">
                            <el-option label="户主姓名" value="1"></el-option>
                            <el-option label="户序号" value="2"></el-option>
                            <el-option label="股权证号" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="familyNumber"
                                label="户序号">
                        </el-table-column>
                        <el-table-column
                                prop="shareCerNo"
                                label="股权证编号">
                        </el-table-column>
                        <el-table-column
                                prop="familyMaster"
                                label="户主姓名">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <el-button @click="separateBtn(scope.row)" type="text" size="small">选择分户</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <p>
                    当前第 {{page}} 页
                    <el-button type="primary" size="mini" :disabled="page==1" @click="changePage(page-1)">上一页
                    </el-button>
                    <el-button type="primary" size="mini" :disabled="pageOver ==true" @click="changePage(page+1)">下一页
                    </el-button>
                </p>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "familyList",
        data() {
            return {
                tableData: [],
                offset: 0,
                count: 10,
                page: 1,
                pageOver: false,
                searchData: '',
                searchType: '1'
            }
        },
        methods: {
            //户列表
            getFamilyAll(cnt) {
                this.$api.getFamilyAll(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableData = []
                    }
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                    console.log(this.tableData)
                })
            },
            //户主搜索列表
            getFamilyByFamilyMaster(cnt) {
                this.$api.getFamilyByFamilyMaster(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableData = []
                    }
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                })
            },
            //户编号搜索
            getFamilyByFamilyNumber(cnt) {
                this.$api.getFamilyByFamilyNumber(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableData = []
                    }
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                })
            },
            //股权证号搜索
            getFamilyByshare(cnt) {
                this.$api.getFamilyByshare(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableData = []
                    }
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                })
            },


            //分页
            changePage(page) {
                this.page = page
                if (this.searchData.length == 0) {
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        count: this.count, // Integer <选填> 查询数
                        offset: (this.page - 1) * this.count, // Integer <选填> 开始位置
                    }
                    this.getFamilyAll(cnt)
                } else {
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        content: this.searchData,
                        count: this.count, // Integer <选填> 查询数
                        offset: (this.page - 1) * this.count, // Integer <选填> 开始位置
                    }
                    if (this.searchType == '1') { //户主姓名
                        this.getFamilyByFamilyMaster(cnt)
                    } else if (this.searchType == '2') { //户序号
                        this.getFamilyByFamilyNumber(cnt)
                    } else if (this.searchType == '3') {  //股权证号
                        this.getFamilyByshare(cnt)
                    }
                }

            },

            searchBtn() {
                if (this.searchData.length == 0) {
                    this.page = 1
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        count: this.count, // Integer <选填> 查询数
                        offset: this.offset, // Integer <选填> 开始位置
                    }
                    this.getFamilyAll(cnt)
                } else {
                    this.page = 1
                    this.pageOver = false
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        content: this.searchData,
                        count: this.count,
                        offset: this.offset
                    }
                    if (this.searchType == '1') { //户主姓名
                        this.getFamilyByFamilyMaster(cnt)
                    } else if (this.searchType == '2') { //户序号
                        this.getFamilyByFamilyNumber(cnt)
                    } else if (this.searchType == '3') {  //股权证号
                        this.getFamilyByshare(cnt)
                    }
                }
            },
            separateBtn(row) {
                let routerPath = this.$route.params.routerPath
                console.log(routerPath)
                console.log(routerPath == this.$constData.familyType[2].val)
                //分户
                if (routerPath == this.$constData.familyType[1].val) {
                    this.$router.push({
                        path: '/' + routerPath,
                        name: '' + routerPath,
                        params: {
                            info: row
                        }
                    })
                } else if (routerPath == this.$constData.familyType[2].val) {
                    this.$router.push({
                        path: '/' + routerPath,
                        name: '' + routerPath,
                        params: {
                            info: row
                        }
                    })
                } else if (routerPath == this.$constData.familyType[3].val) {
                    this.$router.push({
                        path: '/' + routerPath,
                        name: '' + routerPath,
                        params: {
                            info: row
                        }
                    })
                } else if (routerPath == this.$constData.familyType[4].val) {  //移户
                    if (this.$route.params.familyKey == 0) {
                        if (row.familyNumber == this.$store.state.family.moveFamilyNumber2) {
                            this.$message.error('请不要重复选择相同的家庭户')
                        } else {
                            this.$store.state.family.moveFamilyNumber1 = row.familyNumber
                            this.$router.push({
                                path: '/' + routerPath,
                                name: '' + routerPath,
                                params: {
                                    info: 'list'
                                }
                            })
                        }

                    } else if (this.$route.params.familyKey == 1) {
                        if (row.familyNumber == this.$store.state.family.moveFamilyNumber1) {
                            this.$message.error('请不要重复选择相同的家庭户')
                        } else {
                            this.$store.state.family.moveFamilyNumber2 = row.familyNumber
                            this.$router.push({
                                path: '/' + routerPath,
                                name: '' + routerPath,
                                params: {
                                    info: 'list'
                                }
                            })
                        }
                    }
                }

            }


        },
        mounted() {
            let cnt = {
                orgId: localStorage.getItem('orgId'),
                count: this.count, // Integer <选填> 查询数
                offset: this.offset, // Integer <选填> 开始位置
            }
            this.getFamilyAll(cnt)
        }
    }
</script>

<style scoped lang="scss">
    .nav-btn {
        float: left;
        margin-left: 15px;
    }

    .row-box {
        background: #fff;
        padding: 15px 0;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }

    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>
