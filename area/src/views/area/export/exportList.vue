<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				<div class="tab-box">
					<el-button type="primary" @click="addExport">选择组织导出数据</el-button>
				</div>
			</el-col>
		</el-row>

		<el-row class="row-box1">
			<el-row>
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="搜索组织">
						<el-input v-model="searchData" placeholder="请输入组织名称搜索" style="width:400px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="searchBtn">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<template v-if="tableData.length>0">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="title" label="机构名称" width="400"></el-table-column>
					<el-table-column prop="createTime" label="执行时间" :formatter="timerFliter"></el-table-column>
					<el-table-column prop="status" label="导出数据文件状态">
						<template slot-scope="scope">
							<span style="color:#67c23a" v-if="scope.row.status == 1">{{statusFliter(scope.row.status)}}</span>
							<span style="color:#409EFF" v-if="scope.row.status == 0">{{statusFliter(scope.row.status)}}</span>
							<span style="color:#F56C6C" v-if="scope.row.status == 3">{{statusFliter(scope.row.status)}}</span>
						</template>


					</el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<p>
				当前第 {{page}} 页
				<el-button type="primary" size="mini" :disabled="page==1" @click="changePage(page-1)">上一页</el-button>
				<el-button type="primary" size="mini" :disabled="pageOver ==true" @click="changePage(page+1)">下一页</el-button>
			</p>
		</el-row>

		<el-dialog title="选择导出组织" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="搜索选择组织" label-width="100px">
					<el-select v-model="checkIndex" @change="checkItem()" filterable placeholder="请选择机构" style="width:70%">
						<el-option v-for="(item,index) in orgList" :key="index" :label="item.name" :value="index"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="createExport">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "exportList",
		data() {
			return {
				tableData: [],
				count: 10,
				page: 1,
				pageOver: true,
				dialogFormVisible: false,
				checkOrgInfo: "",
				checkIndex: "",
				orgList: [],
				orgPage: 1,
				orgCount: 500,
				searchData: ""
			};
		},
		methods: {
			/** 过滤器 */
			timerFliter(row, col, value) {
				let dataTime = new Date(value);
				let dataTime2 =
					dataTime.toLocaleDateString() +
					" " +
					dataTime.toLocaleTimeString("chinese", {
						hour12: false
					});
				return dataTime2;
			},
			/** 状态*/
			statusFliter(value) {
				if (value == 0) {
					return "等待生成文件";
				} else if (value == 1) {
					return "数据已生成文件";
				} else if (value == 2) {
					return "数据正在生成文件，请等待...";
				}
			},

			/** 获取所有的组织列表 */
			getOrgs() {
				let cnt = {
					count: 500,
					offset: (this.orgPage - 1) * this.orgCount,
					superiorId: localStorage.getItem("orgId")
				};
				this.$area.getORGs(cnt, res => {
					let arr = [];
					if (res.data.rc == this.$util.RC.SUCCESS) {
						arr = this.$util.tryParseJson(res.data.c);
					} else {
						arr = [];
					}

					this.orgList = this.orgList.concat(arr);

					if (arr.length == this.orgCount) {
						this.orgPage = this.orgPage + 1;
						this.getOrgs();
					}
				});
			},
			/**创建一个导出数据的任务 */
			addExport() {
				this.dialogFormVisible = true;
			},
			/**选择一个组织进行导出 */
			checkItem() {
				this.checkOrgInfo = this.orgList[this.checkIndex];
			},
			/** 创建导出任务的请求 */
			createExport() {
				let cnt = {
					areaId: localStorage.getItem("orgId"),
					title: this.checkOrgInfo.name, // String 任务标题
					orgId: this.checkOrgInfo.id, // Long 组织编号
					userId: localStorage.getItem("userId") // Long 用户编号
				};
				this.$area.createExportTask(cnt, res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							type: "success",
							message: "已开始执行导出数据"
						});
					}

					this.dialogFormVisible = false
					this.searchData = ''
					this.checkIndex = ''
					this.changePage(1)
				});
			},

			/**获取所有的导出列表 */
			getExportTaskLikeTitle(cnt) {
				this.$area.getExportTaskLikeTitle(cnt, res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c);
					} else {
						this.tableData = [];
					}
					if (this.tableData.length < this.count) {
						this.pageOver = true;
					} else {
						this.pageOver = false;
					}
				});
			},

			/**分页 */
			changePage(page) {
				this.page = page;
				let cnt = {}
				if (this.searchData == '') {
					cnt = {
						areaId: localStorage.getItem("orgId"),
						count: this.count,
						offset: (this.page - 1) * this.count
					}
				} else {
					cnt = {
						areaId: localStorage.getItem("orgId"),
						title: this.searchData,
						count: this.count,
						offset: (this.page - 1) * this.count
					}
				}
				this.getExportTaskLikeTitle(cnt);
			},

			/** 导出详情 */
			infoBtn(info) {
				this.$store.state.nowPage = this.page
				this.$router.push({
					path: "/exportInfo",
					name: "exportInfo",
					params: {
						info: info
					}
				});
			},
			searchBtn() {
				let cnt = {};
				if (this.searchData == "") {
					cnt = {
						areaId: localStorage.getItem("orgId"),
						count: this.count,
						offset: (this.page - 1) * this.count
					}
				} else {
					cnt = {
						areaId: localStorage.getItem("orgId"),
						title: this.searchData,
						count: this.count,
						offset: (this.page - 1) * this.count
					}
				}
				this.getExportTaskLikeTitle(cnt);
			}
		},
		mounted() {
			this.page = this.$store.state.nowPage
			let cnt = {
				areaId: localStorage.getItem("orgId"),
				count: this.count,
				offset: (this.page - 1) * this.count
			};
			this.getExportTaskLikeTitle(cnt);

			this.getOrgs();
		}
	};
</script>

<style scoped lang="scss">
	.nav-btn {
		float: left;
		margin-left: 15px;
	}

	.row-box {
		background: #fff;
		padding: 15px 0;
	}

	.row-box1 {
		margin-top: 20px;
		padding: 15px;
		background: #fff;
	}

	.tab-box {
		width: auto;
		margin-left: 20px;
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
		font-size: 1.6rem;
		color: #333;
		line-height: 40px;
	}

	.image-box {
		margin-left: 50px;
		width: 200px;
		height: 150px;
		overflow: hidden;
	}

	.image-box img {
		width: 200px;
		height: 150px;
		overflow: hidden;
		cursor: pointer;
	}
</style>
