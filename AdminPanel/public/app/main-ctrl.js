'use strict'
var app = angular.module('adminPanelApp');

app.controller("mainCtrl", ['$scope', function ($scope) {
    $scope.hello = 'Hello angular!!!!!!';
    $scope.setUser = function (userName) {
        $scope.user = { name: userName};
    }
}]);