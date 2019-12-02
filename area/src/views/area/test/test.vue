<template>
	<div>
		<ul v-if="list.length">dasdasdasd
			<li v-for="(item,index) in list" :key="index">
				{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "test",
		data() {
			return {
				list: [],

			}
		},
		methods: {
			getOrgList(cnt) {
				this.$area.getCooperativeList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.list = this.$util.tryParseJson(res.data.c)
						console.log(this.list)
					}
				})
			}
		},
		components: {

		},
		created() {

		},
		mounted() {
			let cnt = {
				ORGName: '汇川',
				offset: 0,
				count: 15
			}
			this.getOrgList(cnt)
		}
	}
</script>

<style>
</style>
