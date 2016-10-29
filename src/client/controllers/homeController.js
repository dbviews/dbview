angular
  .module('Dbview.HomeController', ['ui.router'])
  .controller('HomeController', ['$scope', '$http', '$location', 'dbService', HomeController])

function HomeController($scope, $http, $location, dbService) {
  $scope.creds = {
    host: 'ec2-54-243-212-72.compute-1.amazonaws.com',
    database: 'd7ctrh5hg6aadj',
    user: 'dxrwecviorvrto',
    password: 'BDyJHAElIeyxjSLNxI1NBYu3Z4',
    port: '5432'
  };
  $scope.query = '';
  $scope.dialects = ['postgres', 'mysql'],

    // send post request to get list of all available tables, then navigate to db page
    $scope.post = function () {
      dbService.setCreds($scope.creds);
      $http({
        method: 'POST',
        url: '/requestDB',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {creds: $scope.creds, query: $scope.query},
      })
        .then((response) => {
          dbService.setTables(response.data); // save table names to dbService
          $location.path('/db');
        });
    }
}


