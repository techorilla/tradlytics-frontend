(function () {
    'use strict';
    angular.module('app.dashboard.shipping')
        .controller('VesselForm', VesselForm);

    function VesselForm($state, shipping, toastr, loaderModal, dropDownConfig, $stateParams) {
        var vm = this;
        _init();

        function _init() {
            vm.isNew = ($stateParams.id === 'new');
            vm.vesselObj = {};
            vm.saveShippingVessel = saveShippingVessel;
            vm.shippingLineConfig = {};
            vm.shippingLineOptions = {};
            vm.cancel = cancel;

            dropDownConfig.prepareShippingLineConfig(vm.shippingLineConfig, vm.shippingLineOptions);

            if(vm.isNew){
                vm.vesselObj = shipping.getNewShippingVesselObj();
            }
            else{
                shipping.getShippingVesselObj($stateParams.id).then(function(res){
                    vm.vesselObj = res.vesselObj;
                });
            }
        }

        function saveShippingVessel(vesselForm, vesselObj){
            function successCallback(res){
                if(res.success){
                    toastr.success(res.message);
                    cancel();
                }
                else{
                    toastr.error(res.message);
                }
            }

            if(vesselForm.$valid){
                if(vm.isNew){
                    shipping.createShippingVesselObj(vesselObj).then(successCallback);
                }
                else{
                    shipping.updateShippingVesselObj(vesselObj).then(successCallback);
                }
            }
            else{
                toastr.error('Please enter mandatory fields!')
            }
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