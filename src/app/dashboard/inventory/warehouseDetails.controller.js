/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('WarehousesDetails', WarehousesDetails);

    /* @ngInject */
    function WarehousesDetails(appFormats, inventory, $filter, loaderModal, $state, warehouseObj) {
        var vm = this;
        _init();

        function _init(){
            vm.appFormats = appFormats;
            vm.warehouseObj = warehouseObj;
            vm.editWarehouseDetails = editWarehouseDetails;
            vm.changeCurrentWarehouseRent = inventory.changeCurrentWarehouseRent;
            vm.onrentSaveCallBack = onRentSaveCallBack;
            vm.backToWarehouseList = backToWarehouseList;
        }

        function backToWarehouseList(){
            $state.go('dashboard.inventory.warehouses');
        }

        function onRentSaveCallBack(res){
            vm.warehouseObj.rentList = res.rentList;
        }


        function editWarehouseDetails(id){
            $state.go('dashboard.inventory.warehousesForm', {'id': id})
        }
    }
})();
