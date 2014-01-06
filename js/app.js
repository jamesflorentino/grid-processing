/* jshint browser: true */

/* global angular */

'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouteProvider) {
    $urlRouteProvider.otherwise('/servers');
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
        return path === $location.path() ? 'active' : '';
    };
    $http.get('data.json').success(function(result) {
        $scope.servers = result;
    });
});

app.controller('ServerItemCtrl', function($scope, $http, $stateParams) {
    $http.get('data.json').success(function(result) {
        var serverId = parseInt($stateParams.id, 10);
        var server = result.filter(function(item) {
            return item.id === serverId;
        });
        $scope.server = server[0];
    });
});
