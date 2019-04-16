<template>
    <div>
        <el-row class="row-box-tilte">
            <el-col :span="24">
                <div class="col-title-box">
                    {{info.name}} 详细信息
                    <!--<span style="float: right;font-size: 3rem;color: #409EFF;" @click="isEdit = true"> <i class="el-icon-edit-outline"></i></span>-->
                </div>

            </el-col>
        </el-row>
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
                    <el-input v-model="info.name" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" :offset="2">
                    <div class="title-label"  >
                    资产证件
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.sn" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="3">
                    <div class="title-label"  >
                        资源类型
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.resType" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" :offset="2">
                    <div class="title-label"  >
                    资产类型
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.assetType" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="3">
                    <div class="title-label"  >
                        资产价格（万元）
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.originPrice" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" :offset="2">
                    <div class="title-label"  >
                    资产位置
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.location" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="3">
                    <div class="title-label"  >
                        资产权属
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.keeper" placeholder="请输入内容" :disabled=" isEdit == false" ></el-input>
                </el-col>
                <el-col :span="3" :offset="2">
                    <div class="title-label"  >
                    保管人
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.location" placeholder="请输入内容" :disabled=" isEdit == false" id="show" style="color: #000 !important;"></el-input>
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
                    <el-input v-model="info.businessMode" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" :offset="2">
                    <div class="title-label"  >
                        起止时间
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.businessTime" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="3">
                    <div class="title-label"  >
                        投资对象
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.holder" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" :offset="2">
                    <div class="title-label"  >
                        年收益（万元）
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.yearlyIncome" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
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
                    <el-input v-model="info.estateType" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" ::offset="2">
                    <div class="title-label"  >
                        建筑面积(㎡)
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.area" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="3">
                    <div class="title-label"  >
                        占地面积(㎡)
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.floorArea" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>


            </el-row>
            <el-row class="row-box1" :gutter="10" v-if="info.boundary!= '{}'">
                <el-col :span="3" >
                    <div class="title-label"  >
                        四至边界
                    </div>
                </el-col>
                <el-col  :span="1" class="title-text-boundary">东:</el-col> <el-col :span="4"> <el-input v-model="JSON.parse(info.boundary).east" placeholder="请输入内容" :disabled=" isEdit == false"></el-input></el-col>
                <el-col :span="1"  class="title-text-boundary">西:</el-col><el-col :span="4"> <el-input v-model="JSON.parse(info.boundary).west" placeholder="请输入内容" :disabled=" isEdit == false"></el-input></el-col>
                <el-col :span="1"  class="title-text-boundary">南:</el-col><el-col :span="4"> <el-input v-model="JSON.parse(info.boundary).south" placeholder="请输入内容" :disabled=" isEdit == false"></el-input></el-col>
                <el-col :span="1"  class="title-text-boundary">北:</el-col><el-col :span="4"> <el-input v-model="JSON.parse(info.boundary).north" placeholder="请输入内容" :disabled=" isEdit == false"></el-input></el-col>

            </el-row>
            <el-row class="row-box1">
                <el-col :span="3">
                    <div class="title-label"  >
                        起点位置
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.locationStart" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" ::offset="2">
                    <div class="title-label"  >
                        终点位置
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.locationEnd" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="3">
                    <div class="title-label"  >
                        起点坐标
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.coordinateStart" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" ::offset="2">
                    <div class="title-label"  >
                        终点坐标
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.coordinateEnd" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="3">
                    <div class="title-label"  >
                        资产蓄积(m³)
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.coordinateStart" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
                <el-col :span="3" ::offset="2">
                    <div class="title-label"  >
                        棵数(棵)
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="info.treeNumber" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
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
                    <el-input v-model="info.specType" placeholder="请输入内容" :disabled=" isEdit == false"></el-input>
                </el-col>
            </el-row>

        </el-row>
        <el-row class="row-btn" v-if="isEdit == true">
            <el-button type="primary" @click="editBtn">确认修改</el-button>
        </el-row>
        <el-row class="row-btn" >
           <router-link to="/asset">
               <el-button type="primary" >返回搜索</el-button>
           </router-link>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "assetsInfo",
        data(){
          return{
              info:'',
              isEdit:false
          }
        },
        methods:{
            editBtn(){
                console.log(this.info)
            }
        },
        mounted(){
           let info = this.$route.params.info
            this.info = info
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

        }
    }
</script>

<style scoped lang="scss">
    .row-btn{
        padding-top: 2rem;
        padding-bottom: 2rem;
        text-align: center;
        background: #fff;
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
        background: #fff;
    }
    .row-box{
        padding: 15px;
        background: #fff;
    }
    .row-box-tilte{
        background: #fff;

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
