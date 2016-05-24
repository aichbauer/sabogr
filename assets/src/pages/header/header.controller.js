angular
  .module('pages.header')
  .controller('HeaderCtrl', HeaderController);

/**
 * @ngdoc controller
 * @name pages.header:HeaderCtrl
 *
 * @requires $scope
 *
 * @description
 * HeaderCtrl for the header
 */
HeaderController.$inject = [
  '$scope'
];

function HeaderController($scope) {
}
