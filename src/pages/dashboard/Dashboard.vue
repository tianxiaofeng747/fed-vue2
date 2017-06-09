<template>
    <Row class="container">
        <Col span="24" class="header">
        <Col span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
        </Col>
        <!--toggle切换-->
        <Col span="10">
        <div class="tools" @click.prevent="collapse">
            <i class="fa fa-align-justify"></i>
        </div>
        </Col>
        <Col span="4" class="userinfo">
        <span class="userinfo-inner" style="font-size: 14px">欢迎您 , {{sysUserName}}</span>
        <Icon type="android-exit" color="#fff" shape="circle" @click.native="logout" size="24" style="vertical-align: -5px; margin-left: 10px"></Icon>

        </Col>
        </Col>
        <Col span="24" class="main">
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
            <!--导航菜单-->
            <Menu accordion width="230px" v-show="!collapsed" theme="dark">
                <Submenu v-for="item in menuList" :name="item.name" :key="item.name">
                    <template slot="title">
                        <Icon :type="item.icon"></Icon>
                        {{item.name}}
                    </template>

                    <Menu-item v-for="son in item.son" :name="son.name" :key="son.name" class="sonlist">
                        <router-link :to="{name:son.state}">{{son.name}}</router-link>
                    </Menu-item>
                </Submenu>
            </Menu>

            <ul v-show="collapsed" ref="menuCollapsed">
                <li v-for="(item,index) in menuList" class="submenu">
                    <template v-if="item.son">
                        <div class="submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                            <Icon :type="item.icon"></Icon>
                        </div>
                        <ul class="submenu_item" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                            <li v-for="child in item.son" v-if="!child.hidden" :key="child.state" class="el-menu-item" style="padding-left: 40px;"
                                :class="$route.path==child.state?'is-active':''" @click="$router.push(child.state)">{{child.name}}
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                <li class="submenu">
                    <div class="submenu__title " style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.state?'is-active':''"
                         @click="$router.push(item.state)">
                        <Icon :type="item.icon"></Icon>
                    </div>
                </li>
</template></li></ul></aside>
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
</section></Col></Row></template>

<script>
    import MENU from '../../config/menu.js';
    import SweetAlert from '../../services/sweetalert';
    import {mapState, mapMutations, mapActions} from 'vuex';
    import CONFIG from '@/config/app.config';
    export default {
        data() {
            return {
                sysName: '云供应链',
                collapsed: true,
                sysUserName: '',
                sysUserAvatar: '',
                menuList: MENU,
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
            ...mapMutations(['REFRESH', 'CHANGEWIDTH']),
            ...mapActions({currentUser: 'currentUser',userLoginout: 'logout'}),
            onSubmit() {

            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },
            //退出登
            logout: function () {
                var self = this;
                SweetAlert.swal({
                    title: '确认退出吗',
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    width: '300px',
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    preConfirm: function () {
                        return self.userLoginout();
                    }
                }).then(result => {
                    if (result.code == 'SUCCESS') {
                        SweetAlert.success('操作成功');
                        self.$router.push('/auth');
                    } else {
                        SweetAlert.error('操作失败');
                    }
                });

            },
            //折叠导航
            collapse: function () {
                this.collapsed = !this.collapsed
                if (document.createEvent) {
                    var event = document.createEvent("HTMLEvents");
                    event.initEvent("resize", true, true);
                    window.dispatchEvent(event);
                } else if (document.createEventObject) {
                    window.fireEvent("onresize");
                }
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            }
        },
        created(){
            let self = this;
            this.currentUser().then((User)=> {
                if (User) {
                    this.sysUserName = User.enterpriseName;
                    this.sysUserAvatar = CONFIG.IMAGE_DOWNLOAD + User.enterpriseLogo;
                    this.collapse();
                } else {
                    this.$router.push('/auth');
                }
            });
        },

        //F5刷新重新赋值
        computed: mapState({
            useInfo: function (state) {
                if(!state.userInfo){
                    this.REFRESH();
                }
                return state.userInfo;
            }
        })
    }

</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: #20a0ff;
            color: #fff;
            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;
                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;
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
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #fff;
                }
            }
            .logo-width {
                width: 230px;
            }
            .logo-collapse-width {
                width: 60px
            }
            .tools {
                padding: 0px 23px;
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
            }
        }
        .main {
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside {
                flex: 0 0 230px;
                width: 230px;
                background: #464C58;
                .sonlist {
                    a {
                        display: block;
                        color: #fff;
                    }
                }
                .submenu {
                    height: 60px;
                    position: relative;
                    &:hover {
                        background: #e4e8f1;
                        cursor: pointer;
                        i {
                            color: #fff;
                        }
                    }
                    .submenu__title {
                        height: 60px;
                        line-height: 60px;
                        i {
                            font-size: 18px;
                            color: #9ea7b4;
                        }
                    }
                    .submenu_item {
                        position: absolute;
                        top: 0;
                        left: 60px;
                        background: #e4e8f1;
                        z-index: 999;
                        width: 134px;
                        li {
                            height: 50px;
                            line-height: 50px;
                            &:hover {
                                background: #dedbe5;
                            }
                        }
                    }
                }
            }
            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }
            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
            }

            .content-container {
                flex: 1;
                overflow-y: scroll;
                padding: 20px;
                .breadcrumb-container {
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