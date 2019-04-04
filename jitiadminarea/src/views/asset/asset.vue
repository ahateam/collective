<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <div class="title-text">
                    资产统计信息
                </div>
            </el-col>
        </el-row>

        <el-row class="row-box1">
            <el-row :gutter="40" >
                <el-col :span="24" style="margin: 10px 0">
                    <el-col :span="4">
                        <div class="title">
                            选择机构查询:
                        </div>
                    </el-col>
                    <el-col :span="18" style="line-height: 4rem">
                        <el-select v-model="org"
                                   multiple
                                   placeholder="不选择默认为所有组织机构"
                                   style="margin-left: 20px; width: 100%;">
                            <el-option
                                    v-for="item in orgList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="24" style="margin: 10px 0">
                    <el-col :span="4">
                        <div class="title">
                            选择资源类型:
                        </div>
                    </el-col>
                    <el-col :span="18" style="line-height: 4rem">
                        <el-select v-model="resType"
                                   multiple
                                   placeholder="不选择默认为所有资源类型"
                                   style="margin-left: 20px; width: 100%;">
                            <el-option
                                    v-for="(item,index) in resTypeList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="24" style="margin: 10px 0">
                    <el-col :span="4">
                        <div class="title">
                            选择资产类型:
                        </div>
                    </el-col>
                    <el-col :span="18" style="line-height: 4rem">
                        <el-select v-model="assetType"
                                   multiple
                                   placeholder="不选择默认为所有资产类型"
                                   style="margin-left: 20px; width: 100%;">
                            <el-option
                                    v-for="(item,index) in assetTypeList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="24" style="margin: 10px 0">
                    <el-col :span="4">
                        <div class="title">
                            选择经营方式:
                        </div>
                    </el-col>
                    <el-col :span="18" style="line-height: 4rem">
                        <el-select v-model="businessMode"
                                   multiple
                                   placeholder="不选择默认为所有经营方式"
                                   style="margin-left: 20px; width: 100%;">
                            <el-option
                                    v-for="(item,index) in businessModeList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="24" style="margin: 10px 0">
                    <el-col :span="4">
                        <div class="title">
                            选择年份:
                        </div>
                    </el-col>
                    <el-col :span="18" style="line-height: 4rem">
                        <el-select v-model="year"
                                   multiple
                                   placeholder="不选择默认为近五年年份"
                                   style="margin-left: 20px; width: 100%;">
                            <el-option
                                    v-for="(item,index) in yearList"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>

            <el-row >
                <el-col :span="22" style="margin-top: 20px;text-align: right">
                    <el-button  type="primary" @click="searchBtn">查询统计</el-button>
                    <el-button  type="primary" @click="searchListBtn" >查询列表</el-button>
                </el-col>

            </el-row>

            <el-row v-if="isList == false">
                <ve-histogram :data="chartData"></ve-histogram>
            </el-row>
            <el-row v-if="isList == true">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                         >
                        <el-table-column
                                prop="name"
                                label="资产名称">
                        </el-table-column>
                        <el-table-column
                                prop="buildTime"
                                label="年份">
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
                                prop="yearlyIncome"
                                label="年产值(万)"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                        >
                            <template slot-scope="scope">
                                <el-button @click="infoBtn(scope.row)" type="text" size="small">详细</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                <p>
                    当前第 {{page}} 页
                    <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(page-1)">上一页</el-button>
                    <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
                </p>
            </el-row>

        </el-row>
    </div>
</template>

