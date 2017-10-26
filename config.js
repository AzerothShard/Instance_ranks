(function () {
  var app = angular.module('instance_ranks');

  /* Edit with path of APAW */
  app.api = location.protocol+"//azerothshard.org/modules/apaw/web/drsl_azs/";

  /* Edith with path of TC-JSON-API */
  app.tc_api = location.protocol+"//azerothshard.org/modules/TC-JSON-API/public/index.php/";

  // take "connections" from app/config/parameters.yml (ex. "local")

})();
