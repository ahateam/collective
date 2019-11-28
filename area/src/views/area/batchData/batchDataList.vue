<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				<div class="tab-box">
					<router-link to="/addChild">
						<el-button type="primary" class="nav-btn">新增下级机构</el-button>
					</router-link>
				</div>
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
					<el-table-column prop="name" label="机构名称"></el-table-column>
					<el-table-column prop="code" label="组织机构代码"></el-table-column>
					<el-table-column prop="address" label="机构具体层级"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
							<el-button type="danger" size="mini" @click="open(scope.row)">删除合作社</el-button>
							<el-button type="danger" size="mini" @click="assetImport(scope.row)">删除成员</el-button>
							<el-button type="danger" size="mini" @click="assetImport(scope.row)">删除资产</el-button>
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
	</div>

</template>

<script>
	export default {
		name: "batchDataList",
		data() {
			return {
				tableData: [],
				page: 1,
				pageOver: false,

				count: 10,
				offset: 0,

				addressMech: "",
				searchData: ""
			};
		},
		methods: {
			changePage(page) {
				this.page = page;
				if (this.searchData) {
					let cnt = {
						// districtId: localStorage.getItem("orgId"), // Long 区级编号
						ORGName: this.searchData, // String 下属机构名称
						count: this.count, // Integer
						offset: (this.page - 1) * this.count // Integer
					};
					this.getCooperativeList(cnt);
				} else {
					let cnt = {
						// superiorId: localStorage.getItem("orgId"),
						count: this.count, // Integer
						offset: (this.page - 1) * this.count // Integer
					};
					this.getCooperativeList(cnt);
				}
			},
			open(row) {
				this.$confirm("此操作将永久删除该合作社以及所有相关数据, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.delOrg(row);
						console.log("确定删除合作社！");
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			delOrg(row) {
				let cnt = {
					orgId: row.id // Long 组织id
				};
				this.$area.delOrg(cnt, res => {
					this.$message({
						type: "success",
						message: "删除成功!"
					});
					let cnt = {
						count: this.count,
						offset: (this.page - 1) * this.count
					};
					this.getCooperativeList(cnt);
				});
			},
			searchBtn() {
				this.page = 1;
				if (this.searchData == "") {
					let cnt = {
						// superiorId: localStorage.getItem("orgId"),
						count: this.count,
						offset: (this.page - 1) * this.count
					};
					this.getCooperativeList(cnt);
				} else {
					let cnt = {
						// districtId: localStorage.getItem("orgId"), // Long 区级编号
						ORGName: this.searchData, // String 下属机构名称
						count: this.count, // Integer
						offset: (this.page - 1) * this.count // Integer
					};
					this.getCooperativeList(cnt);
				}
			},
			getCooperativeList(cnt) {
				this.$area.getCooperativeList(cnt, res => {
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
			//详情
			infoBtn(row) {
				this.$store.state.nowPage = this.page
				this.$router.push({
					path: "/childInfo",
					name: "childInfo",
					params: {
						info: row
					}
				});
				console.log(row);
			},


		},
		mounted() {
			this.page = this.$store.state.nowPage
			let cnt = {
				count: this.count,
				offset: (this.page - 1) * this.count
			};
			this.getCooperativeList(cnt);
		}
	}
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

	.row-search {
		padding: 10px 0
	}
</style>
