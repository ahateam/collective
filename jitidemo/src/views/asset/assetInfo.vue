<template>
    <div class="box">
            <div>
                <el-row class="row-box">
                    <el-row>
                        <el-col :span="24">
                            <div class="item-title"> 基础信息</div>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                资产名称
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.name" placeholder="请输入内容" ></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2">
                            <div class="title-label"  >
                                资产证件
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.sn" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                资源类型
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.resType" placeholder="请输入内容" ></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2">
                            <div class="title-label"  >
                                资产类型
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.assetType" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                资产价格（万元）
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.originPrice" placeholder="请输入内容" ></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2">
                            <div class="title-label"  >
                                资产位置
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.location" placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                资产权属
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.keeper" placeholder="请输入内容"  ></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2">
                            <div class="title-label"  >
                                保管人
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.location" placeholder="请输入内容"  id="show" style="color: #000 !important;"></el-input>
                        </el-col>

                    </el-row>
                </el-row>
                <el-row class="row-box">
                    <el-row>
                        <el-col :span="24">
                            <div class="item-title"> 经营信息</div>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                经营方式
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.businessMode" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2">
                            <div class="title-label"  >
                                起止时间
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.businessTime" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                投资对象
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.holder" placeholder="请输入内容" ></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2">
                            <div class="title-label"  >
                                年收益（万元）
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.yearlyIncome" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>

                </el-row>
                <el-row class="row-box" v-if="info.assetType == '不动产'">
                    <el-row>
                        <el-col :span="24">
                            <div class="item-title"> 不动产属性</div>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                不动产类型
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.estateType" placeholder="请输入内容" ></el-input>
                        </el-col>
                        <el-col :span="3" ::offset="2">
                            <div class="title-label"  >
                                建筑面积(㎡)
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.area" placeholder="请输入内容"  ></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                占地面积(㎡)
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.floorArea" placeholder="请输入内容"  ></el-input>
                        </el-col>


                    </el-row>
                    <el-row class="row-box1" :gutter="10" v-if="info.boundary!= '{}'">
                        <el-col :span="3" >
                            <div class="title-label"  >
                                四至边界
                            </div>
                        </el-col>
                        <el-col  :span="1" class="title-text-boundary">东:</el-col> <el-col :span="4"> <el-input v-model="JSON.parse(info.boundary).east" placeholder="请输入内容"  ></el-input></el-col>
                        <el-col :span="1"  class="title-text-boundary">西:</el-col><el-col :span="4"> <el-input v-model="JSON.parse(info.boundary).west" placeholder="请输入内容"  ></el-input></el-col>
                        <el-col :span="1"  class="title-text-boundary">南:</el-col><el-col :span="4"> <el-input v-model="JSON.parse(info.boundary).south" placeholder="请输入内容"  ></el-input></el-col>
                        <el-col :span="1"  class="title-text-boundary">北:</el-col><el-col :span="4"> <el-input v-model="JSON.parse(info.boundary).north" placeholder="请输入内容"  ></el-input></el-col>

                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                起点位置
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.locationStart" placeholder="请输入内容"  ></el-input>
                        </el-col>
                        <el-col :span="3" ::offset="2">
                            <div class="title-label"  >
                                终点位置
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.locationEnd" placeholder="请输入内容"  ></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                起点坐标
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.coordinateStart" placeholder="请输入内容"  ></el-input>
                        </el-col>
                        <el-col :span="3" ::offset="2">
                            <div class="title-label"  >
                                终点坐标
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.coordinateEnd" placeholder="请输入内容"  ></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                资产蓄积(m³)
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.coordinateStart" placeholder="请输入内容"  ></el-input>
                        </el-col>
                        <el-col :span="3" ::offset="2">
                            <div class="title-label"  >
                                棵数(棵)
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.treeNumber" placeholder="请输入内容"  ></el-input>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="row-box" v-if="info.assetType == '动产'">
                    <el-row>
                        <el-col :span="24">
                            <div class="item-title"> 动产属性</div>
                        </el-col>
                    </el-row>
                    <el-row class="row-box1">
                        <el-col :span="3">
                            <div class="title-label"  >
                                规格型号
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="info.specType" placeholder="请输入内容"  ></el-input>
                        </el-col>
                    </el-row>

                </el-row>

            </div>
            <div class="pageBtn">
                <el-button type="primary" @click="page" style="float: right;margin-right: 10rem">上一页</el-button>
            </div>
    </div>
</template>

<script>
    export default {
        name: "assetInfo",
        data(){
            return{
                info:''

            }
        },
        methods:{
            page(){
                this.$router.push('/assetList')
            }
        },
        mounted(){
            console.log(localStorage.getItem('assetId'))
            if(localStorage.getItem('assetId') == ''){
                this.$message.error('请选择资产')
            }else{
                let that = this
                let cnt={
                    assetId:localStorage.getItem('assetId')
                }
                console.log(cnt)
                this.$api.getAssetById(cnt,function (res) {
                    let info= ''
                    info = JSON.parse(res.data.c)

                    if(info.sn == undefined || info.sn == ''){
                        info.sn = '暂无'
                    }
                    if(info.keeper == undefined || info.keeper == ''){
                        info.keeper = '暂无'
                    }
                    if(info.businessTime == undefined || info.businessTime == ''){
                        info.businessTime = '暂无'
                    }
                    if(info.holder == undefined || info.holder == ''){
                        info.holder = '暂无'
                    }
                    if(info.yearlyIncome == undefined || info.yearlyIncome == ''){
                        info.yearlyIncome = '暂无'
                    }
                    if(info.specType == undefined || info.specType == ''){
                        info.specType = '暂无'
                    }
                    if(info.estateType == undefined || info.estateType == ''){
                        info.estateType = '暂无'
                    }
                    if(info.area == undefined || info.area == ''){
                        info.area = '暂无'
                    }
                    if(info.floorArea == undefined || info.floorArea == ''){
                        info.floorArea = '暂无'
                    }
                    if(info.locationStart == undefined || info.locationStart == ''){
                        info.locationStart = '暂无'
                    }
                    if(info.locationEnd == undefined || info.locationEnd == ''){
                        info.locationEnd = '暂无'
                    }
                    if(info.coordinateStart == undefined || info.coordinateStart == ''){
                        info.coordinateStart = '暂无'
                    }

                    if(info.coordinateEnd == undefined || info.coordinateEnd == ''){
                        info.coordinateEnd = '暂无'
                    }
                    if(info.accumulateStock == undefined || info.accumulateStock == ''){
                        info.accumulateStock = '暂无'
                    }
                    if(info.treeNumber == undefined || info.treeNumber == ''){
                        info.treeNumber = '暂无'
                    }
                    that.info = info
                })
            }
            console.log(this.info)
        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 100%;
        height: 100%;
        padding: 20px 0;
    }
    .pageBtn{
        width: auto;
        height: 5rem;
        margin-top: 5rem;
    }
    .row-btn{
        padding-top: 2rem;
        padding-bottom: 2rem;
        text-align: center;

    }
    .title-text-boundary{
        font-size: 1.4rem;
        color: #666;
        line-height: 4rem;
    }
    .title-label{
        padding: 10px;
        font-size: 1.6rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .row-box1 {
        margin-top: 10px;

    }
    .row-box{
        padding: 15px;

    }
    .row-box-tilte{


        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;
        margin-bottom: 15px;
    }
    .col-title-box{
        padding:15px;
    }
    .item-title{
        font-size: 1.6rem;
        color: #333;
        height: 4rem;
        line-height: 4rem;
    }
</style>
