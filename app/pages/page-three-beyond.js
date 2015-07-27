export default function($controllerProvider) {
    $controllerProvider.register('PageThreeBeyondController', function() {
        const vm = this;
        console.log('nested lazy controller of the third page');
    });
}
