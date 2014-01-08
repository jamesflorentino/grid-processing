/* jshint browser: true */

/* global angular */

'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/servers');
    $stateProvider
        .state('servers', {
            url: '/servers',
            templateUrl: 'partials/servers.html',
            controller: 'ServersCtrl'
        })
        .state('servers.item', {
            url: '/:id',
            templateUrl: 'partials/servers-item.html',
            controller: 'ServerItemCtrl'
        })
        .state('servers.item.edit', {
            url: '/edit',
            templateUrl: 'partials/servers-item-edit.html',
            controller: 'ServerItemEditCtrl'
        })
        .state('servers.item.logs', {
            url: '/logs',
            templateUrl: 'partials/servers-item-logs.html',
            controller: 'ServerItemLogsCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        });
});

app.service('authenticator', function() {
    var username = localStorage.username;
    return {
        getUser: function() {
            return username;
        },

        login: function(user, pass, cb) {
            username = user;
            localStorage.username = username;
            setTimeout(cb, 2000);
        }
    };
});

app.controller('ServersCtrl', function($scope, $http, $location) {
    $scope.getClass = function(path) {
        return $location.path().indexOf(path) > -1 ? 'active' : '';
    };
    $http.get('data.json').success(function(result) {
        $scope.servers = result;
    });
});

app.controller('ServerItemCtrl', function($scope, $http, $stateParams) {
    $scope.section = 'index';
    $scope.getClass = function(name) {
        return name === $scope.section ? 'active' : '';
    };
    $scope.chooseSection = function(section) {
        $scope.section = section;
    };
    $http.get('data.json').success(function(result) {
        var serverId = parseInt($stateParams.id, 10);
        var server = result.filter(function(item) {
            return item.id === serverId;
        });
        $scope.server = server[0];
    });
});

app.controller('ServerItemEditCtrl', function($scope, $stateParams, $http) {
    $http.get('data.json').success(function(result) {
        var serverId = parseInt($stateParams.id, 10);
        var server = result.filter(function(item) {
            return item.id === serverId;
        });
        $scope.server = server[0];
    });
});

app.controller('ServerItemLogsCtrl', function() {
});
