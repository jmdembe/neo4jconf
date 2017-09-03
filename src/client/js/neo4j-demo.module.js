(function () {
    'use strict';

    angular.module ('neo4j-demo')
        .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');

        $stateProvider.state({
            name: 'home',
            url:'/',
            templateUrl: 'views/home.template.html'
        });

    }
}());