/**
 * @ngdoc service
 * @name service.user
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 * @requires $cookies
 * @requires COOKIE
 * @requires $q
 * @requires $http
 */
angular
  .module('service.user')
  .service('user', user);

user.$inject = [
  '$rootScope',
  'Restangular',
  '$httpParamSerializer',
  '$cookies',
  '$timeout',
  '$http'
];


function user($rootScope, Restangular, $httpParamSerializer, $cookies, $timeout, $http) {
  // cache all promises - private
  var self = this;
  var _identity = undefined;
  var _authenticated = false;
  var _promiseCache = {
    get: {}, // saves the id of every saved person
  }

  /**
   * @ngdoc method
   * @name service.user#isAuthenticated
   * @methodOf service.user
   *
   * @description
   * Check if the user has already an _identity
   *
   * @returns {Boolean} angular.isDefined() from _identity
   */
  self.isIdentityResolved = function() {
    return angular.isDefined(_identity);
  }

  /**
   * @ngdoc method
   * @name service.user#isAuthenticated
   * @methodOf service.user
   *
   * @description
   * Simple returns the variable _authenticated
   *
   * @returns {Boolean} _authenticated the variable
   */
  self.isAuthenticated = function() {
    return _authenticated;
  }

  /**
   * @ngdoc method
   * @name service.user#getCurrent
   * @methodOf service.user
   *
   * @description
   * Get the ID and Name from the logged in user
   *
   * @returns {Promise} promise for the current user
   */
  self.getCurrent = function() {
    if (!_promiseCache.current) {
      _promiseCache.current = self.get();
    }

    return _promiseCache.current;
  }

  /**
   * @ngdoc method
   * @name service.user#currentUser
   * @methodOf service.user
   *
   * @description
   * Data of the current user - run setCurrent() before use
   */
  /**
   * @ngdoc method
   * @name service.user#setCurrent
   * @methodOf service.user
   *
   * @description
   * Set the rootscope of currentUser
   */
  self.setCurrent = function() {
    return (self.getCurrent()).then(function(data) {
      var userdata = data.plain().user;
      _identity = userdata;
      _authenticated = true;
      $rootScope.currentUser = userdata;
    });
  }

  /**
   * @ngdoc method
   * @name service.user#get
   * @methodOf service.user
   *
   * @description
   * Get a specific user
   *
   * @returns {Promise}       returns promise
   */
  self.get = function() {
    return Restangular.one('getuser').get();
  }

  /**
   * @ngdoc method
   * @name service.user#getspecific
   * @methodOf service.user
   *
   * @description
   * Get a specific user
   *
   * @id      {int}           the id of the user
   * @returns {Promise}       returns promise
   */
  self.getSpecificUser = function(id) {
    return Restangular.one('getspecificuser', id).get();
  }

  /**
   * @ngdoc method
   * @name service.user#create
   * @methodOf service.user
   *
   * @description
   * Create a new user with goal
   *
   * @param   {Object}    formData    the data from the user
   * @returns {Promise}   returns     promise
   */
  self.create = function(formData) {
    Restangular.configuration.defaultHeaders['Content-Type'] = 'application/json';
    var serialized = JSON.stringify(formData);

    return Restangular.one('registerall').customPOST({user: serialized});
  };

  /**
   * @ngdoc method
   * @name service.user#delete
   * @methodOf service.user
   *
   * @description
   * Deletes a specific user
   *
   * @param   {Integer} id    the user id
   * @returns {Promise}       returns promise
   */
  self.delete = function(id) {
    return Restangular.one('user', id).customDELETE();
  }
}
