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
      url: '/',
      templateUrl: './partials/home.html',
      controller: 'HomeController'
    })
    .state('table', {
      url: '/table/:tablename',
      templateUrl: './partials/table.html',
      controller: 'TableController'
    })
    .state('db', {
      url: '/db',
      templateUrl: './partials/tableselect.html',
      controller: 'DbController'
    })
};