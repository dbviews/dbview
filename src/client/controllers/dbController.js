angular
  .module('Dbview.DbController', ['ui.router'])
  .controller('DbController', ['$scope', '$http', '$location', 'dbService', 'tableService', '$state', '$timeout', dbController])

function dbController($scope, $http, $location, dbService, tableService, $state, $timeout) {
  $scope.tablenames = dbService.tables;
  $scope.tableData = {};
  $scope.onlineTables = tableService.activeTables

  // make post request to download a specific table
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

        // add this table to the nav bar
        activateTable($scope, table, tableService);

         // save the data in table service
        tableService.addTableData(table, response.data);
      });
  }

  // view a specific table (actual tablename is passed via $stateParams)
  $scope.viewTable = function (table) {
    $timeout(() => $state.go('table', { tablename: table }), 0)
  }
}

// add table to nav bar if not already there
function activateTable($scope, table, tableService) {
  if (!$scope.onlineTables.includes(table)) {
    tableService.activateTable(table);
    $scope.onlineTables = tableService.activeTables
  }
}

// add table data to table service
function addTableData($scope, table, data) {
  console.log(data);
  if ($scope.tableData[table] === undefined) {
    $scope.tableData[table] = data;
  }
}

