export default angular => {
    const ngModule = angular.module('lazyModule', []);

    require('./lazyController.js')(ngModule);
}

// check if HMR is enabled
if (module.hot) {

    module.hot.accept('./lazyController.js', function() {
        const currentModule = angular.module('lazyModule');

        currentModule.config(function($controllerProvider) {
            ngModule.controller = $controllerProvider.register;
        });

        require('./lazyController.js')(currentModule);

        // TODO: reload specific state which is bound with controller
        const $state = angular.element(document.body).injector().get('$state');

        $state.reload();
    });
}
