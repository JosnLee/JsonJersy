angular.module("wiki.common.services", [])
    .service("Path", function () {
        var reg = /^\//;
        return {
            getUri: function (url) {
                if (reg.test(url)) {
                    return url;
                } else {
                    var pathName = window.document.location.pathname;
                    return pathName.substring(0, pathName.substr(1).indexOf('/') + 1) + "/" + url;
                }
            },
            getOrigin: function () {
                return window.document.location.origin;
            }
        };
    });

angular.module("wiki.common.directive", [])
    /**
     * 监听表达式的值，如果表达式的值为true，则将焦点放到该DOM元素上。
     */
    .directive("conditionFocus", [function () {
        return function ($scope, $element, $attrs) {
            var dereg = $scope.$watch($attrs.conditionFocus, function (newValue, oldValue) {
                if(newValue) {
                    $element.focus();
                }
            });
            $element.bind("$destroy", function () {//如果DOM元素被销毁了，则$watch的监听也停止
                dereg();
            });
        };
    }])
/**
 * 在其他指令执行完毕之后，触发prettyPrint。
 */
    .directive("prettyprintTrigger", function () {
        return {
            compile: function () {
                window.prettyPrint();
            }
        };
    })
/**
 * 封装jQuery UI的draggable功能（拖拽）。
 */
    .directive("hrDraggable", function () {
        return function ($scope, $element, $attrs) {
            $element.draggable({handle: ".modal-header"})
        };
    });

angular.module("wiki.common", ["wiki.common.services", "wiki.common.directive"]);
