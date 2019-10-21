<template>
	<div class="box">
		<div class="org_head">
			选择机构
		</div>
		<div class="org_search">
			<div style="org_input">
				<el-input placeholder="请输入机构名称" v-model="org_name" class="input-with-select">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
		</div>
		<div class="org_list">
			<div class="org_list_title">
				<div class="title-list">
					机构名称
				</div>
				<div class="title-list">
					机构地址
				</div>
				<div class="title-list" style="border: none;">
					操作
				</div>
			</div>
			<div class=" " v-for="(org,index) in orgList" :key="index">
				<div class="box">
					<div class="title-list">
						{{org.id}}
					</div>
					<div class="title-list">
						{{org.title}}
					</div>
					<div class="title-list" style="border: none;">
						<el-button @click="accept(index)" :disabled="org.a_ret">同意</el-button>
						<el-button @click="reject(index)" :disabled="org.r_ret">驳回</el-button>
					</div>
				</div>
			</div>
		</div>



	</div>
</template>
<div>



</div>

<script>
	export default {
		name: 'ORGListPage',
		data() {
			return {
				org_name: '',
				orgList: []
			}
		},
		methods: {
			addList() {
				
			}
		},
		mounted(){
			// getORGs(){
			// 	let cnt ={
			// 		
			// 	}
			// 	this.$api.getORGs()
			// }
		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: 500px;
		background-color: #0086B3;
	}
	.title-list {
		float: left;
		width: 30%;
		height: 50px;
		border-right: 1px solid #aaa;
		font-size: 16px;
		color: 666;
		text-align: center;
		line-height: 50px;
		background-color: #DD4A68;
	}

	.org_head {
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 25px;
		background-color: #63A35C;
	}

	.org_search {
		width: 100%;
		height: 50px;
		background-color: #708090;
		line-height: 50px;
		margin-top: 25px;
	}

	.org_list {
		width: 100%;
		height: 500px;
		margin-left: 5%;
		margin-top: 25px ;
	}

	.el-input {
		width: 400px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
</style>
