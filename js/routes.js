var app = angular.module('instance_ranks');

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('/', {
      url: '/home',
      templateUrl: 'partials/home.html',
      controller: 'rankGenericController'
    })
    .state('paging', {
      url: '/g/:from',
      templateUrl: 'partials/home.html',
      controller: 'rankGenericController'
    })
    .state('search', {
      url: '/g/:from/:search',
      templateUrl: 'partials/home.html',
      controller: 'rankGenericController'
    })
    .state('player_instance', {
      url: '/gp/:guid',
      templateUrl: 'partials/player_instance.html',
      controller: 'playerInstanceController'
    })
    .state('instances', {
      url: '/i/',
      templateUrl: 'partials/instances.html',
      controller: 'instancesController'
    });
});
