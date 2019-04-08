<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                机构组织资金详情
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row>
                <el-col :span="24">
                    <span style="font-size: 1.6rem;color: #666;"> 资金信息</span>
                    <el-button type="primary" icon="el-icon-edit" size="small" style="float: right" @click="editShow" >编辑</el-button>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">组织资金:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="capital" placeholder="请输入组织资金" :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">负债资金:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="debt" placeholder="请输入组织负债资金"  :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">债权资金:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="receivables" placeholder="请输入组织债权资金"  :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">年毛收入:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="income" placeholder="请输入组织年毛收入"  :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">每股分红:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="bonus" placeholder="请输入组织股东每股分红"  :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">工作经费预算:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="budget" placeholder="请输入组织工作经费预算"  :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">工作经费决算:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="financialBudget" placeholder="请输入组织工作经费预算"  :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">对外投资:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="investment" placeholder="请输入组织对外投资资金"  :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row  :gutter="40" style="margin-top: 20px">
                <el-col :span="4">
                    <div class="title-box">固定资产估值:</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="valuation" placeholder="请输入组织工作经费预算"  :disabled="!isEdit"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-button type="primary" v-show="isEdit" @click="editBtn">保存修改</el-button>
              <router-link to="/mechanism">  <el-button type="warning">返回列表</el-button></router-link>
            </el-row>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "mechMoney",
        data(){
          return{
              info:'',
              isEdit:false,
              capital:0,
              debt:0,
              receivables:0,
              income:0,
              bonus:0,
              budget:0,
              financialBudget:0,
              investment:0,
              valuation:0,
          }
        },
        methods:{
            //ajax请求封装层
            editORGExt(cnt){
                this.$api.editORGExt(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('修改成功')
                        this.isEdit = false
                    }else{
                        this.$message.error('修改失败')
                    }
                })
            },

            editShow(){
                this.isEdit = true
            },
            editBtn(){
              let that = this
              let cnt = {
                  orgId: this.info.id, // Long 组织编号
                  capital: this.capital, // Double <选填> 资金
                  debt: this.debt, // Double <选填> 负债
                  receivables: this.receivables, // Double <选填> 债权资金
                  income: this.income, // Double <选填> 年毛收入
                  bonus: this.bonus, // Double <选填> 分红
                  budget: this.budget, // Double <选填> 预算
                  financialBudget: this.financialBudget, // Double <选填> 决算
                  investment: this.investment, // Double <选填> 对外投资
                  valuation: this.valuation, // Double <选填> 估值
              }
              this.editORGExt(cnt)
            }
        },
        mounted(){
            this.info = this.$route.params.info
            this.capital =  this.info.capital
            this.debt = this.info.debt
            this.receivables = this.info.receivables
            this.income = this.info.income
            this.bonus = this.info.bonus
            this.budget = this.info.budget
            this.financialBudget = this.info.financialBudget
            this.investment = this.info.investment
            this.valuation = this.info.valuation
        }

    }
</script>

<style scoped lang="scss">
    .row-box {
        background: #fff;
        padding: 15px;
        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;

    }
    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .title-box {
        font-size: 1.6rem;
        line-height: 40px;
        letter-spacing: 2px;
        font-weight: 600;
        color: #666;
        text-align: right;
    }



</style>
