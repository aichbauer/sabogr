angular
  .module('pages.home')
  .controller('HomeCtrl', HomeController);

/**
 * @ngdoc controller
 * @name pages.home:HomeCtrl
 *
 * @requires $scope
 *
 * @description
 * HomeCtrl for the index page (logged in as a user)
 */
HomeController.$inject = [
  '$scope'
];

function HomeController($scope) {
}
