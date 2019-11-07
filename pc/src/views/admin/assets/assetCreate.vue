<template>
  <div>
    <el-row class="row-box-tilte">
      <el-col :span="24">
        <div class="col-title-box">新增集体资产</div>
      </el-col>
    </el-row>
    <el-form :model="info" :rules="rules" ref="infoForm" label-width="120px">
      <el-row class="row-box">
        <el-row>
          <el-col :span="24">
            <div class="item-title">基础信息</div>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="资产名称" prop="name">
              <el-input v-model="info.name" placeholder="请输入资产名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="资产证件" prop="sn">
              <el-input v-model="info.sn" placeholder="请输入资产证件"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="资源类型" prop="resType">
              <el-input v-model="info.resType" placeholder="请输入资源类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="资产类型" prop="assetType">
              <el-select
                v-model="info.assetType"
                placeholder="请选择资产类型"
                style="width:100%"
                @change="changetypeBtn()"
              >
                <el-option label="不动产" value="不动产"></el-option>
                <el-option label="动产" value="动产"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="资产价格(万元)" prop="originPrice">
              <el-input type="number" v-model="info.originPrice" placeholder="请输入资产价格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="资产位置" prop="location">
              <el-input v-model="info.location" placeholder="请输入资产位置"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="资产权属" prop="ownership">
              <el-input v-model="info.ownership" placeholder="请输入资产权属"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="保管人" prop="keeper">
              <el-input v-model="info.keeper" placeholder="请输入保管人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="row-box">
        <el-row>
          <el-col :span="24">
            <div class="item-title">经营信息</div>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="经营方式" prop="businessMode">
              <el-input v-model="info.businessMode" placeholder="请输入经营方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="起止时间" prop="businessTime">
              <el-date-picker
                v-model="info.businessTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="投资对象" prop="holder">
              <el-input v-model="info.holder" placeholder="请输入投资对象"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="年收益(万元)" prop="yearlyIncome">
              <el-input type="number" v-model="info.yearlyIncome" placeholder="请输入年收益"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="row-box" v-if="info.assetType == '不动产'">
        <el-row>
          <el-col :span="24">
            <div class="item-title">不动产属性</div>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="不动产类型" prop="estateType">
              <el-input v-model="info.estateType" placeholder="请输入不动产类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="建筑面积(㎡)" prop="area">
              <el-input type="number" v-model="info.area" placeholder="请输入建筑面积(㎡)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="占地面积(㎡)" prop="floorArea">
              <el-input type="number" v-model="info.floorArea" placeholder="请输入占地面积(㎡)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="24">
            <el-form-item label="四至边界" prop="boundary">
              <el-form label-width="50px" :model="info.boundary">
                <el-col :span="6">
                  <el-form-item label="东" prop="east">
                    <el-input v-model="info.boundary.east" placeholder="请输入东边界"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="西" prop="west">
                    <el-input v-model="info.boundary.west" placeholder="请输入西边界"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="南" prop="south">
                    <el-input v-model="info.boundary.south" placeholder="请输入南边界"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="北" prop="north">
                    <el-input v-model="info.boundary.north" placeholder="请输入北边界"></el-input>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="起点位置" prop="locationStart">
              <el-input v-model="info.locationStart" placeholder="请输入起点位置"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="终点位置" prop="locationEnd">
              <el-input v-model="info.locationEnd" placeholder="请输入终点位置"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="起点坐标" prop="coordinateStart">
              <el-input type="number" v-model="info.coordinateStart" placeholder="请输入起点坐标"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="终点坐标" prop="coordinateEnd">
              <el-input type="number" v-model="info.coordinateEnd" placeholder="请输入终点坐标"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="资产蓄积(m³)" prop="accumulateStock">
              <el-input type="number" v-model="info.accumulateStock" placeholder="请输入资产蓄积(m³)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="资产棵数(棵)" prop="treeNumber">
              <el-input type="number" v-model="info.treeNumber" placeholder="请输入资产棵数(棵)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="row-box" v-if="info.assetType == '动产'">
        <el-row>
          <el-col :span="24">
            <div class="item-title">动产属性</div>
          </el-col>
        </el-row>
        <el-row class="row-box1">
          <el-col :span="11">
            <el-form-item label="动产规格型号" prop="specType">
              <el-input v-model="info.specType" placeholder="请输入动产规格型号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <el-row class="row-box1">
      <el-col :span="24" style="padding:40px;text-align:center">
        <el-button type="primary" @click="createAssetBtn">确认信息并提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "assetsInfo",
  data() {
    return {
      info: {
        //基础必填项
        name: "", //资产名
        sn: "", //资产号
        resType: "", //资源类型
        assetType: "", //资产类型   动产--不动产
        originPrice: "", //资产价格
        location: "", //资产位置
        ownership: "", //资产权属
        keeper: "", //资产保管人
        //经营信息
        businessMode: "", //经营方式
        businessTime: "", //起始日期
        holder: "", //投资对象
        yearlyIncome: "", //年收入
        //不动产属性
        estateType: "", //不动产属性
        area: "", //建筑面积
        floorArea: "", //占地面积
        boundary: { east: "", west: "", south: "", north: "" }, //四至边界
        locationStart: "", //起点位置
        locationEnd: "", //终点位置
        coordinateStart: "", //起点坐标
        coordinateEnd: "", //终点坐标
        accumulateStock: "", //资产积蓄
        treeNumber: "", //资产棵树
        specType: "" //动产规格型号
      },

      rules: {
        name: [{ required: true, message: "请输入资产名称", trigger: "blur" }],
        resType: [
          {
            required: true,
            message: "请输入资源类型(如：林地,耕地,池塘,房屋)等等...",
            trigger: "blur"
          }
        ],
        originPrice: [
          { required: true, message: "请输入资产价格", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请输入资产位置", trigger: "blur" }
        ],
        ownership: [
          { required: true, message: "请输入资产权属", trigger: "blur" }
        ],
        assetType: [
          { required: true, message: "请选择资产类型", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //更改类型 重置变量值
    changetypeBtn() {
      if (this.info.assetType == "动产") {
        this.info.estateType = "";
        this.info.area = "";
        this.info.floorArea = "";
        this.info.locationStart = "";
        this.info.locationEnd = "";
        this.info.coordinateStart = "";
        this.info.coordinateEnd = "";
        this.info.accumulateStock = "";
        this.info.treeNumber = "";
        this.info.boundary.east = "";
        this.info.boundary.west = "";
        this.info.boundary.south = "";
        this.info.boundary.north = "";
      } else if (this.info.assetType == "不动产") {
          this.info.specType = ''
      }
    },
    //创建按钮
    createAssetBtn() {
        let cnt = JSON.parse(JSON.stringify(this.info))
        cnt.boundary = JSON.stringify(cnt.boundary)
        if(cnt.businessTime && cnt.businessTime.length>0){
            cnt.businessTime = JSON.stringify(cnt.businessTime)
        }
        cnt.orgId = localStorage.getItem('orgId')
        cnt.buildTime = this.$commen.getDateStr()
        console.log(cnt)
        this.$api.createAsset(cnt,(res)=>{
            if(res.data.rc == this.$util.RC.SUCCESS){
              this.$message.success('操作成功')
              this.$router.push('/asset')
            }
        })
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.row-btn-01 {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
}
.row-btn {
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
  background: #fff;
}
.title-text-boundary {
  font-size: 1.4rem;
  color: #666;
  line-height: 4rem;
}
.title-label {
  padding: 10px;
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row-box1 {
  margin-top: 10px;
  background: #fff;
}
.row-box {
  padding: 15px;
  background: #fff;
}
.row-box-tilte {
  background: #fff;

  font-size: 1.6rem;
  color: #666;
  border-left: 4px solid #67c23a;
  margin-bottom: 15px;
}
.col-title-box {
  padding: 15px;
}
.item-title {
  font-size: 1.6rem;
  color: #333;
  height: 4rem;
  line-height: 4rem;
}
</style>
