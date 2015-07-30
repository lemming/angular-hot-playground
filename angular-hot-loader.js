function stringify(callback) {
    var str = callback.toString();
    return str.slice(str.indexOf('{') + 1, str.lastIndexOf('}'));
}

module.exports = function(source) {
    this.cacheable();

    if (!/angular\.module\('lazyModule'/.test(source)) {
        return source;
    }

    var addition = stringify(function() {
        if (module.hot) {
            module.hot.accept('./lazyController.js', function() {
                var currentModule = angular.module('lazyModule');

                currentModule.config(function($controllerProvider) {
                    currentModule.controller = $controllerProvider.register;
                });

                require('./lazyController.js')(currentModule);

                var $state = angular.element(document.body).injector().get('$state');

                // TODO: if $state includes state containing this controller
                $state.reload();
            });
        }
    });

    return [source, addition].join('\n\n');
};
