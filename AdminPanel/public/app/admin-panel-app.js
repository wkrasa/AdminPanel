'use strict'
var app = angular.module('adminPanelApp', ['ngAnimate', 'ngRoute', 'usersModule', 'authModule']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home/index'
        })
        .when('/login', {
            templateUrl: 'views/auth/login',
            controller: 'loginCtrl'
        })
        .when('/users', {
            templateUrl: 'views/users/users-list',
            controller: 'usersListCtrl'
        });
});