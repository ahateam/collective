<template>
	<div>
		<header-box title="个人中心"></header-box>
		<div class="main-box">
			<div class="img-box">
				<div class="img-info">
					<img src="../../../assets/image/headImage.png" alt="">
				</div>
				<div class="img-title">
					<!--<div class="icon-title">-->
					<!--{{userPost}}-->
					<!--</div>-->
					<div class="name">
						{{name}}
					</div>
				</div>
			</div>

			<div class="content">
				<div class="user-item">
					<div class="item-title">
						用户名称
					</div>
					<div class="item-text">
						{{name}}
					</div>
				</div>
				<div class="user-item">
					<div class="item-title">
						用户职务
					</div>
					<div class="item-text">
						{{userPost}}
					</div>
				</div>
				<!--<div class="user-item">
                    <div class="item-title">
                        联系电话/账号
                    </div>
                    <div class="item-text">
                        {{mobile}}
                    </div>
                </div>-->
				<div class="user-item">
					<div class="item-title">
						身份证号
					</div>
					<div class="item-text">
						{{idNumber}}
					</div>
				</div>

				<div class="user-item">
					<div class="item-title">
						我的股份
					</div>
					<div class="item-text">
						{{shareAmount}}
					</div>
				</div>
				<div class="user-item">
					<div class="item-title">
						表决票数
					</div>
					<div class="item-text">
						{{userInfo.weight}}
					</div>
				</div>
				<div class="user-item" @click="mobileBtn" v-if="!mobile">
					<div class="item-title">
						绑定手机
					</div>
					<div class="item-text">
						未绑定（点击绑定）
					</div>
				</div>
				<div class="user-item" @click="mobileDelBtn" v-else>
					<div class="item-title">
						手机解绑
					</div>
					<div class="item-text">
						{{mobile}}
					</div>
				</div>
				<div class="user-item" @click="wxBtn" v-if="isOpenId == false">
					<div class="item-title">
						绑定微信
					</div>
					<div class="item-text">
						<span> 未绑定（点击绑定）</span>
					</div>
				</div>
				<div class="user-item" @click="wxDelBtn" v-if="isOpenId == true">
					<div class="item-title">
						微信解绑
					</div>
					<div class="item-text">
						<span> 已绑定（点击解绑）</span>
					</div>
				</div>
			</div>

			<div class="update-btn" @click="updateBtn">修改账号信息</div>
			<div class="login-btn" @click="loginBtn">注销登录</div>
		</div>
		<van-dialog v-model="showMobile" title="绑定手机" show-cancel-button :beforeClose="bindingMobile">
			<van-cell-group>
				<van-field v-model="mobile" label="手机号:" placeholder="请输入手机号" />
			</van-cell-group>
		</van-dialog>
	</div>
</template>

