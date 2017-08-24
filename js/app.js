var app = angular.module('instance_ranks', [ 'ui.router', 'ui.bootstrap', 'ngStorage', 'angular-loading-bar']);

app.run(function($state, $localStorage, $rootScope) {
  $rootScope.goTo = function(playerInstance, val) {
    if (playerInstance == "player") {
      $localStorage.char = val;
      $state.go("player_instance", { guid: val.guid });
    }
    else {
      $localStorage.instance = val;
      $state.go("instance_player", { criteria: val.criteria });
    }
  };

  $rootScope.$state = $state;

  // First Kill Annuali year handling
  var current_year = (new Date()).getFullYear();
  $rootScope.year = $localStorage.year == null || $localStorage.year == '' ? current_year : $localStorage.year;

  $rootScope.update_year = function (amount) {
    $rootScope.year += amount;

    if ($rootScope.year > current_year)
      $rootScope.year = current_year;

    $localStorage.year = $rootScope.year;
  };

});

app.controller('rankGenericController', function ($rootScope, $scope, $stateParams, $http, $state, $localStorage) {

  $rootScope.from = $stateParams.from == null ? 0 : $stateParams.from;
  $rootScope.search = $stateParams.search == null ? '' : $stateParams.search;

  $rootScope.search = $rootScope.search;

  $http.get( app.api + "azth/char/character_instances" + "?from=" + $rootScope.from + "&search=" + $rootScope.search)
   .then(function (response) {
     $scope.result = response.data;
  }, function (data, status, header, config) {
   console.log("[ERROR] $http.get request failed!");
 });

});

app.controller('playerInstanceController', function ($rootScope, $scope, $stateParams, $http, $localStorage) {

  $scope.char = $localStorage.char != null ? $localStorage.char : null;

  $http.get( app.api + "azth/char/player_instance?guid=" + $stateParams.guid)
   .then(function (response) {
     $scope.result = response.data;
  }, function (data, status, header, config) {
   console.log("[ERROR] $http.get request failed!");
 });

});

app.controller('instancesController', function ($rootScope, $scope, $stateParams, $http, $state, $localStorage) {

  $rootScope.from = $stateParams.from == null ? 0 : parseInt($stateParams.from);
  $rootScope.search = $stateParams.search == null ? '' : $stateParams.search;

  $rootScope.search = $rootScope.search;

  $http.get( app.api + "azth/char/instance_ranks" + "?from=" + $rootScope.from + "&search=" + $rootScope.search)
   .then(function (response) {
     $scope.result = response.data;
  }, function (data, status, header, config) {
   console.log("[ERROR] $http.get request failed!");
 });

});

app.controller('instancePlayerController', function ($rootScope, $scope, $stateParams, $http, $localStorage) {

  $scope.instance = $localStorage.instance != null ? $localStorage.instance : null;

  $scope.from = 0;

  $scope.update = function(from) {
    $scope.from = from;

    $http.get( app.api + "azth/char/instance_player?criteria=" + $stateParams.criteria + "&from=" + $scope.from)
     .then(function (response) {
       $scope.result = response.data;
    }, function (data, status, header, config) {
     console.log("[ERROR] $http.get request failed!");
   });
 };

 $scope.update($scope.from);

});


app.controller('firstKillController', function ($rootScope, $scope, $stateParams, $http, $localStorage) {

});
