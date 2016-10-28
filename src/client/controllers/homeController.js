angular
  .module('Dbview.HomeController', ['ngRoute'])
  .controller('HomeController', ['$scope', '$http', HomeController])

function HomeController($scope, $http) {
  $scope.creds = {};
  $scope.dialects = ['postgres', 'mysql'],
  $scope.post = function () {
    $http({
      method: 'POST',
      url: '/requestDB',
       headers: {
        'Content-Type': 'application/json'
      },
      data: $scope.creds
    })
    .then((response) => {
      console.log(response);
    });
    console.log('sending request with', $scope.creds);
  }


}


