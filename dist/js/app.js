(function () {
    'use strict';

    var app = angular.module ('neo4j-demo', ['ui.router']);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('','/');

        $stateProvider
            .state({
                name: 'home',
                url: '/', 
                templateUrl: 'views/home.template.html'
            })
            .state({
                name: 'products',
                url: '/products',
                templateUrl:'views/products.template.html'
            }) 
            .state({
                name: 'intro',
                url: '/intro',
                templateUrl: 'views/intro.template.html'
            });

    });

}());