angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', tableController])

function tableController($scope, tableService, $stateParams, dbService) {
  $scope.name = $stateParams.tablename;

  // reference the data that will be rendered to a table format
  $scope.gridData = {
    data: tableService.getData($stateParams.tablename),
    enableFiltering: true,
  }


    // $scope.query = function () {
    //   $http({
    //     method: 'POST',
    //     url: '/requestTable',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: { creds: dbService.creds, table }
    //   })
    //     .then((response) => {

    //       // add this table to the nav bar
    //       activateTable($scope, table, tableService);

    //       // save the data in table service
    //       tableService.addTableData(table, response.data);
    //     });
    // }

  }

