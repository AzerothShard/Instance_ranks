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
    })
    .state('instances_from', {
      url: '/i/:from/',
      templateUrl: 'partials/instances.html',
      controller: 'instancesController'
    })
    .state('instance_player', {
      url: '/ip/:criteria',
      templateUrl: 'partials/instance_player.html',
      controller: 'instancePlayerController'
    })
    .state('first_kill_annuali', {
      url: '/fka/',
      templateUrl: 'partials/first_kill_annuali.html',
      controller: 'firstKillController'
    })
    .state('first_kill_annuali.achievement', {
      url: '/fka/:achievement',
      templateUrl: 'partials/fka_achievement.html',
      controller: 'firstKillController'
    });
});
