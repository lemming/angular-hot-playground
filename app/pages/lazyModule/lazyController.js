import './lazy.scss';

export default ngModule => {
    ngModule.controller('LazyController', LazyController);
};

function LazyController() {
    const vm = this;

    vm.greeting = 'hot replacement is awesome: 1';

    console.log('lazyController is here!!');
}
