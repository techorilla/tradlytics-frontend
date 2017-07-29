/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('InventoryTransactions', InventoryTransaction);

    /* @ngInject */
    function InventoryTransaction(appFormats, utilities, $filter, $state, inventoryRecords) {
        var vm = this;
        _init();

        function _init(){
            vm.appFormats = appFormats;
            vm.inventoryRecords = inventoryRecords;
            vm.editRecord = editRecord;
            vm.dateRange = utilities.initialDateRange(30);
            vm.onWarehouseSelectedChanged = onWarehouseSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onLocalTradeSelectedChanged = onLocalTradeSelectedChanged;
        }

        function onLocalTradeSelectedChanged(){

        }

        function onProductsSelectedChanged(){


        }


        function onWarehouseSelectedChanged(){

        }



        function editRecord(id){
            $state.go('dashboard.inventory.inventoryTransactionForm', {id:id})
        }


    }
})();