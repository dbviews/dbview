angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', tableController])

function tableController($scope, tableService, $stateParams, dbService) {
  $scope.name = $stateParams.tablename;

  // reference the data that will be rendered to a table format
  $scope.dataToRender = tableService.getData($stateParams.tablename);
}

