export default angular => {
    const ngModule = angular.module('lazyModule', []);

    require('./lazyController')(ngModule);
};
