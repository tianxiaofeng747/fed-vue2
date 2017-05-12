<template>
    <div class="loginpage">
        <div class="loginbox">
            <h3 class="logo"></h3>
            <div class="loginForm">
                <form role="form" name="auth" >
                    <div class="username">
                        <div class="usernameinner">
                            <input type="text" name="username" id="username" placeholder="请输入用户名"  ng-model="$ctrl.form.username"/>
                        </div>
                    </div>
                    <div class="password">
                        <div class="passwordinner">
                            <input type="password" name="password" id="password"  maxlength="20" placeholder="请输入密码" ng-model="$ctrl.form.password" />
                        </div>
                    </div>
                    <div class="verify">
                        <div class="verifyimg">
                            <img id="imageCode" class="textbox" src="" ng-src="{{$ctrl.verifyImg}}" width="80" height="40" alt="验证码" title="点击刷新" />
                            <a ng-click="$ctrl.refreshCode()" href="javascript:void(0)">换一张？</a>
                        </div>
                        <div class="verifycode">

                            <div class="verifycodeinner">
                                <input type="text" name="verifycode" maxlength="4" id="verifycode" placeholder="验证码" ng-model="$ctrl.form.verifycode"/>
                            </div>

                        </div>
                    </div>
                    <label id="errorMsg" ng-bind="::$ctrl.errorMsg"></label>
                    <button type="submit"  ng-click="$ctrl.login()">登录</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                form: {
                    username: 'yucxing1',
                    password: '123456',
                    verifycode: '1243'
                }
            }
        },
        methods: {
            refreshCode: function () {
                let config = APP.DEV_CONFIG,
                        getRandomImg = function () {
                            self.verifyImg = config.SERVER + URL.VERIFY_CODE + '?t=' + Math.random() * 1000000;
                        };
                if (config.DEV_MODE == 1) { // 开发,需跨域
                    if (APP.User && APP.User.token) {
                        getRandomImg();
                    } else {
                        User.currentUser().finally(function () {
                            getRandomImg();
                        });
                    }
                } else if (config.DEV_MODE == 2) { // 测试,无需跨域
                    getRandomImg();
                }
            },
            login: function () {
                var xflag = false,
                        self = this,
                        clientid = APP.User ? APP.User.clientId : null,
                        _sendData = CryptoJS.enc.Utf8.parse(SHA256(self.form.password)),
                        _encrypted = CryptoJS.AES.encrypt(_sendData, CryptoJS.enc.Utf8.parse(clientid), {
                            iv: CryptoJS.enc.Utf8.parse(APP.User.token),
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Iso10126
                        }),
                        param;

                if (APP.DEV_CONFIG.DEV_MODE == 0) {
                    $state.go('dashboard.home');
                    return;
                }
                if (!clientid) {
                    SweetAlert.error('登陆请求无效,请刷新页面重试');
                    return;
                }
                if (!/^[a-zA-Z0-9_-]{6,20}$/.test(self.form.username)) {
                    xflag = true;
                    self.errorMsg = self.form.username == '' ? '请输入用户名' : '用户名格式不正确';
                    return;
                }

                if (!/^[a-zA-Z0-9_-]{6,20}$/.test(self.form.password)) {
                    xflag = true;
                    self.errorMsg = self.form.password == '' ? '请输入密码' : '密码长度6-20个字符';
                    return;
                }
                if (!/^[a-zA-Z0-9]{4}$/.test(self.form.verifycode)) {
                    xflag = true;
                    self.errorMsg = self.form.verifycode == '' ? '请输入验证码' : '验证码格式不正确';
                    return;
                }
                param = angular.extend({}, self.form, {
                    password: CryptoJS.enc.Base64.stringify(_encrypted.ciphertext)
                });
                if (!xflag) {
                    User.login(param).then(function () {
                        self.$route.push('dashboard.home');
                    },function (err) {
                        self.refreshCode();
                    });
                }
            }
        },
        mounted() {
            this.refreshCode();
        }
    }
</script>

<style lang="sass" scoped>
    /*  登录页样式  */
    .loginpage {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #4c88c7 url(img/ERP-bg.jpg) no-repeat;
        background-size: cover;

    }
    .loginbox {
        width: 400px;
        overflow: hidden;
        height: 420px;
        position: absolute;
        left: 50%;
        top:50%;
        margin-left: -200px;
        margin-top:-260px;
    .logo{
        height: 81px;
        margin-bottom: 40px;
        margin-top: 0;
        background-image: url(img/ERPlogo.png);
        background-position: center top;
        background-repeat: no-repeat;
    }
    .loginForm{
        border-top:solid 4px #7eb9f4;
        padding: 40px;
        background-color: #fff;
    }
    }
    .loginbox .username,.loginbox .password,.loginbox .verifycode {
        background: #fff url(img/login.png) no-repeat 0px -8px;
        margin-bottom: 10px;
        border: 1px solid #c1c1c1;
    }

    .loginbox .usernameinner,.loginbox .passwordinner,.loginbox .verifycodeinner
    {
        margin-left: 45px;
        border-left: 1px solid #ddd;
        background: #fff;
    }

    .loginbox .username input,.loginbox .password input
    {
        width: 270px;
        height: 36px;
        line-height: 36px;
        border: none;
        font-size: 14px;
        color: #666;
        text-indent: 12px;
    }

    .loginbox .password {
        background-position: 0 center;
    }

    .loginbox .verify{

    @vWidth:137px;
    .verifycode{
        margin-right: @vWidth;
        margin-bottom: 30px;
        background-position: 0 -105px;
    .verifycodeinner{
    input {
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-indent: 12px;
        border:none;
    }
    }
    }
    .verifyimg {
        width: @vWidth;
        float: right;
    a {
        float: right;
        line-height: 40px;
    }
    }

    }

    .loginbox button {
        width: 100%;
        height: 39px;
        line-height: 39px;
        background: #4f9ce8;
        text-align: center;
        font-size: 16px;
        font-weight: normal;
        color: #fff;
        border: 0;
        letter-spacing: 10px;
        padding: 0;
    &:hover {
         background-color: #4f9ce8 + 10%;
         cursor: pointer;
     }
    }

    .loginbox #errorMsg {
        position: absolute;
        left: 40px;
        bottom: 90px;
        color: #e23934;
        display: block;
    }
</style>