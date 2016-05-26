angular
    .module('cmps.navbar')
    .directive('navbar', navbarDirective);

/**
 * @ngdoc directive
 * @name cmps.page:navbar
 *
 * @description
 * Generates a single navbar component
 */
function navbarDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'NavbarCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'src/cmps/navbar/navbar.html',
            replace: false,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
            }
        };
};
