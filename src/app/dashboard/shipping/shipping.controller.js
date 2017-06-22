(function () {
    'use strict';
    angular.module('app.dashboard.shipping')
        .controller('Shipping', Shipping);

    function Shipping($state) {
        var vm = this;
        _init();

        function goToShippingPorts(state){
            $state.go(state);
        }

        function _init(){
            vm.goToShippingPorts = goToShippingPorts;
        }


    }

})();
