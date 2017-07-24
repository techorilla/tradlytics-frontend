/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('Warehouses', Warehouses);

    /* @ngInject */
        function Warehouses(appFormats, utilities, $filter, loaderModal, $state, allWarehouses) {
        var vm = this;
        _init();

        function _init(){
            vm.allWarehouses = allWarehouses;
            vm.goToWarehouseDetails = goToWarehouseDetails
        }

        function goToWarehouseDetails(id){
            $state.go('dashboard.inventory.warehouseDetails', {'id':id})
        }
    }
})();