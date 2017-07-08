(function () {
    'use strict';
    angular.module('app.dashboard.shipping')
        .controller('Vessel', Vessel);

    function Vessel($state, shipping, toastr, loaderModal, dropDownConfig, $stateParams) {
        var vm = this;
        _init();

        function _init(){
            vm.vesselList = [];
            getVesselList();



        }

        function getVesselList(){
            loaderModal.open();
            shipping.getShippingVesselList().then(function(res){
                vm.vesselList = res.list.splice(5,5);
                loaderModal.close();
            });
        }
    }
})();