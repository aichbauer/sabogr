angular.module('app', [
  'ui.router',
  'LocalStorageModule',
  'restangular',
  'ngCookies',
  'pages',
  'service'
]);

angular
  .module('app')
  .config(config)
  .run(run)
  .constant("COOKIE", {
    "TOKEN": "tkn_u", // tkn_u = token_user
    "USER_ID": "u_i", // u_i = user_id
    "PREFLANGUAGE": "p_lang",
  })
  .constant('_', window._);

// config method
config.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  'localStorageServiceProvider',
  'RestangularProvider'
];

function config ($stateProvider, $urlRouterProvider, localStorageServiceProvider, RestangularProvider) {
  var $cookies;

  angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
    $cookies = _$cookies_;
  }]);

  // redirect to home state when we call the page without route information
  // activate in proudction and set mod_rewrite to index.html
  // $locationProvider.html5Mode(true);

  // setup restangular basics
  RestangularProvider.setBaseUrl('http://localhost:1337/api/v1')
    .setDefaultHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer '+ $cookies.get('tkn_u')
    });

  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/error');

  // setup header and footer templates
  var templates = {
    header: {
      template: 'src/pages/header/header.html',
      controller: 'HeaderCtrl as vm'
    },
    footer: {
      template: 'src/pages/footer/footer.html',
      controller: 'FooterCtrl as vm'
    }
  };

  $stateProvider
    .state('secure', {
      abstract: true,
      resolve: {
        authorize: ['auth',
          function(auth) {
            return auth.authorize();
          }
        ]
      },
      template: '<div class="view-header" data-ui-view="header"></div><div class="row small-up-1 medium-up-1 large-up-1"><div class="view-main column" data-ui-view="main"></div></div><div class="view-footer" data-ui-view="footer"></div>'
    })
    .state('secure.index', {
      url: '/',
      views: {
        header: {
          templateUrl: templates.header.template,
          controller: templates.header.controller
        },
        main: {
          templateUrl: 'src/pages/home/home.html',
          controller: 'HomeCtrl'
        },
        footer: {
          templateUrl: templates.footer.template,
          controller: templates.footer.controller
        }
      }
    })
    .state('secure.profile', {
      url: '/user/{id}',
      views: {
        header: {
          templateUrl: templates.header.template,
          controller: templates.header.controller
        },
        main: {
          templateUrl: 'src/pages/profile/profile.html',
          controller: 'ProfileCtrl'
        },
        footer: {
          templateUrl: templates.footer.template,
          controller: templates.footer.controller
        }
      }
    })
    .state('landing', {
      url: '/landing',
      views: {
        header: {
          templateUrl: templates.header.template,
          controller: templates.header.controller
        },
        main: {
          templateUrl: 'src/pages/landing/landing.html',
          controller: 'LandingCtrl'
        },
        footer: {
          templateUrl: templates.footer.template,
          controller: templates.footer.controller
        }
      }
    })
    .state('error', {
      url: '/error',
      views: {
        header: {
          templateUrl: templates.header.template,
          controller: templates.header.controller
        },
        main: {
          templateUrl: 'src/pages/error/error.html',
          controller: 'ErrorCtrl'
        },
        footer: {
          templateUrl: templates.footer.template,
          controller: templates.footer.controller
        }
      }
    });

  localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('localStorage');
};

// run method
run.$inject = [
  '$rootScope',
  '$stateParams',
  'auth',
  'user'
];

function run($rootScope, $stateParams, auth, user) {

  $rootScope.isLoggedIn = function() {
    return auth.isAuthorized();
  };

  $rootScope.moment = moment;

  $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
    // todo check if loggedin user wants to see the landing page
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;

    // redirect to login page if not logged in and trying to access a restricted page
    if (user.isIdentityResolved()) {
      auth.authorize();
    }
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
    // useful for current states
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;
  });
}

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});

