/**
 * @ngdoc service
 * @name service.auth
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $state
 * @requires $window
 * @requires $cookies
 * @requires COOKIE
 * @requires $httpParamSerializer
 * @requires service.user
 * @requires $location
 * @requires $timeout
 */
angular
  .module('service.auth')
  .service('auth', auth);

auth.$inject = [
  '$rootScope',
  'Restangular',
  '$state',
  '$window',
  '$cookies',
  'COOKIE',
  '$httpParamSerializer',
  'user',
  '$location',
  '$timeout'
];

function auth($rootScope, Restangular, $state, $window, $cookies, COOKIE, $httpParamSerializer, user, $location, $timeout) {
  var _authenticated = false;
  var token = Restangular.service('auth/token');
  var self = this;

  self.authorize = function() {

    if (!self.check()) {
      // user is not authenticated. stow the state they wanted before you
      // send them to the signin state, so you can return them when you're done
      $rootScope.returnToState = $rootScope.toState;
      $rootScope.returnToStateParams = $rootScope.toStateParams;

      $location.path('/landing');
      return;
    } else {
      if ($rootScope.toState.name === 'landing') {
        $location.path('/');
        return;
      }
    }

    return user.setCurrent().then(function() {
      var isAuthenticated = user.isAuthenticated();
    });
  }

  /**
   * @ngdoc method
   * @name service.auth#isAuthorized
   * @methodOf service.auth
   *
   * @description
   * Just return the stored _authenticated value.
   *
   * @returns {Boolean} _authenticated
   */
  self.isAuthorized = function() {
    return _authenticated;
  }

  /**
   * @ngdoc method
   * @name service.auth#check
   * @methodOf service.auth
   *
   * @description
   * Checks if the user is authorized to see a specific page
   * Get the cookie and validate the JWT token
   *
   * @returns {Boolean} same value as _authenticated
   */
  self.check = function() {
    var token = $cookies.get(COOKIE.TOKEN);
    var payload;
    var timestampNow = Math.floor((new Date()).getTime() / 1000); // divided by 1000 since getTime() gives in ms

    if (!token) {
      _authenticated = false;
      return false;
    }

    payload = self.parseJwt(token);

    if (payload.exp > timestampNow) {
      _authenticated = true;
      return true;
    }

    $cookies.remove(COOKIE.TOKEN);
    _authenticated = false;
    return false;
  }

  /**
   * @ngdoc method
   * @name service.auth#login
   * @methodOf service.auth
   *
   * @description
   * Request a token and saves into $cookies if the token is valid
   * Redirect on successfully login to home
   *
   * @param   {String}    formData email and password for the requested user
   * @returns {Promise}   Returns a promise with a token
   */
  self.login = function(formData) {
    return Restangular.one('login').customPOST($httpParamSerializer(formData));
  }

  /**
   * @ngdoc method
   *
   * @name service.auth#logout
   *
   * @methodOf service.auth
   *
   * @description
   * Deletes the user token and return to the welcome page
   */
  self.logout = function() {
    $cookies.remove(COOKIE.TOKEN);
    $cookies.remove(COOKIE.USER_ID);
    $window.location.assign('/');
  }

  /**
   * @ngdoc method
   * @name service.auth#parseJwt
   * @methodOf service.auth
   *
   * @description
   * Convert the JWT into an object and returns the payload content
   *
   * @returns {Object} payload content from JWT
   */
  self.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse($window.atob(base64));
  }
}
