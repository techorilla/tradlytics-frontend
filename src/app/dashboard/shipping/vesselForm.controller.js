(function () {
    'use strict';
    angular.module('app.dashboard.shipping')
        .controller('VesselForm', VesselForm);

    function VesselForm($state, shipping, toastr, loaderModal, dropDownConfig, $stateParams) {
        var vm = this;
        _init();

        function _init() {
            vm.saveShippingVessel = saveShippingVessel;
            vm.shippingLineConfig = {};
            vm.shippingLineOptions = {};
            vm.cancel = cancel;

            dropDownConfig.prepareShippingLineConfig(vm.shippingLineConfig, vm.shippingLineOptions);
        }

        function saveShippingVessel(vesselForm, vesselObj){

        }

        function cancel(){
            try {
                $state.go($state.current.prevState, $state.current.prevParam);
            }
            catch(err) {
                $state.go('dashboard.main');
            }
        }
    }
})();