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
                                    :label="item"
                                    :value="item">
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
                                    :label="item"
                                    :value="item">
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
                                    :label="item"
                                    :value="item">
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
                                   placeholder="不选择默认为所有年份"
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
                </el-col>

            </el-row>

            <el-row>
                <ve-histogram :data="chartData"></ve-histogram>
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
                org: [],
                resType:[],
                assetType:[],
                businessMode:[],

            }
        },
        methods:{
            searchBtn(){
                let that =this
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
            }
        },
        mounted(){
            let that = this
            let that1 = this
            let cnt ={
                districtId: localStorage.getItem('areaId'),
            }
            console.log(cnt)
            //初始化数据
            //org列表
            this.$api.getORGSByDistrictId(cnt,function (res) {
                console.log('1111')
                console.log(res)
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
            this.$api.getBuildTime(cnt,function (res) {
                that.yearList = JSON.parse(res.data.c)
                let cnt1 = {
                    districtId: localStorage.getItem('areaId'),
                    buildTimes:that.yearList
                }
                that.$api.districtCountByYears(cnt1,function (res) {
                    that1.data = JSON.parse(res.data.c)
                    for(let i=0;i<that1.data.length;i++){
                        if(that1.data[i].build_time == undefined || that1.data[i].build_time == null) {
                            let obj = {
                                '年份':cnt1.buildTimes[i],
                                '原值':0,
                                '产值':0
                            }
                            that1.chartData.rows.push(obj)
                        }else {
                            let obj = {
                                '年份':that1.data[i].build_time,
                                '原值':that1.data[i].originPrice,
                                '产值':that1.data[i].yearlyIncome
                            }
                            that1.chartData.rows.push(obj)
                        }
                    }
                })
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
