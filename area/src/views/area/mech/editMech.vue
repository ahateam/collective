<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				修改行政管理组织机构信息
			</el-col>
		</el-row>

		<el-row class="row-box1">
			<el-col :span="24">
				<el-col :span="4">
					<div class="title-box">管理机构名称:</div>
				</el-col>
				<el-col :span="18">
					<div class="text-box">
						<el-input v-model="mechName" placeholder="管理机构名称"></el-input>
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
								<el-option v-for="(item,index) in provinceList" :key="index" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
							<el-select v-model="city" placeholder="请选择市" @focus="proListBtn(levelList[1].key)">
								<el-option v-for="(item,index) in cityList" :key="index" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
							<el-select v-model="district" placeholder="请选择区县" @focus="proListBtn(levelList[2].key)">
								<el-option v-for="(item,index) in districtList" :key="index" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</div>
					</el-col>
				</div>
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
						<div class="title-box">合作社创建时间:</div>
					</el-col>
					<el-col :span="18">
						<div class="text-box">
							<el-date-picker v-model="orgCreateTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp">
							</el-date-picker>
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
						<div class="title-box">总资源股:</div>
					</el-col>
					<el-col :span="18">
						<div class="text-box">
							<el-input type="number" v-model="resourceShares" placeholder="请输入组织机构总资源股"></el-input>
						</div>
					</el-col>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="row-box2">
					<el-col :span="4">
						<div class="title-box">总资产股:</div>
					</el-col>
					<el-col :span="18">
						<div class="text-box">
							<el-input type="number" v-model="assetShares" placeholder="请输入组织机构总资产股"></el-input>
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
							<img :src="getOssFile(mechCodeImgUrl)" alt="" v-if="mechCodeImgUrl != ''">
							<span v-if="mechCodeImgUrl == ''" style="font-size: 20px;color: #666;">暂无图片，请上传</span>
						</div>
						<div class="image-load">
							<div class="text-box">
								<span style="font-size: 1.4rem;color: #f60;">
									目前只支持 .jpg 格式的文件上传
								</span>
								<input @change="getMechData($event)" type="file" class="upload" />
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
							<img :src=" getOssFile(mechGrantImgUrl)" alt="" v-if="mechGrantImgUrl != ''">
							<span v-if="mechGrantImgUrl == ''" style="font-size: 20px;color: #666;">暂无图片，请上传</span>
						</div>
						<div class="image-load">
							<div class="text-box">
								<span style="font-size: 1.4rem;color: #f60;">
									目前只支持 .jpg 格式的文件上传
								</span>
								<input @change="getMechData1($event)" type="file" class="upload" />
							</div>
						</div>
					</el-col>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="row-box3">
					<el-button type="primary" @click="editBtn">确认修改提交</el-button>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ossAuth from '@/data/api/oss/ossAuth'
	let client = ossAuth.client

	export default {
		name: "addMech",
		data() {
			return {
				orgCreateTime: '',
				isMech: false,
				isEditpro: false,
				mechName: '',
				province: '', //省份
				city: '', //市
				district: '', //区
				level: '', //机构等级
				levelList: [], //等级列表
				mechAddress: '',
				mechCode: '',
				superiorId: '',
				loading: false,
				orgId: '',
				mechCodeImg: '',
				mechGrantImg: '',

				mechCodeImgUrl: '',
				mechGrantImgUrl: '',

				shareAmount: '', //总股份数
				address: '', //oss地址
				assetShares: '',
				resourceShares: '',

				provinceList: [],
				cityList: [],
				districtList: [],
				superiorList: []
			}
		},
		watch: {
			province(val, oldVal) {
				if (oldVal != '') {
					this.city = ''
					this.district = ''
					this.isEditpro = true
				}

			},
			city(val, oldVal) {
				if (oldVal != '') {
					this.district = ''
					this.isEditpro = true
				}
			},
			district(val, oldVal) {
				if (oldVal != '') {
					this.isEditpro = true
				}
			}
		},
		methods: {
			//ajax请求封装层
			// 创建组织申请
			oRGApplyAgain(cnt) {
				this.$area.oRGApplyAgain(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							showClose: true,
							message: '申请成功，等待审核',
							type: 'success'
						});
						this.$router.push('/areaManageApplyMech')

					} else {
						this.$message({
							showClose: true,
							message: '申请失败',
							type: 'error'
						});
					}
				})
			},

			//普通事件层

			getOssFile(url) {
				return this.$commen.getOssUrl(url)
			},
			//进度条
			proListBtn(key) {
				console.log(key)
				if (key == this.levelList[0].key) {
					let cnt = {
						level: key, // Byte 等级
						father: 1,
						count: 500, // Integer
						offset: 0, // Integer
					}
					this.$area.getProCityDistrict(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.provinceList = this.$util.tryParseJson(res.data.c)
							console.log(this.provinceList)
						}
					})
				} else if (key == this.levelList[1].key) {
					let cnt = {
						level: key, // Byte 等级
						father: this.province,
						count: 500, // Integer
						offset: 0, // Integer
					}
					this.$area.getProCityDistrict(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.cityList = this.$util.tryParseJson(res.data.c)
						}
					})
				} else if (key == this.levelList[2].key) {
					let cnt = {
						level: key, // Byte 等级
						father: this.city,
						count: 500, // Integer
						offset: 0, // Integer
					}
					this.$area.getProCityDistrict(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.districtList = this.$util.tryParseJson(res.data.c)
						}
					})
				}
			},

			getOrgByNameAndLevelBtn(orgName) {
				let level = parseInt(this.level) - 1
				let cnt = {
					level: level, // Byte 等级
					orgName: orgName, // String 需要查询的名称
				};
				this.$area.getOrgByNameAndLevel(cnt, (res) => {
					this.superiorList = this.$util.tryParseJson(res.data.c)
					console.log(this.superiorList)
				})

			},

			getProgress(p) {
				this.num = p
			},
			//开始导入到oss
			doUpload(file, type) {
				this.$emit('getProgress', 0)
				let date = new Date()
				this.size = file.size
				let fileType = file.type.substr(file.type.indexOf('/') + 1)
				let tmpName = date.getTime() + '.' + fileType
				tmpName = this.address + tmpName
				this.multipartUpload(tmpName, file, type)
			},
			//分片上传
			multipartUpload(upName, upFile, type) {
				//Vue中封装的分片上传方法（详见官方文档）
				let _this = this
				const progress = async function(p) {
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

						if (type == 'code') {
							_this.mechCodeImgUrl = upName
						} else if (type == 'grant') {
							_this.mechGrantImgUrl = upName
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
			sel: function(data) {
				this.province = data.province.value
				this.city = data.city.value
				this.district = data.area.value
			},
			getMechData(event) {
				this.mechCodeImg = event.target.files[0]
				this.doUpload(this.mechCodeImg, 'code')
			},
			getMechData1(event) {
				this.mechGrantImg = event.target.files[0]
				this.doUpload(this.mechGrantImg, 'grant')
			},
			editBtn() {
				this.$store.state.nowPage = 1
				if (this.mechName == '' || this.province == '' || this.mechAddress == '' || this.mechCode == '' || this.city == '' ||
					this.district == '') {
					this.$message({
						showClose: true,
						message: '请先将信息填写完整',
						type: 'error'
					})
				} else {
					let obj = {}
					if (this.isMech == true) {
						obj.orgId = this.info.id
					}

					let cnt = {
						orgCreateTime: this.orgCreateTime,
						orgExamineId: this.info.id,
						userId: localStorage.getItem('userId'),
						name: this.mechName,
						code: this.mechCode,
						province: this.province,
						city: this.city,
						district: this.district,
						address: this.mechAddress,
						imgOrg: this.mechCodeImgUrl,
						imgAuth: this.mechGrantImgUrl,
						shareAmount: Number(this.shareAmount),
						level: this.level,
						superiorId: localStorage.getItem('orgId'),
						orgId: this.orgId,
						updateDistrict: this.isEditpro,
						resourceShares: Number(this.resourceShares),
						assetShares: Number(this.assetShares)
					};
					Object.assign(cnt, obj)
					console.log(cnt)
					this.oRGApplyAgain(cnt)
				}
			},

		},
		mounted() {
			this.page = this.$store.state.nowPage

			this.info = this.$route.params.info
			this.isMech = this.$route.params.isMech
			console.log('1111111')
			console.log(this.info)
			this.orgId = this.info.id

			this.mechName = this.info.name
			this.level = this.info.level
			this.superiorId = this.info.superiorId
			this.province = ''
			this.city = ''
			this.district = ''
			this.orgCreateTime = this.info.orgCreateTime


			this.mechAddress = this.info.address

			this.mechCode = this.info.code

			this.shareAmount = this.info.shareAmount
			this.mechCodeImgUrl = this.info.imgOrg
			this.mechGrantImgUrl = this.info.imgAuth
			this.resourceShares = this.info.resourceShares
			this.assetShares = this.info.assetShares

			//拼接oss地址前缀
			let date = new Date()
			let year = '' + date.getFullYear()
			let month = date.getMonth() + 1
			month = '' + month
			if (month.length < 2) {
				month = '0' + month
			}
			let day = '' + date.getDate()
			if (day.length < 2) {
				day = '0' + day
			}
			this.address = 'mechanism/' + year + month + day + '/'
			this.levelList = this.$constData.orgLevel

			//请求对应的地址默认值展示
			if (this.isMech == true) {
				let cnt = {
					orgId: this.info.id, // Long 组织id
				}
				this.$area.getORGDistrict(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {

						this.provinceList.push(this.$util.tryParseJson(res.data.c).province)
						this.cityList.push(this.$util.tryParseJson(res.data.c).city)
						this.districtList.push(this.$util.tryParseJson(res.data.c).district)
						this.province = this.provinceList[0].id
						this.city = this.cityList[0].id
						this.district = this.districtList[0].id
						this.isEditpro = false
						console.log(this.provinceList[0].id)
					}
				})
			} else {
				let cnt = {
					orgExamineId: this.info.id, // Long 组织id
				}
				this.$area.getORGDistrictByOrgApplyId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.provinceList.push(this.$util.tryParseJson(res.data.c).province)
						this.cityList.push(this.$util.tryParseJson(res.data.c).city)
						this.districtList.push(this.$util.tryParseJson(res.data.c).district)
						this.province = this.provinceList[0].id
						this.city = this.cityList[0].id
						this.district = this.districtList[0].id
						this.isEditpro = false
						console.log(this.provinceList[0])
					}
				})
			}




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

	.image-load {
		float: left;
		margin-left: 50px;
		line-height: 150px;
	}
</style>
