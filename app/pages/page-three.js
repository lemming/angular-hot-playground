export default function($controllerProvider) {
    $controllerProvider.register('PageThreeController', function() {
        const vm = this;
        console.log('lazy controller of the third page');
    });
}
