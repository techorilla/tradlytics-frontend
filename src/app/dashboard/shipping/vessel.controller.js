(function () {
    'use strict';
    angular.module('app.dashboard.shipping')
        .controller('Vessel', Vessel);

    function Vessel($state, shipping, toastr, loaderModal, dropDownConfig, $stateParams) {
        var vm = this;
        _init();

        function _init(){
            vm.searchOptions = [
                {name: 'IMO Number', id: 'imo_number'},
                {name: 'MMSI Number', id: 'mmsi_number'},
                {name: 'Vessel Name', id: 'vessel_name'},
                {name: 'Shipping Line', id: 'line'}
            ];
            vm.searchTypeConfig = dropDownConfig.getBasicDropDownConfig(false);
            vm.getVesselList = getVesselList;
            vm.vesselList = [];
            vm.searchObj = {
                query: '',
                queryType: 'imo_number'
            }
            // getVesselList();
        }

        function searchVessel(searchObj){

        }

        function getVesselList(searchObj){
            loaderModal.open();
            shipping.getShippingVesselList(searchObj).then(function(res){
                vm.vesselList = res.list;
                loaderModal.close();

            });
        }
    }
})();