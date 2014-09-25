var wikiDesktop = angular.module("wikiDesktop", ["ui", "ui.bootstrap", "ngCookies", "ngGrid", "ui.router", "wiki.common"]);

wikiDesktop.run(["$rootScope", "$state", "$stateParams", "$location", function ($rootScope, $state, $stateParams, $location) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);
//工作台主界面
wikiDesktop.controller("WikiDesktopController", ["$scope", "$cookies", "$cookieStore", "$location", function ($scope, $cookies, $cookieStore, $location) {
    $scope.overlay = {message: "正在加载... ..."};
    $scope.loginUser = {//登录的用户信息
        id: $cookies.appUserId,
        username: $cookies.appUserName
    };
    //跳转到主页面
    var locationToIndex = function () {
        window.location.href = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port;
    };
    //退出登录
    $scope.signOut = function () {
        //清除Cookie中的信息
        $cookieStore.remove("appUserName");
        locationToIndex();
    };

    $scope.messageBoardModal = false;
    $scope.messageBoardModalOptions = {
        dialogClass: 'modal wiki-dialog',
        backdropFade: true,
        dialogFade: true,
        keyboard: true,
        backdrop: true,
        backdropClick: true
    };
    //消息大厅——发送消息
    $scope.sendMessage = function () {

//        $scope.messageBoardModal = false;
    };

//    if(!$cookies.appUserName) {//如果没有登录
//        locationToIndex();//跳转到主页面
//    }
    $scope.overlay = {message: ""};
}]);

//开发工具
wikiDesktop.controller("ToolsController", ["$scope", function ($scope) {

}]);

//技术学习
wikiDesktop.controller("TechnologyController", ["$scope", function ($scope) {

}]);

//编码规范
wikiDesktop.controller("RulesController", ["$scope", function ($scope) {

}]);

//常用控件
wikiDesktop.controller("WidgetsController", ["$scope", function ($scope) {
    //激活各个tab页——由于例子中需要定义ngGrid，所以只好使用bootstrap原生的tab标签（ui-bootstrap无法跟ngGrid兼容）
    $("#widgets a").click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    //格式化代码
    window.prettyPrint();

    //定义ui.bootstrap.modal模态框开关
    $scope.angularJSDemonstrationModal = false;

    //打开ui.bootstrap.modal模态框
    $scope.openAngularJSDemonstrationModal = function () {
        //设置为true，则模态框就打开了
        $scope.angularJSDemonstrationModal = true;
    };

    //关闭ui.bootstrap.modal模态框时，回调函数
    $scope.angularJSDemonstrationModalCallback = function () {
        //设置为false，则模态框就关闭了
        $scope.angularJSDemonstrationModal = false;
    };

    //ui.bootstrap.modal模态框的配置
    $scope.angularJSDemonstrationModalOptions = {
        backdrop: true,
        dialogClass: 'modal your-class',//你可以自定义的自己的类（your-class），用来对模态框进行个性化样式设置，从而不影响其他人的模态框
        backdropFade: true,
        dialogFade: true,
        keyboard: false, //使用ESC键关闭
        backdropClick: false//点击其他地方关闭，只跟backdrop=true有冲突
    };

}]);

//常用API
wikiDesktop.controller("APIController", ["$scope", function ($scope) {

}]);

//常用界面
wikiDesktop.controller("UIController", ["$scope", function ($scope) {

}]);

//常见问题QA
wikiDesktop.controller("QAController", ["$scope", function ($scope) {
    //激活各个tab页——由于例子中需要定义ngGrid，所以只好使用bootstrap原生的tab标签（ui-bootstrap无法跟ngGrid兼容）
    $("#qas a").click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    //格式化代码
    window.prettyPrint();
}]);

//数据结构
wikiDesktop.controller("DataStructureController", ["$scope", function ($scope) {
    //数据结构树
    $scope.allDataStructureNodes = [
        {nodeId:1, nodeName:"1.公共字典[DICT]", parentId: null, tableId: null},
        {nodeId:2, nodeName:"1.1 码表", parentId: 1, tableId: null},
        {nodeId:3, nodeName:"1.1.1 基础编码类型字典 BASE_CODE_TYPE_DICT", parentId: 2, tableId: null},
        {nodeId:4, nodeName:"1.1.2 基础编码字典 BASE_CODE_DICT", parentId: 2, tableId: null},
        {nodeId:5, nodeName:"2.组织机构[ORG]", parentId: null, tableId: null},
        {nodeId:6, nodeName:"2.1 科室组织", parentId: 5, tableId: null},
        {nodeId:7, nodeName:"2.1.1 科室字典 DEPT_DICT", parentId: 6, tableId: null},
        {nodeId:8, nodeName:"2.1.2 科室关系主表 DEPT_REL_MASTER", parentId: 6, tableId: null},
        {nodeId:8, nodeName:"2.1.3 科室关系子表 DEPT_REL_DETAIL", parentId: 6, tableId: null}
    ];
    $scope.currentTreeNode = null;
    //数据结构树 zTree设置
    var setting = {
        view: {
            dblClickExpand: function (treeId, treeNode) {
                return treeNode.level >= 0;
            }, showLine: false,
            showIcon: function (treeId, treeNode) {
                return treeNode.level === 2;
            }
        },
        data: {
            key: {
                name: "nodeName"
            },
            simpleData: {
                enable: true,
                idKey: "nodeId",
                pIdKey: "parentId"
            }
        },
        callback: {
            onClick: function (event, treeId, treeNode) {// 点击叶节点查询数据
                $scope.currentTreeNode = null;
                if (treeNode.parentId !== "" && treeNode.parentId !== null) {//点击的节点
                    $scope.currentTreeNode = treeNode;

                }
            }
        }
    };
    $.fn.zTree.init($("#dataStructureTree"), setting, $scope.allDataStructureNodes);

    //当前的表定义
    $scope.currentTable = {
        tableId: 1,
        tableName: "BASE_CODE_DICT",
        chineseName: "基础编码字典",
        description: "系统码表。",
        columns: [
            {
                columnSeq: 1,
                columnChineseName: "编码类型 ID",
                columnName: "CODETYPE_ID",
                columnDataType: "C",
                columnLength: 20,
                notEnableNull: true,
                description: "PK FK 来自BASE_CODE_TYPE_DICT. CODETYPE_ID",
                defaultValue: null
            },
            {
                columnSeq: 2,
                columnChineseName: "编码",
                columnName: "CODE_ID",
                columnDataType: "C",
                columnLength: 20,
                notEnableNull: true,
                description: "PK",
                defaultValue: null
            }

        ]
    };
    $scope.tableGridOptions = {
        data: "currentTable.columns",
        columnDefs: [
            {field: "columnSeq", displayName: "序号"},
            {field: "columnChineseName", displayName: "字段中文名称"},
            {field: "columnName", displayName: "字段名"},
            {field: "columnDataType", displayName: "类型"},
            {field: "columnLength", displayName: "长度"},
            {field: "notEnableNull", displayName: "为空"},
            {field: "description", displayName: "说明"},
            {field: "defaultValue", displayName: "默认"}
        ]
    };
}]);

//业务学习
wikiDesktop.controller("JargonController", ["$scope", function ($scope) {

}]);

//设置
wikiDesktop.controller("SettingsController", ["$scope", "$http", "Path", function ($scope, $http, Path) {

}]);

//关于本站
wikiDesktop.controller("AboutController", ["$scope", function ($scope) {
    //格式化代码
    window.prettyPrint();

}]);

//设置各个菜单状态对应的Controller
wikiDesktop.config(["$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');
        // Use $stateProvider to configure your states.
        $stateProvider
            .state("tools", {//开发工具
                url: "/",
                templateUrl: 'partials/tools.html',
                controller: "ToolsController"
            })
            .state("technology", {//技术学习
                url: "/",
                templateUrl: 'partials/technology.html',
                controller: "TechnologyController"
            })
            .state("rules", {//编码规范
                url: "/",
                templateUrl: 'partials/rules.html',
                controller: "RulesController"
            })
            .state("widgets", {//常用控件
                url: "/",
                templateUrl: 'partials/widgets.html',
                controller: "WidgetsController"
            })
            .state("api", {//常用API
                url: "/",
                templateUrl: 'partials/api.html',
                controller: "APIController"
            })
            .state("ui", {//常用界面
                url: "/",
                templateUrl: 'partials/ui.html',
                controller: "UIController"
            })
            .state("qa", {//常见问题QA
                url: "/",
                templateUrl: 'partials/qa.html',
                controller: "QAController"
            })
            .state("data-structure", {//数据结构
                url: "/",
                templateUrl: 'partials/data-structure.html',
                controller: "DataStructureController"
            })
            .state("jargon", {//业务学习
                url: "/",
                templateUrl: 'partials/jargon.html',
                controller: "JargonController"
            })
            .state("settings", {//设置
                url: "/",
                templateUrl: 'partials/settings.html',
                controller: "SettingsController"
            })
            .state("about", {//关于本站
                url: "/",
                templateUrl: 'partials/about.html',
                controller: "AboutController"
            });


    }]);

