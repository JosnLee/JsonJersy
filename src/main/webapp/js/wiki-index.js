var wiki = angular.module("wiki", ["ui.bootstrap", "ngCookies", "wiki.common"]);

wiki.controller("WikiMainController", ["$scope", "$timeout", "$http", "Path", "$q", "$location", "$cookies", function ($scope, $timeout, $http, Path, $q, $location, $cookies) {
    //内容正在加载时，提示消息
    $scope.overlay = {message: "正在加载... ..."};

    //登录、注册模态框设置
    $scope.wikiLoginModalOptions = $scope.wikiSignUpModalOptions = {
        dialogClass: 'modal wiki-dialog',
        backdropFade: true,
        dialogFade: true,
        keyboard: true,
        backdrop: true,
        backdropClick: true
    };

    //用户注册
    $scope.signUpInfo = {//用户注册时，需要填写的信息
        username: "",
        $$nameState: "",
        $$nameMessage: "",
        password: "",
        $$passwordState: "",
        $$passwordMessage: ""
    };
    $scope.wikiSignUpModalShow = false;//注册模态框开关

    //检查用户名是否有效、是否已被占用
    $scope.checkUsername = function () {
        if(!$scope.signUpInfo.username) {
            $scope.signUpInfo.$$nameState = 'error';
            $scope.signUpInfo.$$nameMessage = "用户名不能为空";
            return;
        }
        return $http.get(Path.getUri("api/users/validate/name/") + $scope.signUpInfo.username)
            .success(function (data, status, header, config) {
                $scope.signUpInfo.$$nameState = 'success';
            })
            .error(function (data, status, header, config) {
                $scope.signUpInfo.$$nameState = 'error';
                $scope.signUpInfo.$$nameMessage = data;
            });
    };
    var passwordReg = /.{8,}/;
    //检查密码是否有效
    $scope.checkPassword = function () {
        if(!$scope.signUpInfo.password) {
            $scope.signUpInfo.$$passwordState = 'error';
            $scope.signUpInfo.$$passwordMessage = "密码不能为空";
            return;
        }
        if(!passwordReg.test($scope.signUpInfo.password)) {
            $scope.signUpInfo.$$passwordState = 'error';
            $scope.signUpInfo.$$passwordMessage = "至少八个字符，不能有空格";
            return;
        }
        $scope.signUpInfo.$$passwordState = 'success';
        $scope.signUpInfo.$$passwordMessage = "密码有效";
    };
    //向后台发送创建新帐号请求
    var sendSignUpInfoToServer = function () {
        $http.post(Path.getUri("api/users"), $scope.signUpInfo)
            .success(function (data, status, header, config) {
                $scope.overlay.message = "注册成功，即将登录";
                $scope.loginInfo = {
                    username: $scope.signUpInfo.username,
                    password: $scope.signUpInfo.password
                };
                $scope.confirmLogin();
            })
            .error(function (data, status, header, config) {
                $scope.error = data;
            });
    };
    $scope.confirmSignUp = function () {//确认注册
        //校验注册时的录入信息是否有效
        if($scope.signUpInfo.$$nameState === "success" &&
            $scope.signUpInfo.$$passwordState === "success") {
            //校验成功，则向后台发送创建新帐号请求
            sendSignUpInfoToServer();
        }
    };
    $scope.alreadyHaveAnAccount = function () {//已经有账户？跳转到登录窗口。
        $scope.wikiSignUpModalShow = false;
        $timeout(function () {
            $scope.wikiLoginModalShow = true;
        }, 400);
    };

    //用户登录
    $scope.loginInfo = {//用户登录时，需要填写的信息
        username: "",
        password: ""
    };
    $scope.errorMessage = "";//登陆时，如果有错误，显示错误
    $scope.wikiLoginModalShow = false;//登录模态框开关
    //跳转到工作台页面
    var locationToDesktop = function () {
        window.location.href = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port + "/desktop.html";
    };
    $scope.confirmLogin = function () {//确认登录
        $http.post(Path.getUri("api/users/validate"), $scope.loginInfo)
            .success(function (data, status, header, config) {
                $cookies.appUserId = data.userId;
                $cookies.appUserName = data.username;
                //跳转到工作台页面
                locationToDesktop();
            })
            .error(function (data, status, header, config) {
                $scope.errorMessage = data;
            });
    };
    if($cookies.appUserName) {//如果已经登录过了
        locationToDesktop();//直接跳转到工作台
    }
    $scope.notHaveAnAccountYet = function () {//还没有账户？跳转到注册窗口。
        $scope.wikiLoginModalShow = false;
        $timeout(function () {
            $scope.wikiSignUpModalShow = true;
        }, 400);
    };

    //内容正在加载，消息提示关闭
    $scope.overlay = {message: ""};
}]);

