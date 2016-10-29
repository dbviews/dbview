angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', '$http', tableController])

function tableController($scope, tableService, $stateParams, dbService, $http) {
  //scope.name is the name of the table currently on display
  $scope.name = $stateParams.tablename;
  $scope.dataToDisplay = tableService.getData($scope.name);
  $scope.query = '';

  // reference the data that will be rendered to a table format
  $scope.gridData = {
    data: tableService.getData($scope.name),
    enableFiltering: true,
  }

  $scope.refreshTable = function (tableData) {
    tableService.addTableData($scope.name, tableData)
    $scope.dataToDisplay = tableService.getData($scope.name);
  }

  $scope.executeQuery = function () {
    $http({
      method: 'POST',
      url: '/query',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { creds: dbService.creds, command: $scope.query }
    })
      .then((response) => {

        // add this table to the nav bar
        activateTable($scope, table, tableService);

        // save the data in table service
        tableService.addTableData(table, response.data);
      });
  }

}

