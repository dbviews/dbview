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
      data: { creds: dbService.creds, table }
    })
      .then((response) => {
        console.log(response.data);
        dbService.activateTable(table);
        dbService.addTableData(table, response.data);
      });
  }
};