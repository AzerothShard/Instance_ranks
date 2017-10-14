var app = angular.module('instance_ranks', [ 'ui.router', 'ui.bootstrap', 'ngStorage', 'angular-loading-bar']);

app.run(function($state, $localStorage, $rootScope) {
  $rootScope.goTo = function(page, val) {
    if (page == "player") {
      $localStorage.char = val;
      $state.go("player_instance", { guid: val.guid });
    }
    else if (page == "fka") {
      $state.go("fka_achievement", { achievement: val });
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

  $scope.$watch('year', function(newVal, oldVal){
    if ($stateParams.achievement != null && $stateParams.achievement != "")
      $scope.load_first_kill();
  }, true);

  $scope.achievements = {
    "0" : { ID: "1402", class: "kel-thuzad",      img: "Kel'Thuzad.png",        description: "Conqueror of Naxxramas",  icon: "inv_trinket_naxxramas06.jpg" },
    "1" : { ID: "456",  class: "sartharion",      img: "Sartharion.png",        description: "Obsidian Slayer",         icon: "achievement_dungeon_coablackdragonflight_25man.jpg" },
    "2" : { ID: "1400", class: "malygos",         img: "Malygos.png",           description: "Magic Seeker",            icon: "inv_misc_head_dragon_blue.jpg" },
    "3" : { ID: "3117", class: "yogg-saron",      img: "Yogg-Saron.png",        description: "Death's Demise",          icon: "achievement_boss_yoggsaron_01.jpg" },
    "4" : { ID: "3259", class: "algalon",         img: "Algalon.png",           description: "Celestial Defender",      icon: "achievement_boss_algalon_01.jpg" },
    "5" : { ID: "4078", class: "anub-arak",       img: "Anub'arak.png",         description: "Grand Crusader",          icon: "achievement_reputation_argentcrusader.jpg" },
    "6" : { ID: "4576", class: "lich-king",       img: "The Lich King.png",     description: "Fall of the Lich King",   icon: "inv_helmet_96.jpg" }
  };

  $scope.load_first_kill = function() {
    $scope.text = "";

    $http.get(app.tc_api + "first_kill?year=" + $rootScope.year + "&achievement=" + $scope.achievements[$stateParams.achievement].ID)
     .then(function (response) {

       $scope.result = response.data

        if (response.data == "")
          $scope.text = "La competizione è aperta! Entra negli annali dei campioni!";

      }, function (data, status, header, config) {
       console.log("[ERROR] $http.get request failed!");
     });
  };

  $scope.cur_a = "";
  if ($stateParams.achievement != null && $stateParams.achievement != "") {
    $scope.cur_a = $stateParams.achievement;
    $scope.load_first_kill();
  }

});
