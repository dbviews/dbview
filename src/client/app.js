const app = angular
  .module('app', [
    'ui.router',
    'Dbview.HomeController',
    'Dbview.TableController',
    'Dbview.DbController',
    'Dbview.tableService',
    'Dbview.dbService',
    'ui.grid',
    'tablenav',
    'angular-loading-bar',
  ]);

app.config(configFunction);

function configFunction($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      cache: false,
      url: '/',
      templateUrl: './partials/home.html',
      controller: 'HomeController'
    })
    .state('table', {
      cache: false,
      url: '/table',
      templateUrl: './partials/table.html',
      controller: 'TableController'
    })
    .state('db', {
      cache: false,
      url: '/db',
      templateUrl: './partials/tableselect.html',
      controller: 'DbController'
    })
};