var app = angular.module('instance_ranks', [ 'ui.router', 'ui.bootstrap' ]);

app.controller('rankGenericController', function ($rootScope, $scope, $stateParams, $http) {
  $rootScope.from = $stateParams.from == null ? 0 : $stateParams.from;
  $rootScope.search = $stateParams.search == null ? '' : $stateParams.search;

  // search field
  $rootScope.search = $rootScope.search;

  /* Retrieve table content */
  $http.get( app.api + "local/azth/char/character_instances" + "?from=" + $rootScope.from + "&search=" + $rootScope.search)
   .then(function (response) {
     $scope.result = response.data;
  }, function (data, status, header, config) {
   console.log("[ERROR] $http.get request failed!");
 });

});
