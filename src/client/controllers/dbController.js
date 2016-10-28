angular
  .module('Dbview.DbController', ['ngRoute'])
  .controller('DbController', ['$scope', '$http', '$location', 'dbService', 'tableService', dbController])

function dbController($scope, $http, $location, dbService, tableService) {
  $scope.tablenames = dbService.tables;
  $scope.onlineTables = ['hi'];
  $scope.requestTable = function (table) {
    console.log(table);
    $http({
      method: 'POST',
      url: '/requestTable',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { connection: dbService.connection, table }
    })
      .then((response) => {
        console.log(response.data);
        // dbService.setTables({ tables: ['Table 1', 'Table 2', 'Table 3'] });
        $location.path('/db');
      });
  }
};