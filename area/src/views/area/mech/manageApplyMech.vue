<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				<router-link to="/areaAddMech">
					<el-button type="primary" class="nav-btn">申请机构</el-button>
				</router-link>
			</el-col>
		</el-row>
		<el-row class="row-box1">
			<el-row class="row-search">
				<el-col :span="12">
					<el-input placeholder="请输入组织名称查询" v-model="searchData">
						<el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
					</el-input>
				</el-col>
			</el-row>
			<template>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="name" label="机构名称" width="400"></el-table-column>
					<el-table-column prop="code" label="组织机构代码"></el-table-column>
					<el-table-column prop="address" label="机构具体层级"></el-table-column>
					<el-table-column prop="examine" label="申请状态" :formatter="statusFliter"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button @click="info(scope.row,false)" type="text" size="small" v-if="scope.row.examine == '0' || scope.row.examine == '2'">详情</el-button>
							<el-button @click="info(scope.row,true)" type="text" size="small" v-if="scope.row.examine == '1' || scope.row.examine == '3'">详情</el-button>

							<el-button @click="editMech(scope.row,false)" type="text" size="small" v-if="scope.row.examine == '0' || scope.row.examine == '2'">修改信息</el-button>
							<el-button @click="editMech(scope.row,true)" type="text" size="small" v-if="scope.row.examine == '1' || scope.row.examine == '3'">修改信息</el-button>

							<el-button @click="del(scope.row)" type="text" size="small" v-if="scope.row.examine != 1">
								<span style="color: #f44;">取消申请</span>
							</el-button>
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
		<el-dialog title="取消申请" :visible.sync="delShow" width="30%">
			<span>是否确认取消申请</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="delBtn">确认取消申请</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "applyMech",
		data() {
			return {
				tableData: [],
				offset: 0,
				count: 10,
				delShow: false,
				delId: "",
				applyStatus: {},
				page: 1,
				pageOver: false,
				searchData: ""
			};
		},
		methods: {
			//ajax请求封装层
			//获取申请的机构列表
			getORGExamineByUser(cnt) {
				this.$area.getORGExamineByUser(cnt, res => {
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

			//分页
			changePage(page) {
				this.page = page;
				if (this.searchData) {
					let cnt = {
						userId: localStorage.getItem("userId"), // Long 用户编号
						ORGName: this.searchData, // String 机构名称
						count: this.count, // Integer
						offset: (this.page - 1) * this.count // Integer
					};
					this.getSearchData(cnt);
				} else {
					let cnt = {
						userId: localStorage.getItem("userId"),
						offset: (this.page - 1) * this.count,
						count: this.count
					};
					this.getORGExamineByUser(cnt);
				}
			},
			//取消申请机构--删除
			delORGExamine(cnt) {
				this.$area.delORGExamine(cnt, res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message.success("操作成功");
					} else {
						this.$message.error("操作失败");
					}
					this.delShow = false
					this.changePage(this.page)
				});
			},

			//数据过滤层
			statusFliter(row, col, value) {
				if (value == "0" || value == "3") {
					return "等待审核";
				} else if (value == "1") {
					return "审核成功";
				} else {
					return "审核失败";
				}
			},

			//普通事件层
			//详情跳转
			info(row, isMech) {
				this.$store.state.nowPage = this.page
				this.$router.push({
					path: "/areaMechInfo",
					name: "areaMechInfo",
					params: {
						info: row,
						isMech: isMech
					}
				});
			},
			//修改信息
			editMech(row, isMech) {
				this.$store.state.nowPage = this.page
				this.$router.push({
					path: "/areaEditMech",
					name: "areaEditMech",
					params: {
						info: row,
						isMech: isMech
					}
				});
			},
			//删除提示
			del(row) {
				this.delShow = true;
				this.delId = row.id;
			},
			delBtn() {
				let cnt = {
					examineId: this.delId
				};
				this.delORGExamine(cnt);
			},

			//根据组织名称查询用户的组织申请列表
			getSearchData(cnt) {
				this.$area.getORGExamineByUserANDLikeORGName(cnt, res => {
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
			searchBtn() {
				this.page = 1;
				if (this.searchData) {
					let cnt = {
						userId: localStorage.getItem("userId"), // Long 用户编号
						ORGName: this.searchData, // String 机构名称
						count: this.count, // Integer
						offset: (this.page - 1) * this.count // Integer
					};
					this.getSearchData(cnt);
				} else {
					let cnt = {
						userId: localStorage.getItem("userId"),
						offset: this.offset,
						count: this.count
					};
					this.getORGExamineByUser(cnt);
				}
			}
		},
		mounted() {
			this.page = this.$store.state.nowPage
			const loading = this.$loading({
				lock: true,
				text: "拼命加载中...",
				spinner: "el-icon-loading"
			});
			this.applyStatus = this.$constData.applyStatus;
			let cnt = {
				userId: localStorage.getItem("userId"),
				offset: (this.page - 1) * this.count,
				count: this.count
			};
			this.getORGExamineByUser(cnt);
			loading.close();
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
</style>
