import './hello.scss';

export default function(ngModule) {
    ngModule.directive('hello', function() {
        return {
            restrict: 'E',
            scope: {},
            template: `
            <div class="hello">
            {{vm.greeting}}
            </div>
            `,
            controllerAs: 'vm',
            controller: function() {
                var vm = this;

                vm.greeting = 'hello';
            }
        };
    });
}
