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
      url: '/:from',
      templateUrl: 'partials/home.html',
      controller: 'rankGenericController'
    })
    .state('search', {
      url: '/:from/:search',
      templateUrl: 'partials/home.html',
      controller: 'rankGenericController'
    });
});
