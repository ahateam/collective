<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                申请经济组织机构
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">集体经济组织名称:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="mechName" placeholder="请输入集体经济组织名称"></el-input>
                    </div>
                </el-col>
            </el-col>

            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">机构地址:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-select v-model="province" placeholder="请选择省份" @focus="proListBtn(levelList[0].key)">
                                <el-option
                                        v-for="(item,index) in provinceList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="city" placeholder="请选择市" @focus="proListBtn(levelList[1].key)">
                                <el-option
                                        v-for="(item,index) in cityList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="district" placeholder="请选择区县" @focus="proListBtn(levelList[2].key)">
                                <el-option
                                        v-for="(item,index) in districtList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">管理机构上级（可选）:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-select
                                v-model="superiorId"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入上级机构名称"
                                :remote-method="getOrgByNameAndLevelBtn"
                                :loading="loading"
                                @focus="superiorBtn">
                            <el-option
                                    v-for="(item,index) in superiorList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <span style="line-height: 40px;font-size: 1.4rem;color: #666;margin-left: 20px">(若暂无上级，可不选，等待上级开通后再次申请即可)</span>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">机构详细地址:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="mechAddress" placeholder="请输入机构详细地址"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">组织机构代码:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="mechCode" placeholder="请输入组织机构代码"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">总股份数:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="shareAmount" placeholder="请输入组织机构总股份数"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">资源股（可选）:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="resourceShares" placeholder="请输入组织机构总资源股"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">资产股（可选）:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="assetShares" placeholder="请输入组织机构总资产股"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">集体经济代码证:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="image-box">
                            <img :src="mechCodeImgUrl" alt=""  v-if="mechCodeImgUrl != ''">
                            <span v-if="mechCodeImgUrl == ''" style="font-size: 20px;color: #666;">暂无图片，请上传</span>
                        </div>
                        <div class="image-load">
                            <div class="text-box">
                               <span style="font-size: 1.4rem;color: #f60;">
                                    目前只支持 .jpg 格式的文件上传
                               </span>
                                <input @change="getMechData($event)" type="file" class="upload"/>
                            </div>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">上传授权书:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="image-box">
                            <img :src="mechGrantImgUrl" alt=""  v-if="mechGrantImgUrl != ''">
                            <span v-if="mechGrantImgUrl == ''" style="font-size: 20px;color: #666;">暂无图片，请上传</span>
                        </div>
                        <div class="image-load">
                            <div class="text-box">
                               <span style="font-size: 1.4rem;color: #f60;">
                                    目前只支持 .jpg 格式的文件上传
                               </span>
                                <input @change="getMechData1($event)" type="file" class="upload"/>
                            </div>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box3">
                    <el-button type="primary" @click="submitBtn">提交组织资料</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    import ossAuth from '@/assets/api/oss/ossAuth'
    let client = ossAuth.client

    export default {
        name: "addMech",
        data() {
            return {
                mechName: '',
                province: '',        //省份
                city: '',            //市
                district: '',        //区
                mechAddress: '',
                mechCode: '',

                mechCodeImg: '',
                mechGrantImg: '',

                mechCodeImgUrl:'',
                mechGrantImgUrl:'',

                shareAmount: '',        //总股份数
                address:'',              //oss地址

                provinceList:[],
                cityList:[],
                districtList:[],
                superiorList:[],
                levelList:[],
                superiorId:'',
                loading: false,

                resourceShares:'',
                assetShares:'',

            }
        },
        components: {
            VDistpicker
        },
        watch:{
            province(val,oldVal){
                console.log(val,oldVal)
                this.city = ''
                this.district = ''
            },
            city(val,oldVal){
                console.log(val,oldVal)
                this.district = ''
            },
        },
        methods: {
            //ajax请求封装层
            // 创建组织申请
            createORGApply(cnt){
                this.$api.createORGApply(cnt,(res)=>{
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.$message({
                            showClose: true,
                            message: '申请成功，等待审核',
                            type: 'success'
                        });
                        this.$router.push('/applyMech')

                    }else{
                        this.$message({
                            showClose: true,
                            message: '申请失败',
                            type: 'error'
                        });
                    }
                })
            },

            //普通事件层
            //省市区选择
            proListBtn(key){
                console.log(key)
                if(key == this.levelList[0].key){
                    let cnt = {
                        level: key, // Byte 等级
                        father:1,
                        count: 500, // Integer
                        offset: 0, // Integer
                    }
                    this.$api.getProCityDistrict(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.provinceList = this.$util.tryParseJson(res.data.c)
                            console.log(this.provinceList)
                        }
                    })
                }else if(key == this.levelList[1].key){
                    let cnt = {
                        level: key, // Byte 等级
                        father:this.province,
                        count: 500, // Integer
                        offset: 0, // Integer
                    }
                    this.$api.getProCityDistrict(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.cityList = this.$util.tryParseJson(res.data.c)
                        }
                    })
                }else if(key == this.levelList[2].key){
                    let cnt = {
                        level: key, // Byte 等级
                        father:this.city,
                        count: 500, // Integer
                        offset: 0, // Integer
                    }
                    this.$api.getProCityDistrict(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.districtList = this.$util.tryParseJson(res.data.c)
                        }
                    })
                }
            },
            //更改选择上级
            superiorBtn(){
                this.superiorList = []
            },
            getOrgByNameAndLevelBtn(orgName){
                this.superiorList  = []
                console.log(orgName)
                if(orgName != ''){
                    let level = parseInt(this.level) -1
                    let cnt = {
                        level: level, // Byte 等级
                        orgName: orgName, // String 需要查询的名称
                    };
                    this.$api.getOrgByNameAndLevel(cnt,(res)=>{
                        this.superiorList = this.$util.tryParseJson(res.data.c)
                        console.log(this.superiorList)
                    })
                }


            },
            //进度条
            getProgress(p){
                this.num = p
            },
            //开始导入到oss
            doUpload(file,type) {
                this.$emit('getProgress', 0)
                let date = new Date()
                this.size = file.size
                let tmpName = date.getTime()+''+encodeURIComponent(file.name)
                tmpName =this.address+ tmpName

                console.log(tmpName)

                this.multipartUpload(tmpName, file,type)
            },
            //分片上传
            multipartUpload(upName, upFile,type) {
                //Vue中封装的分片上传方法（详见官方文档）
                let _this = this
                const progress = async function (p) {
                    //项目中需获取进度条，故调用进度回调函数（详见官方文档）
                    // _this.$emit('getProgress', Math.round(p * 100))
                    _this.getProgress(Math.round(p * 100))
                }
                try {
                    let result = client.multipartUpload(upName, upFile, {
                        progress,
                        meta: {
                            year: 2017,
                            people: 'test'
                        }
                    }).then(res => {
                        //取出存好的url

                            if(type == 'code'){

                                let address = res.res.requestUrls[0]
                                console.log(address)
                                let _index =address.indexOf('?')
                                console.log(_index)
                                if(_index == -1){
                                    _this.mechCodeImgUrl = address
                                }else{
                                    _this.mechCodeImgUrl = address.substring(0,_index)
                                }
                            }else if(type == 'grant'){
                                let address = res.res.requestUrls[0]
                                let _index =address.indexOf('?')
                                if(_index == -1){
                                    _this.mechGrantImgUrl = address
                                }else{
                                    _this.mechGrantImgUrl = address.substring(0,_index)
                                }
                            }

                    }).catch(err => {
                        console.log(err)
                    });

                } catch (e) {
                    // 捕获超时异常
                    if (e.code === 'ConnectionTimeoutError') {
                        console.log("Woops,超时啦!");
                    }
                    console.log(e)
                }
            },
            // 获取文件名显示
            sel: function (data) {
                this.province = data.province.value
                this.city = data.city.value
                this.district = data.area.value
            },
            getMechData(event) {
                this.mechCodeImg = event.target.files[0]
                this.doUpload(this.mechCodeImg,'code')
            },
            getMechData1(event) {
                this.mechGrantImg = event.target.files[0]
                this.doUpload(this.mechGrantImg,'grant')
            },

            submitBtn() {
                if (this.mechName == '' || this.province == '' || this.mechAddress == '' || this.mechCode == '' || this.city == '' || this.district == '') {
                    this.$message({
                        showClose: true,
                        message: '请先将信息填写完整',
                        type: 'error'
                    })
                } else {
                    if(this.superiorId == '' || this.superiorId == undefined){
                        this.superiorId = 1
                    }
                    let cnt = {
                        userId:localStorage.getItem('userId'),
                        name: this.mechName,
                        code: this.mechCode,
                        province: this.province,
                        city: this.city,
                        district: this.district,
                        address: this.mechAddress,
                        imgOrg: this.mechCodeImgUrl,
                        imgAuth: this.mechGrantImgUrl,
                        shareAmount: this.shareAmount,
                        level:this.level,
                        superiorId: this.superiorId,
                        resourceShares:this.resourceShares,
                        assetShares:this.assetShares
                    };
                    this.createORGApply(cnt)
                }
            }
        },
        mounted(){

            //拼接oss地址前缀
            let date = new Date()
            let year =''+date.getFullYear()
            let month =''+date.getMonth()+1
            if(month.length<2){
                month = '0'+month
            }
            let day = ''+date.getDate()
            if(day.length<2){
                day ='0'+ day
            }
            this.address = '/mechanism/'+year+month+day+'/'

            this.levelList = this.$constData.orgLevel
            this.level = this.levelList[3].key
        },
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

    .text-box {
        margin-left: 50px;
    }

    .row-box2 {
        margin-top: 20px;
    }

    .row-box3 {
        margin-top: 20px;
        text-align: center;
        padding-bottom: 20px;
    }
    .image-box {
        margin-left: 50px;
        width: 400px;
        height: 300px;
        overflow: hidden;
        float: left;
    }

    .image-box img {
        width: 400px;
        height: 300px;
        overflow: hidden;
        cursor: pointer;
    }
    .image-load{
        float: left;
        margin-left: 50px;
        line-height: 150px;
    }

</style>
