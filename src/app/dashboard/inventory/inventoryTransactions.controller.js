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
    function InventoryTransaction(appFormats, utilities, $filter, $state, inventory, loaderModal) {
        var vm = this;
        _init();

        function _init(){
            vm.appFormats = appFormats;
            vm.inventoryRecords = [];
            vm.filteredRecords = [];
            vm.selectedProductID = [];
            vm.selectedWarehouseID = [];
            vm.selectedLocalTraderID = [];
            vm.weightInFlow = 0.00;
            vm.weightOutFlow = 0.00;
            vm.trucksInFlow = 0.00;
            vm.trucksOutFlow = 0.00;
            vm.weightDifferance = 0.00;
            vm.editRecord = editRecord;
            vm.dateRange = utilities.initialDateRange(30);
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.onWarehouseSelectedChanged = onWarehouseSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onLocalTradeSelectedChanged = onLocalTradeSelectedChanged;
            onDateRangeChanged(vm.dateRange, true)
        }

        function filterChanged(allRecords, firstTime){
            var recordsToRemove = [];
            if(!firstTime){
                angular.forEach(allRecords,function(record,key){
                    var removeRecord = false;
                    removeRecord = (vm.selectedProductID.indexOf(record.product__id)<=-1);
                    removeRecord = removeRecord ||((vm.selectedWarehouseID.indexOf(record.warehouse__id))<=-1);
                    removeRecord = removeRecord || (vm.selectedLocalTraderID.indexOf(record.transaction_business__bp_id)<=-1);
                    if(removeRecord){
                        recordsToRemove.push(record.id);
                    }
                    vm.filteredRecords = $filter('selectedRows')(allRecords, recordsToRemove, 'id');
                });
            }
            else{
                vm.filteredRecords = allRecords;
            }
            calculateStats(vm.filteredRecords);
        }

        function calculateStats(filteredRecords){
            vm.weightInFlow = 0.00;
            vm.weightOutFlow = 0.00;
            vm.trucksInFlow = 0.00;
            vm.trucksOutFlow = 0.00;
            vm.weightDifferance = 0.00;
            _.forEach(filteredRecords, function(value){
                if(value.positive){
                    vm.weightInFlow += value.total_weight_in_kgs;
                    vm.trucksInFlow += value.total_trucks
                }
                else{
                    vm.weightOutFlow += value.total_weight_in_kgs;
                    vm.trucksOutFlow += value.total_trucks
                }
                vm.weightDifferance = vm.weightInFlow - vm.weightOutFlow;

            })
        }

        function onLocalTradeSelectedChanged(selectedList, initialized){
            vm.selectedLocalTraderID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.inventoryRecords);
            }
        }

        function onProductsSelectedChanged(selectedList, initialized){
            vm.selectedProductID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.inventoryRecords);
            }

        }

        function onWarehouseSelectedChanged(selectedList, initialized){
            vm.selectedWarehouseID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.inventoryRecords);
            }
        }

        function onDateRangeChanged(dateRange, firstTime){
            loaderModal.open();
            inventory.getInventoryRecordList(dateRange).then(function(res){
                loaderModal.close();
                vm.inventoryRecords =  res.list;
                filterChanged(vm.inventoryRecords, firstTime);
            });
        }



        function editRecord(id){
            $state.go('dashboard.inventory.inventoryTransactionForm', {id:id})
        }


    }
})();