<script>
	import HeaderBox from '@/components/head/headerBox'
	import {
		Dialog
	} from 'vant'
	import {
		Toast
	} from 'vant';
	export default {
		name: "user",
		components: {
			HeaderBox
		},
		data() {
			return {
				userInfo: '',
				userPost: '',
				name: '',
				mobile: '',
				idNumber: '',
				weight: '',
				shareAmount: '',

				isOpenId: false,
				showMobile: false,
				isBinding: false,
			}
		},
		methods: {
			//绑定微信弹窗
			wxBtn() {
				Dialog.confirm({
					title: '绑定微信',
					message: '是否绑定当前登录微信信息'
				}).then(() => {
					this.getWXUserCode()
				}).catch(() => {
					// on cancel
				});
			},
			//获取微信用户信息
			getWXUserCode() {
				this.$store.state.wxInfo.wxStatus = 1
				let info = this.$commen.getWXUserCode(this.$store.state.wxInfo.APPID, this.$store.state.wxInfo.REDIRECT_URI)
				Toast(info);
				console.log(info)
			},

			updateBtn() {
				this.$router.push('/userUpdate')
			},
			loginBtn() {
				localStorage.clear()
				this.$router.push('/login')
			},
			wxDelBtn() {
				Dialog.confirm({
					title: '微信解绑',
					message: '是否确认解除微信绑定，解绑微信后将不能使用微信登录与接收微信消息通知'
				}).then(() => {
					let cnt = {
						userId: this.userInfo.id, // Long 用户id
					}
					this.$api.removeOpenId(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							Toast.success('微信解绑成功')
							this.userInfo.openId = ''
							localStorage.setItem('user', JSON.stringify(this.userInfo))
							this.$router.push('/page')
						} else {
							Toast.fail('操作失败')
						}
					})
				}).catch(() => {
					// on cancel
				});

			},
			mobileBtn() {
				this.showMobile = true
			},
			mobileDelBtn() { //手机解绑
				Dialog.confirm({
					title: '确定解绑？',
					message: '解绑手机号将重新登陆'
				}).then(() => {
					let cnt = {
						id: '123',
						userId: this.userInfo.id,
						mobile: null,
					}
					this.$api.editUserMobile(cnt, (res) => {
						if(res.data.rc == this.$util.RC.SUCCESS){
							this.loginBtn() //回到登陆页
						}else{
							Toast.fail('手机解绑失败');
						}
					})
				}).catch(() => {
					// on cancel
				});
			},
			bindingMobile(action, done) { //手机号绑定
				if (action === "confirm") { //点击确定事件
					let cnt = {
						id: '123',
						userId: this.userInfo.id,
						mobile: this.mobile,
					}
					if((/^1[23456789]\d{9}$/.test(this.mobile))){//手机号验证
						this.$api.editUserMobile(cnt,(res)=>{
							if (res.data.rc == this.$util.RC.SUCCESS && res.data.c != '0') {//是否请求成功，手机号是否重复
									let userInfo = JSON.parse(localStorage.getItem('user'))
									userInfo.mobile = this.mobile
									localStorage.setItem('user', JSON.stringify(userInfo))
							}else{
								Toast.fail('手机绑定失败');
							}
							this.$router.push('/page')			
						})	
					}else{
						Toast.fail('手机号错误');
						this.mobile=''
						done()
					}
				}else {
					this.mobile=''
					done() //关闭弹窗
				}
		}
	},
	mounted() {
		this.userInfo = JSON.parse(localStorage.getItem('user'))
		this.name = this.userInfo.realName
		this.mobile = this.userInfo.mobile
		this.idNumber = this.userInfo.idNumber
		this.weight = this.userInfo.weight
		this.shareAmount = this.userInfo.shareAmount

		let orgRoles = this.userInfo.orgRoles
		console.log(this.userInfo)

		if (this.userInfo.openId == undefined || this.userInfo.openId == '') {
			this.isOpenId = false
		} else {
			this.isOpenId = true
		}
		

		let cnt = {}
		this.$api.getSysORGUserRoles(cnt, (res) => {
			let arr = JSON.parse(res.data.c)
			for (let i = 0; i < orgRoles.length; i++) {
				let role = '';
				for (let j = 0; j < arr.length; j++) {
					if (orgRoles[i] == arr[j].roleId) {
						role = arr[j].name
					}
				}
				this.userPost = this.userPost + role + '  '
			}
		})
	}
	}
</script>

<style scoped lang="scss">
	.img-box {
		width: 100%;
		height: 12rem;
		padding-top: 1rem;
		background-image: url('../../../assets/image/banner.jpg');
	}

	.img-title {
		width: 100%;
		height: 3rem;
		margin-top: 1.5rem;
		line-height: 2rem;
		font-size: 1.4rem;
		color: #333;
		text-align: center;
	}

	.img-info {

		width: 6rem;
		height: 6rem;
		margin: .5rem auto;
		overflow: hidden;
		border-radius: 50%;
	}

	.img-info img {
		width: 6rem;
		height: 6rem;
		overflow: hidden;
	}

	.content {
		width: 90%;
		margin: 0 auto;
	}

	.icon-title {
		float: left;
		width: 7rem;
		height: 1.8rem;
		text-align: center;
		line-height: 1.8rem;
		background: #f66;
		border-top-right-radius: 25px;
		border-bottom-right-radius: 25px;
		color: #fff;
		font-size: 1.2rem;
		margin-left: 25%;
		margin-top: .2rem;
	}

	.name {
		/*float: left;*/
		/*margin-left:2rem;*/
		/*width: 10rem;*/
		/*height: 2rem;*/
		/*text-align: center;*/
		/*line-height: 2rem;*/
		/*color: #fff;*/
		text-align: center;
		color: #fff;
		line-height: 2rem;
	}

	.user-item {
		width: 100%;
		height: 3rem;
		margin-top: 1rem;
		border-bottom: 1px solid #ddd;
	}

	.item-title {
		float: left;
		width: 9rem;
		height: 3rem;
		line-height: 3rem;
		font-size: 1.4rem;
		color: #333;
	}

	.item-text {
		margin-left: 9rem;
		padding-left: 3rem;
		width: auto;
		height: 3rem;
		line-height: 3rem;
		font-size: 1.2rem;
		color: #666;
	}

	.update-btn {
		width: 90%;
		height: 3rem;
		margin: 0 auto;
		margin-top: 3rem;
		border-radius: 25px;
		background: rgb(125, 177, 253);
		text-align: center;
		line-height: 3rem;
		font-size: 1.4rem;
		color: #fff;
	}

	.login-btn {
		width: 90%;
		height: 3rem;
		margin: 0 auto;
		margin-top: 2rem;
		border-radius: 25px;
		background: #f66;
		text-align: center;
		line-height: 3rem;
		font-size: 1.4rem;
		color: #fff;
	}
</style>
