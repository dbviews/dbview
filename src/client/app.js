const app = angular
  .module('app', [
    'ngRoute',
    'Dbview.HomeController',
  ]);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: './partials/home.html',
      controller: 'HomeController'
    })
}
