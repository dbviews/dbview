angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', '$http', tableController])

function tableController($scope, tableService, $stateParams, dbService, $http) {
  $scope.name = $stateParams.tablename;

  // reference the data that will be rendered to a table format
  $scope.dataToRender = tableService.getData($stateParams.tablename);
  $scope.queryOptions = ['Text Query', 'Create Table', 'Insert Rows', 'Update Rows', 'Delete Rows', 'Drop Table'];
  $scope.dataTypes = ['Integer', 'Varchar', 'Serial', 'Date', 'Time'];
  $scope.columnName = '';
  $scope.value = '';
  $scope.rowsToAdd = {};
  $scope.saveEntry = () => {
    Object.assign($scope.rowsToAdd, { [$scope.columnName]: $scope.value });

    console.log($scope.columnName, $scope.value);
    console.log($scope.rowsToAdd);
  }

  $scope.submitQuery = () => {

  }
  $scope.reset = () => {
    $scope.rowsToAdd = {};
  }

  $scope.updateRow = () => {
    $http.post('/update', { where: $scope.query, creds: dbService.creds, valuesToInsert: $scope.rowsToAdd })
    .success( (data, status) => {
      tableService.addTableData($scope.name, data);
      //clean up the form
    })
    .error( (data, status) => {

    });
  };


}

