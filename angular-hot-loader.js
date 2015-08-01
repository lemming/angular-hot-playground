function stringify(callback) {
    var str = callback.toString();
    return str.slice(str.indexOf('{') + 1, str.lastIndexOf('}'));
}

function extractControllers(source) {
    var regex = /require\('(?=[^']*Controller)(.*?)'\)/g;
    var controllers = [];

    while (matches = regex.exec(source)) {
        controllers.push(matches[1]);
    }

    return controllers;
}

module.exports = function(source) {
    this.cacheable();

    var matches = source.match(/angular\.module\(\'(\w+)\',\s*\[/);

    if (!matches) return source;

    var moduleName = matches[1];

    var controllers = extractControllers(source);

    if (!controllers.length) return source;

    var addition = 'if (module.hot) {\n' +
        controllers.map(function(controllerPath) {
            return stringify(function() {
                module.hot.accept(controllerPath, function() {
                    var ngModule = angular.module(moduleName);

                    ngModule.config(function($controllerProvider) {
                        ngModule.controller = $controllerProvider.register;
                    });

                    require(controllerPath)(ngModule);

                    var $state = angular.element(document.body).injector().get('$state');

                    // TODO: if $state includes state containing this controller
                    $state.reload();
                });
            })
            .replace(/\bmoduleName\b/g, JSON.stringify(moduleName))
            .replace(/\bcontrollerPath\b/g, JSON.stringify(controllerPath));
        }).join('\n') +
        '\n}';


    return [source, addition].join('\n\n');
};
