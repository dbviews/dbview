angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', '$http', '$state', '$timeout', tableController])

function tableController($scope, tableService, $stateParams, dbService, $http, $state, $timeout) {
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

  // execute a raw query and update displayed table
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
        const columns = Object.keys(response.data[0][0]).map((colname) => {
          console.log(colname)
          return { field: colname }
        })

        // save the data in table service and update grid data
        tableService.addTableData($scope.name, response.data[0])
        $scope.dataToDisplay  = tableService.getData($scope.name);
        $scope.gridData = {
          columnDefs: columns,
          data: $scope.dataToDisplay,
          enableFiltering: true,
        }
        $scope.displayName = 'Query Result';
      })
  };
}


