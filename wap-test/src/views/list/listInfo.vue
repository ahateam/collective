<template>
    <div>
        <header-box title="资产详情"></header-box>
        <div class="main-box">
            <div v-if="info != ''">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="基础信息" name="1">
                        <van-cell-group>
                            <van-field
                                    v-model="info.name"
                                    label="资产名称："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.sn"
                                    label="资产证件："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.resType"
                                    label="资源类型："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.assetType"
                                    label="资产类型："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.originPrice+'（万元）'"
                                    label="资产价格："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.location"
                                    label="资产位置："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.ownership"
                                    label="资产权属："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.keeper "
                                    label="保管人："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />


                        </van-cell-group>
                    </van-collapse-item>
                    <van-collapse-item title="经营属性" name="2">
                        <van-cell-group>
                            <van-field
                                    v-model="info.businessMode "
                                    label="经营方式："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.businessTime "
                                    label="起止时间："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.holder "
                                    label="投资对象："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.yearlyIncome +'（万元）' "
                                    label="年收益："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                        </van-cell-group>
                    </van-collapse-item>
                    <van-collapse-item title="不动产属性" name="3" v-if="info.assetType == '不动产'">
                        <van-cell-group>
                            <van-field
                                    v-model="info.estateType "
                                    label="不动产类型："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.area+'（平方米）' "
                                    label="建筑面积："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.floorArea +'（平方米）'"
                                    label="占地面积："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-collapse-item title="四至边界" name="4" v-if="info.boundary!= '{}'">
                                <van-cell-group>
                                    <van-field
                                            v-model="JSON.parse(info.boundary).east"
                                            label="东面："
                                            type="textarea"
                                            disabled
                                            rows="1"
                                            autosize
                                    />
                                    <van-field
                                            v-model="JSON.parse(info.boundary).west"
                                            label="西面："
                                            type="textarea"
                                            disabled
                                            rows="1"
                                            autosize
                                    />
                                    <van-field
                                            v-model="JSON.parse(info.boundary).south"
                                            label="南面："
                                            type="textarea"
                                            disabled
                                            rows="1"
                                            autosize
                                    />
                                    <van-field
                                            v-model="JSON.parse(info.boundary).north"
                                            label="北面："
                                            type="textarea"
                                            disabled
                                            rows="1"
                                            autosize
                                    />
                                </van-cell-group>
                            </van-collapse-item>
                            <van-field
                                    v-model="info.locationStart"
                                    label="起点位置："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.locationEnd"
                                    label="终点位置："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.coordinateStart"
                                    label="起点坐标："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.coordinateEnd"
                                    label="终点坐标："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.accumulateStock+'（立方米）'"
                                    label="资产蓄积："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                            <van-field
                                    v-model="info.treeNumber+'（棵）'"
                                    label="棵数："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                        </van-cell-group>
                    </van-collapse-item>
                    <van-collapse-item title="动产属性" name="3" v-if="info.assetType == '动产'">
                        <van-cell-group>
                            <van-field
                                    v-model="info.specType "
                                    label="规格型号："
                                    type="textarea"
                                    disabled
                                    rows="1"
                                    autosize
                            />
                        </van-cell-group>
                    </van-collapse-item>
                </van-collapse>
            </div>
            <div class="btn">
                <router-link to="/list">
                    <div class="create-btn" >返回列表</div>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant';
    export default {
        name: "list",
        components:{
            HeaderBox
        },
        data(){
            return{
                info:'',
                activeNames: ['1','4']
            }
        },
        mounted(){
            let info = ''
            info = this.$route.params.info
            if(info == '' || info == undefined){
                Toast.fail({
                    duration:500,
                    message:'信息失效，重新选择'
                })
                this.$router.push('/list')
            }else{
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
                this.info = info
            }

        }
    }
</script>

<style scoped lang="scss">
    .text-info{
        line-height: 3rem;
        font-size: 1.6rem;
        color: #666;
        padding: 0 1rem;
    }
    .main-box{
        background:#fff;
    }
    .box{
        width: 88%;
        margin: 0 auto;
        margin-top: 1rem;
        border-radius: 5px;
        background: #fff;
    }
    .box-img{
        float: left;
        margin-left: 1rem;
        width: 8rem;
        height: 8rem;

    }
    .box-text{
        width: auto;
        height: 8rem;
        margin-left: 10rem;

    }
    .img-title{
        width: 6rem;
        height:6rem;
        margin-top: 1rem;
        margin-left: 1rem;
    }
    .img-title i{
        font-size: 6rem;
        text-align: center;
        line-height: 6rem;
        color: #40c9c6;
    }

    .text-title{
        width:auto;
        height: 4rem;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #666;
        font-weight: 600;
        text-align: left;
        padding-right: 1rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .text{
        width: auto;
        height: 4rem;
        text-align: left;
        padding-right: 1rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;

    }
    .btn{
        width: 100%;
        height: 4rem;
        margin-top: 2rem;
        line-height: 4rem;
        text-align: center;
    }
    .create-btn{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: rgb(125,177,253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
</style>
