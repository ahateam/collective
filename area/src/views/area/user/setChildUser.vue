<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				设置 {{info.name}} 组织的管理员
			</el-col>
		</el-row>

		<el-row class="row-box1">
			<el-row>
				<el-button type="primary" class="nav-btn" @click="addShowBtn">新增管理员</el-button>
			</el-row>

			<el-row style="margin-top: 2rem">
				<template>
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column prop="realName" label="管理员姓名">
						</el-table-column>
						<el-table-column prop="mobile" label="手机号">
						</el-table-column>
						<el-table-column prop="idNumber" label="身份证">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<!--<el-button @click="info(scope.row,true)" type="text" size="small">详情</el-button>-->
								<!--<el-button @click="setAdmin(scope.row)" type="text" size="small">设置管理员</el-button>-->
								<!--<el-button @click="infoMoney(scope.row)" type="text" size="small">机构资金</el-button>-->
								<el-button @click="del(scope.row)" type="text" size="small" style="color: #f44">删除
								</el-button>
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

		<el-dialog title="新增管理员" :visible.sync="addShow">
			<el-form>
				<el-form-item label="管理员姓名" label-width="150px">
					<el-input v-model="realName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" label-width="150px">
					<el-input v-model="idNumber" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="150px">
					<el-input v-model="mobile" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addShow = false">取 消</el-button>
				<el-button type="primary" @click="addAdminBtn">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="删除管理员" :visible.sync="delShow" width="30%">
			<span>是否确认删除该管理员？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delShow = false">取 消</el-button>
				<el-button type="primary" @click="delBtn">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: "setChildUser",
		data() {
			return {
				info: '',

				addShow: false,

				mobile: '',
				realName: '',
				idNumber: '',

				tableData: [],
				offset: 0,
				count: 10,
				page: 1,
				pageOver: false,

				delId: '',
				delShow: false,

			}
		},
		methods: {
			getSubORGUser(cnt) {
				this.$area.getSubORGUser(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
					} else {
						this.tableData = []
					}
					console.log(this.tableData)
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
				let cnt = {
					orgId: this.info.id, // Long 银行机构id
					level: this.info.level, // Byte 组织级别
					count: this.count, // Integer
					offset: (this.page - 1) * this.count, // Integer
				}
				this.getSubORGUser(cnt)

			},
			//新增
			addShowBtn() {
				this.addShow = true
			},
			addAdminBtn() {
				if (this.mobile == ' ' || this.realName == '' || this.idNumber == '') {
					this.$message.error('请将管理员的资料输入完整')
				} else {
					let cnt = {
						orgId: this.info.id,
						level: this.info.level,
						idNumber: this.idNumber,
						mobile: this.mobile,
						realName: this.realName
					}


					this.$area.createORGAdmin(cnt, (res) => {

						if (res.data.rc == this.$util.RC.SUCCESS) {


							this.$message.success('新增管理员成功')
						} else {
							this.$message.error('新增失败,输入的信息有误')
						}
						this.addShow = false
						this.idNumber = ''
						this.realName = ''
						this.mobile = ''
						this.changePage(1)
					})
				}
			},
			del(item) {
				this.delShow = true
				this.delId = item.id
			},
			delBtn() {
				let cnt = {
					orgId: this.info.id, // Long 银行机构id
					userId: this.delId, // Long 用户id
				}

				this.$area.delORGUserAdmin(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.delShow = false
						this.delId = ''
						this.$message.success('删除成功')
					} else {
						this.$message.error('删除失败')
					}
					this.delShow = false
					this.changePage(this.page)
				})

			}
		},
		mounted() {

			this.page = this.$store.state.nowPage
			if (this.$route.params.info == '' || this.$route.params.info == undefined) {
				this.$message.error('数据失效，请重新选择下级机构')
				this.$router.push('/areaChildUser')
			}
			this.info = this.$route.params.info
			let cnt = {
				orgId: this.info.id, // Long 银行机构id
				level: this.info.level, // Byte 组织级别
				count: this.count, // Integer
				offset: (this.page - 1) * this.count, // Integer
			}
			this.getSubORGUser(cnt)


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
