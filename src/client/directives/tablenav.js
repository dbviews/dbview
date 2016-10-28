angular.module('tablenav', [])
 .directive('tablenav', function() {
   return {
       restrict: 'E',
       templateUrl: './partials/navbar.html',
       controller: dbController,
   }
});