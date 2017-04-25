var app = angular.module('instance_ranks', [ 'ui.router', 'ui.bootstrap' ]);

app.controller('rankGenericController', function ($rootScope, $scope, $stateParams, $http, $state) {

  $rootScope.multiple_params = true;

  $rootScope.from = $stateParams.from == null ? 0 : $stateParams.from;
  $rootScope.search = $stateParams.search == null ? '' : $stateParams.search;

  $rootScope.search = $rootScope.search;

  $http.get( app.api + "local/azth/char/character_instances" + "?from=" + $rootScope.from + "&search=" + $rootScope.search)
   .then(function (response) {
     $scope.result = response.data;
  }, function (data, status, header, config) {
   console.log("[ERROR] $http.get request failed!");
 });

 $scope.goTo = function(guid) {
   $state.go("player_instance", { guid: guid });
 };

});

app.controller('playerInstanceController', function ($rootScope, $scope, $stateParams, $http) {

  $rootScope.multiple_params = false;

  $http.get( app.api + "local/azth/char/player_instance?guid=" + $stateParams.guid)
   .then(function (response) {
     $scope.result = response.data;
  }, function (data, status, header, config) {
   console.log("[ERROR] $http.get request failed!");
 });
});

app.controller('instancesController', function ($rootScope, $scope, $stateParams, $http) {
  $rootScope.multiple_params = false;

  $rootScope.from = $stateParams.from == null ? 0 : $stateParams.from;
  $rootScope.search = $stateParams.search == null ? '' : $stateParams.search;

  $rootScope.search = $rootScope.search;

  $http.get( app.api + "local/azth/char/instance_ranks" + "?from=" + $rootScope.from + "&search=" + $rootScope.search)
   .then(function (response) {
     $scope.result = response.data;
  }, function (data, status, header, config) {
   console.log("[ERROR] $http.get request failed!");
 });
});
