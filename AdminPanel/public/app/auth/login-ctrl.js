'use strict'
var module = angular.module('authModule');

module.controller("loginCtrl", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.submit = function (login, password, remember) {
        $scope.message = null;
        $http.post('/auth/login', { login: login, password: password, remember: remember})
            .then(function () {
                $location.url('/');
                $scope.setUser(email);
            }, function () {
                $scope.message = 'error occured';
            });
    }
}]);