<script>
    export default {
        name: "asset",
        data(){
            return{
                data:[],
                chartData: {
                    columns: ['年份','原值','产值'],
                    rows: []
                },
                orgList: [],          //组织列表
                resTypeList:[],          //资源类型列表
                assetTypeList:[],          //资产类型列表
                businessModeList:[],      //经营方式列表
                yearList:[],                //年份列表

                year:[],
                defaultYear:[],              //默认近五年年份

                org: [],
                resType:[],
                assetType:[],
                businessMode:[],

                //表格相关
                isList:false,
                offset:0,
                count:10,
                tableData:[],
                page:1,
                pageOver:false,
            }
        },
        methods:{
            //查询列表
            searchListBtn(){
                let that =this
                this.isList = true
                this.page = 1
                let cnt ={
                    districtId: localStorage.getItem('areaId'), // Long 区id
                    offset:this.offset,
                    count:this.count
                }
                if(this.org.length >0){
                    cnt.orgIds = this.org
                }
                if(this.year.length >0){
                    cnt.buildTimes = this.year
                }else{
                    cnt.buildTimes = this.yearList
                }
                if(this.resType.length >0){
                    cnt.resTypes = this.resType
                }
                if(this.assetType.length >0){
                    cnt.assetTypes = this.assetType
                }
                if(this.businessMode.length>0){
                    cnt.businessModes = this.businessMode
                }

                this.$api.getAssetListByTypes(cnt,function (res) {
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.tableData = JSON.parse(res.data.c)
                        if( that.tableData.length <that.count){
                            that.pageOver = true
                        }else{
                            that.pageOver = false
                        }
                }
                })


            },
            //表格分页
            changePage(page){
                this.page = page
                let that = this
                let cnt ={
                    districtId: localStorage.getItem('areaId'), // Long 区id
                    offset:(page-1)*this.count,
                    count:this.count
                }
                if(this.org.length >0){
                    cnt.orgIds = this.org
                }
                if(this.year.length >0){
                    cnt.buildTimes = this.year
                }else{
                    cnt.buildTimes = this.yearList
                }
                if(this.resType.length >0){
                    cnt.resTypes = this.resType
                }
                if(this.assetType.length >0){
                    cnt.assetTypes = this.assetType
                }
                if(this.businessMode.length>0){
                    cnt.businessModes = this.businessMode
                }

                this.$api.getAssetListByTypes(cnt,function (res) {
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.tableData = JSON.parse(res.data.c)
                        if(that.tableData.length < that.count){
                            that.pageOver = true
                        }else{
                            that.pageOver = false
                        }
                    }
                })
            },
            //查询统计图
            searchBtn(){
                let that =this
                this.isList = false
                this.chartData.rows = []
                let cnt ={
                    districtId: localStorage.getItem('areaId'), // Long 区id
                }
                 if(this.org.length >0){
                    cnt.orgIds = this.org
                 }

                 if(this.year.length >0){
                     cnt.buildTimes = this.year
                 }else{
                     cnt.buildTimes = this.defaultYear
                 }

                 if(this.resType.length >0){
                     cnt.resTypes = this.resType
                 }
                 if(this.assetType.length >0){
                     cnt.assetTypes = this.assetType
                 }
                 if(this.businessMode.length>0){
                     cnt.businessModes = this.businessMode
                 }
                console.log(cnt)
                this.$api.districtCountByYears(cnt,function (res) {
                    that.data = JSON.parse(res.data.c)
                    for(let i=0;i<that.data.length;i++){
                        if(that.data[i].build_time == undefined || that.data[i].build_time == null) {
                            let obj = {
                                '年份':cnt.buildTimes[i],
                                '原值':0,
                                '产值':0
                            }
                            that.chartData.rows.push(obj)
                        }else {
                            let obj = {
                                '年份':that.data[i].build_time,
                                '原值':that.data[i].originPrice,
                                '产值':that.data[i].yearlyIncome
                            }
                            that.chartData.rows.push(obj)
                        }
                    }
                })
            },
            //查看详情
            infoBtn(info){
                this.$router.push({
                    path:'/assetsInfo',
                    name:'assetsInfo',
                    params:{info:info}
                })
            }
        },
        mounted(){
            let that = this




            let nowYear = new Date().getFullYear()

            //年份取值默认为近20年
            this.yearList = []
            for(let i=19;i>=0;i--){
                this.yearList.push(nowYear-i)
            }

            //默认近五年数据
            let yearArr = []
            for(let i=4;i>=0;i--){
                yearArr.push(nowYear-i)
            }
            this.defaultYear = yearArr

            let cnt ={
                districtId: localStorage.getItem('areaId'),
            }
            console.log(cnt)


            //初始化数据
            //org列表
            this.$api.getORGSByDistrictId(cnt,function (res) {
                that.orgList = JSON.parse(res.data.c)
                console.log( that.orgList)
            })
            //请求资产类型--列表
            this.$api.getAssetType(cnt,function (res) {
                that.assetTypeList = JSON.parse(res.data.c)
                console.log()
            })
            //请求资源类型--列表
            this.$api.getResType(cnt,function (res) {
                that.resTypeList = JSON.parse(res.data.c)
            })
            //请求创建时间（年份） --列表
            let cnt1 = {
                districtId: localStorage.getItem('areaId'),
                buildTimes:this.defaultYear
            }
            this.$api.districtCountByYears(cnt1,function (res) {
                that.data = JSON.parse(res.data.c)
                for(let i=0;i<that.data.length;i++){
                    if(that.data[i].build_time == undefined || that.data[i].build_time == null) {
                        let obj = {
                            '年份':cnt1.buildTimes[i],
                            '原值':0,
                            '产值':0
                        }
                        that.chartData.rows.push(obj)
                    }else {
                        let obj = {
                            '年份':that.data[i].build_time,
                            '原值':that.data[i].originPrice,
                            '产值':that.data[i].yearlyIncome
                        }
                        that.chartData.rows.push(obj)
                    }
                }
            })


            //请求经营方式--列表
            this.$api.getBusinessMode(cnt,function (res) {
                that.businessModeList = JSON.parse(res.data.c)
            })




        }
    }
</script>

<style scoped lang="scss">
    .search-box{
        width: auto;
        margin: 10px;
        /*!*border-radius: 5px;*!*/
        /*border-bottom: 1px solid #409eff;*/
        padding: 10px;
    }
    .nav-btn{
        float: left;
        margin-left: 15px;
    }
    .row-box{
        background: #fff;
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
    .title-text{
        width: auto;
        padding: 0 15px;
        border-left:4px solid rgb(99, 163, 92);
        font-size: 1.6rem;
        line-height: 5rem;
    }
    .title{
        width: auto;
        overflow: hidden;
        font-size: 1.6rem;
        color: #333;
        line-height: 4rem;
        text-align: right;

    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
