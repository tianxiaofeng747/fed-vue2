<template>
	<Row class="container">
		<Col  span="24" class="header">
			<Col span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</Col>
			<Col span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</Col>
			<Col  span="4" class="userinfo">
				<Dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" />欢迎您 ,  {{sysUserName}}</span>
					<Dropdown-menu slot="dropdown">
						<Dropdown-item>我的消息</Dropdown-item>
						<Dropdown-item>设置</Dropdown-item>
						<Dropdown-item divided @click.native="logout">退出登录</Dropdown-item>
					</Dropdown-menu>
				</Dropdown>
			</Col>
		</Col>
		<Col span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				 <Menu  accordion width="230px">
					<Submenu v-for="item in menuList"  :name="item.name" :key="item.name" >
						<template slot="title">
							<Icon type="ios-paper"></Icon>
							{{item.name}}
						</template>
						<Menu-item v-for="son in item.son" :name="son.name" :key="son.name">
                            <a @click="goUrl(son)">{{son.name}}</a>

                        </Menu-item>
					</Submenu>
				</Menu>
			</aside>
			
			<section class="content-container">
			<div class="grid-content bg-purple-light">
				<Col span="24" class="breadcrumb-container">
					<strong class="title">{{$route.name}}</strong>
					<Breadcrumb separator="/" class="breadcrumb-inner">
						<Breadcrumb-item v-for="item in $route.matched" :key="item.path">
							{{ item.name }}
						</Breadcrumb-item>
					</Breadcrumb>
				</Col>
				<Col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</Col>
			</div>
		</section>
		</Col>
		
	</Row>
</template>

<script>
	import MENU from '../../config/menu.js';
	import logo  from '../../assets/images/3.png';
    import SweetAlert from '../../services/sweetalert';
	export default {
		data() {
			return {
				sysName:'云审计系统',
				collapsed:false,
				sysUserName: '迪安',
				sysUserAvatar: logo,
				menuList:MENU,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
            goUrl: function (item) {
                this.$router.push({name:item.state});
            },
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');

			if (user) {

				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		}
	}

</script>

<style scoped lang="scss">
    .ivu-menu{
        a { display: block;}
    }
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #20a0ff;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>