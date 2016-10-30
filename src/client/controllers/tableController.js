angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', '$http', '$state', '$timeout', tableController])

function tableController($scope, tableService, $stateParams, dbService, $http, $state, $timeout) {
  //scope.name is the name of the table currently on display
  $scope.name = tableService.currentTable;
  $scope.displayName = tableService.currentTable;
  $scope.dataToDisplay = tableService.getData($scope.name);
  

  // reference the data that will be rendered to a table format
  $scope.gridData = {
    data: $scope.dataToDisplay,
    enableFiltering: true,
  }
  $scope.queryOptions = ['Text Query', 'Create Table', 'Insert Rows', 'Update Rows', 'Delete Rows', 'Drop Table'];
  $scope.dataTypes = ['Integer', 'Varchar', 'Serial', 'Date', 'Time'];
  $scope.rowsToAdd = {};
  $scope.saveEntry = (column, value) => {
    $scope.rowsToAdd[column] = value;
    $scope.columnName = '';
    $scope.entryValue = '';
  }
  $scope.removeEntry = (column) => delete $scope.rowsToAdd[column];
  // $scope.query = '';
  $scope.queryData = {};

  // execute a raw query and update displayed table
  $scope.executeQuery = function (query) {
    let route;
    let tableName = $scope.name;
    switch($scope.queryType) {
      case 'Create Table': route = '/createTable'; break;
      case 'Insert Rows': route = '/insert'; break;
      case 'Update Rows': route = '/update'; break;
      case 'Delete Rows': route = '/delete'; break;
      case 'Drop Table': route = '/dropTable'; break;
      case 'Text Query': route = '/query'; break;
      default: return;
    }
    console.log($scope.tableName);

    $http({
      method: 'POST',
      url: route,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { creds: dbService.creds, where: query, valuesToInsert: $scope.rowsToAdd, table: tableName }
    })
      .then((response) => {
        console.log(response.data);
        const columns = Object.keys(response.data[0]).map( (colname) => {
          console.log(colname);
          return { field: colname };
        });

        // save the data in table service and update grid data
        tableService.addTableData($scope.name, response.data)
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


