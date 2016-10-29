angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', '$http', '$state', tableController])

function tableController($scope, tableService, $stateParams, dbService, $http, $state) {
  //scope.name is the name of the table currently on display
  $scope.name = $stateParams.tablename;
  $scope.displayName = $stateParams.tablename;
  $scope.dataToDisplay = tableService.getData($scope.name);
  $scope.query = '';

  // reference the data that will be rendered to a table format
  $scope.gridData = {
    data: $scope.dataToDisplay,
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
        console.log('saving new data');
        // save the data in table service
        console.log(response.data[0]);
        tableService.addTableData($scope.name, response.data[0])
        $scope.dataToDisplay = tableService.getData($scope.name);
        console.log('new data to display', $scope.dataToDisplay);
        $scope.gridData = {
          data: $scope.dataToDisplay,
          enableFiltering: true,
        }
        $scope.displayName = 'Query Result';
        console.log('displaying this data: ', $scope.dataToDisplay);
      })
  };
}


