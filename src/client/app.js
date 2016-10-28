const app = angular
  .module('app', [
    'ngRoute',
    'Dbview.HomeController',
    'Dbview.TableController',
    'Dbview.DbController',
    'Dbview.tableService',
    'Dbview.dbService',
    'ui.grid',
    'tablenav',
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
    .when('/db', {
      templateUrl: './partials/tableselect.html',
      controller: 'DbController'
    })
}
