angular
  .module('Dbview.TableController', ['ngRoute'])
  .controller('TableController', ['$scope', 'tableService', tableController])

  function tableController($scope, tableService) {
    $scope.dataToRender = tableService.rawdata; 
  }