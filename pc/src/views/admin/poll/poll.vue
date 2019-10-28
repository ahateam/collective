<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				<router-link to="/pollInfo">
					<el-button type="primary" class="nav-btn">新增投票</el-button>
				</router-link>
			</el-col>
		</el-row>
		<el-row class="row-box1">
			<el-row>
				<el-col :span="24">
					<span style="font-size: 1.6rem;color: #666;">投票列表</span>

				</el-col>
			</el-row>

			<el-row class="row-search" style="margin-top: 20px;">
				<el-col :span="12">
					<el-input placeholder="请输入投票标题查询" v-model="title">
						<el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
					</el-input>
				</el-col>
			</el-row>
			<el-row class="row-box1">
				<el-col :span="24">
					<template>
						<el-table :data="tableData" border style="width: 100%">
							<el-table-column prop="title" label="投票名称">
							</el-table-column>
							<el-table-column prop="template" label="投票模板" :formatter="templateFilter">
							</el-table-column>
							<el-table-column prop="type" label="选项类型" width="100" :formatter="typeFilter">
							</el-table-column>
							<el-table-column prop="quorum" label="应到参会人数">
							</el-table-column>
							<el-table-column prop="startTime" label="开始时间" :formatter="timeFilter">
							</el-table-column>

							<el-table-column prop="status" label="状态" :formatter="statusFilter">
							</el-table-column>
							<el-table-column label="操作" width="250">
								<template slot-scope="scope">

									<el-button @click="editVoteBtn(scope.row)" type="text" size="small">编辑</el-button>
									<el-button @click="editStatus(scope.row)" type="text" size="small">更改状态</el-button>
									<!--<el-button @click="putRes(scope.row)" type="text" size="small">结论打印</el-button>-->
									<el-button @click="delVoteModal(scope.row)" type="text" size="small" style="color: #f44;">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-col>
				<el-col :span="24" style="margin-top: 20px">
					<div class="page-btn " style=" float: right; font-size: 16px;color: #666;">
						<span class="page-text">当前页码：第 <span style="color: #f60;">{{page}}</span> 页</span>
						<el-button type="primary" :disabled="page==1" @click="changePage(page-1)">上一页</el-button>
						<el-button type="primary" :disabled="pageOver ==true" @click="changePage(page+1)">下一页</el-button>
					</div>
				</el-col>
			</el-row>
		</el-row>

		<el-dialog title="删除表决信息" :visible.sync="dialogVisible" width="30%">
			<span>是否确认删除该表决信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="delBtn">确 定</el-button>
			</span>
		</el-dialog>





	</div>
</template>

<script>
	export default {
		name: "poll",
		data() {
			return {
				dialogVisible: false,
				delId: '',
				showDialog: false,
				//议程列表
				tableData: [],
				addVoteShow: false,
				isVoteEdit: false,
				editVoteInfo: '',
				isActive: false,

				//分页相关
				page: 1, //当前页码
				count: 10, //每一页数据条数
				pageOver: false, //true:最后一页 false:没有到最后一页

				//模糊查詢
				title: '',
			}
		},
		methods: {
			//ajax请求层
			//启用/禁用投票
			setVoteActivation(cnt) {
				this.$api.setVoteActivation(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						if (res.data.c == 0) {
							this.$message.error('该投票时间截止，不能启用')
						} else {
							this.$message.success('禁用成功')
						}

					} else {
						this.$message.error('操作失败')
					}

					this.changePage(this.page)

				})
			},
			//删除投票的选项
			delVote(cnt) {
				this.$api.delVote(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message.success('删除表决成功！')
					} else {
						this.$message.error('删除表决失败！')
					}
					this.dialogVisible = false
					this.changePage(this.page)

				})
			},
			//
			getVotes(cnt) {
				this.$api.getVotes(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
					} else {
						this.tableData = []
					}
					if (this.tableData.length < this.count) {
						this.pageOver = true
					} else {
						this.pageOver = false
					}
				})
			},





			//数据过滤层
			//所有的议程
			timeFilter(row, col, value) {
				let timer = new Date(value)
				let time = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return time
			},
			templateFilter(row, col, value) {
				if (value == '0') {
					return '选举投票'
				} else {
					return '普通投票'
				}
			},
			typeFilter(row, col, value) {
				if (value == '0') {
					return '单选'
				} else {
					return '多选'
				}
			},
			statusFilter(row, clo, value) {
				if (value == 0) {
					return "启用"
				} else {
					return "禁用"
				}
			},

			//普通事件层
			editStatus(info) {
				let that = this
				if (info.status == 0) {
					this.$confirm('确认禁用该议程')
						.then(_ => {
							let cnt = {
								voteId: info.id, // Long 投票编号
								activation: false, // Boolean 启用/禁用
							};
							this.setVoteActivation(cnt)
						})
						.catch(_ => {});

				} else {
					this.$confirm('确认启用该议程')
						.then(_ => {
							let cnt = {
								voteId: info.id, // Long 投票编号
								activation: true, // Boolean 启用/禁用
							};
							this.setVoteActivation(cnt)
						})
						.catch(_ => {});

				}
			},

			delVoteModal(info) {
				this.delId = info.id
				this.dialogVisible = true
			},
			delBtn() {
				let cnt = {
					voteId: this.delId
				}
				this.delVote(cnt)
			},
			editVoteBtn(info) {
				this.$store.state.nowPage = this.page

				this.$router.push({
					path: '/pollInfo',
					name: 'pollInfo',
					params: {
						info: info
					}
				})
			},


			//搜索投票名称
			searchBtn() {
				this.page = 1
				let cnt = {}
				if (this.title) {
					cnt = {
						orgId: localStorage.getItem('orgId'),
						title: this.title,
						count: this.count,
						offset: (this.page - 1) * this.count,
					}
				} else {
					cnt = {
						orgId: localStorage.getItem('orgId'),
						count: this.count,
						offset: (this.page - 1) * this.count,
					}
				}
				this.getVotes(cnt)
			},

			//分页
			changePage(page) {
				this.page = page

				let cnt = {}
				if (this.title) {
					cnt = {
						orgId: localStorage.getItem('orgId'),
						title: this.title,
						count: this.count,
						offset: (this.page - 1) * this.count,
					}
				} else {
					cnt = {
						orgId: localStorage.getItem('orgId'),
						count: this.count,
						offset: (this.page - 1) * this.count,
					}
				}

				this.getVotes(cnt)
			}

		},
		mounted() {
			const loading = this.$loading({
				lock: true,
				text: '拼命加载中...',
				spinner: 'el-icon-loading'
			})
			this.page = this.$store.state.nowPage
			let orgId = localStorage.getItem('orgId')
			let cnt = {
				orgId: orgId,
				count: this.count,
				offset: (this.page - 1) * this.count,
			};
			this.getVotes(cnt)
			loading.close()
		}

	}
</script>

<style scoped lang="scss">
	.row-box {
		background: #fff;
		padding: 15px;
		font-size: 1.6rem;
		color: #666;
	}

	.nav-btn {
		float: left;
	}

	.row-box1 {
		margin-top: 20px;
		padding: 15px;
		background: #fff;
	}

	.el-tag {
		margin-top: 10px;
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

	.row-box2 {
		margin-top: 20px;
	}
</style>
