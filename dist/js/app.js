(function () {
    'use strict';

    var app = angular.module ('neo4j-demo', ['ui.router']);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('','/');

        $stateProvider
            .state({
                name: 'home',
                url: '/', 
                templateUrl: 'src/client/views/home.template.html'
            })
            .state({
                name: 'products',
                url: '/products',
                templateUrl:'src/client/views/products.template.html'
            });

    });

}());