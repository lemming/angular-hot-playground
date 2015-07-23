export default(ngModule, angular) => {
    ngModule
    .config(config)
    .run(run);
};

function config($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider) {
    $urlRouterProvider.otherwise('/page-one');

    var authenticated = function($q, Auth) {
        var deferred = $q.defer();
        Auth.isLoggedIn().then(function(isLoggedIn) {
            if (isLoggedIn) {
                deferred.resolve();
            } else {
                // TODO use constant
                deferred.reject('unauthenticated');
            }
        });
        return deferred.promise;
    };

    $stateProvider.state('page-one', {
        url: '/page-one',
        template: require('./pages/page-one.html'),
        controller: function() {
            console.log('page one!');
        }
    });

    $stateProvider.state('page-two', {
        url: '/page-two',
        template: require('./pages/page-two.html'),
        controllerAs: 'vm',
        controller: require('./pages/page-two'),
        resolve: {
            authenticated: authenticated
        }
    });

    $stateProvider.state('login', {
        url: '/login',
        template: require('./pages/login.html'),
        controllerAs: 'vm',
        controller: require('./pages/login')
    });

    $stateProvider.state('page-three', {
        url: '/page-three',
        templateProvider: function($q) {
            const deferred = $q.defer();
            require.ensure(['./pages/page-three.html'], function() {
                const template = require('./pages/page-three.html');
                deferred.resolve(template);
            }, 'pageThree');
            return deferred.promise;
        },
        controller: 'PageThreeController',
        controllerAs: 'vm',
        resolve: {
            module: function($q) {
                const deferred = $q.defer();
                require.ensure(['./pages/page-three'], function(require) {
                    require('./pages/page-three')($controllerProvider);
                    deferred.resolve();
                }, 'pageThree');
                return deferred.promise;
            }
        }
    });

    $stateProvider.state('lazy-module', {
        url: '/lazy-module',
        template: require('./pages/lazyModule/lazy.html'),
        controller: 'LazyController',
        controllerAs: 'vm',
        resolve: {
          module: function($q, $ocLazyLoad) {
              const deferred = $q.defer();
              require.ensure([], function() {
                  require('./pages/lazyModule')(angular);
                  $ocLazyLoad.load({
                      name: 'lazyModule'
                  });
                  deferred.resolve();
              }, 'lazyModule');

              return deferred.promise;
          }
      }
    });
}

function run($rootScope, $state, Auth) {
    Auth.onLoginSuccess(() => $state.go('page-one'));

    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
        // TODO use constant
        if (error !== 'unauthenticated') return;

        Auth.onLoginSuccess(() => $state.go(toState.name, toParams));
        $state.go('login');
    });
}
