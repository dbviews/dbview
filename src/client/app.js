const app = angular
  .module('app', [
    'ngRoute',
    'Dbview.HomeController',
    'Dbview.TableController',
    'Dbview.tableService',
    'ui.grid'
  ]);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: './partials/home.html',
      controller: 'HomeController'
    })
    .when('/table', {
      templateUrl: './partials/table.html',
      controller: 'TableController'
    })
}
