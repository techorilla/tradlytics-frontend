(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('WarehousesLotReport', WarehousesLotReport);

    /* @ngInject */
    function WarehousesLotReport(appFormats, utilities, $filter, loaderModal, $state, allWarehouses) {
        var vm = this;
        _init();

        function _init(){
            vm.allWarehouses = allWarehouses;
            vm.goToWarehouseDetails = goToWarehouseDetails;
            vm.goToWarehouseReport = goToWarehouseReport;
        }

        function goToWarehouseDetails(id){
            $state.go('dashboard.inventory.warehouseDetails', {'id':id})
        }

        function goToWarehouseReport(id){

        }
    }
})();