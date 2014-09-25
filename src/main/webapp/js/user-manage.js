var userManageApp = angular.module("userManageApp", ["ui.bootstrap", "wiki.common"]);
userManageApp.controller("UserManageController", ["$scope", "$http", "Path", function ($scope, $http, Path) {
    $scope.users = [];

    $http.get(Path.getUri("api/users"))
        .success(function (data, status, header,config) {
            $scope.users = data;
        })
        .error(function (data, status, header, config) {
            console.info(data);
        });

    $scope.deleteThisUser = function (index, user) {
        $http.delete(Path.getUri("api/users/") + user.userId)
            .success(function (data, status, header, config) {
                $scope.users.splice(index, 1);
            })
            .error(function (data, status, header, config) {
                console.info(data);
            })
    };

    $scope.selectedUser = null;
    $scope.selectThisUser = function (user) {
        $scope.selectedUser = user;
    }

    /**添加用户*/
    //模态框开关
    $scope.addNewUserModalFlag = false;
    $scope.newUser = {};
    $scope.openAddNewUserModal = function () {
        $scope.addNewUserModalFlag = true;
    };
    $scope.userModalOptions = {
        backdrop: true,
        dialogClass: 'modal',//你可以自定义的自己的类（your-class），用来对模态框进行个性化样式设置，从而不影响其他人的模态框
        backdropFade: true,
        dialogFade: true,
        keyboard: false, //使用ESC键关闭
        backdropClick: false//点击其他地方关闭，只跟backdrop=true有冲突
    };
    $scope.saveNewUser = function () {
        if(!$scope.newUser || !$scope.newUser.username || !$scope.newUser.password) {
            alert("添加的新用户，用户名、密码不能为空");
        } else {
            $http.post(Path.getUri("api/users"), $scope.newUser)
                .success(function (data, status, header, config) {
                    $scope.users.push(data);
                    $scope.addNewUserModalFlag = false;
                    $scope.newUser = {};
                })
                .error(function (data, status, header, config) {
                    console.info(data);
                })

        }
    };

    /**修改用户密码*/
    $scope.modifyUserPasswordModalFlag = false;//模态框开关
    $scope.openModifyUserPasswordModal = function () {
        if($scope.selectedUser) {
            $scope.modifyUserPasswordModalFlag = true;
        } else {
            alert("请先选中需要修改密码的用户");
        }
    };

    $scope.saveUserPassword = function () {
        $http.put(Path.getUri("api/users/") + $scope.selectedUser.userId, $scope.selectedUser)
            .success(function (data, status, header, config) {
                var index = $scope.users.indexOf($scope.selectedUser);
                $scope.users[index] = data;
                $scope.selectedUser = data;
                $scope.modifyUserPasswordModalFlag = false;
            })
            .error(function (data, status, header, config) {
                console.info(data);
            })
    };
}]);