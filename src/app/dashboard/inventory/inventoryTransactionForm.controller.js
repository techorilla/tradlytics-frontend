/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('InventoryTransactionForm', InventoryTransactionForm);

    /* @ngInject */
    function InventoryTransactionForm(inventoryRecord, appFormats, inventory, $stateParams, toastr,
                                      $filter, loaderModal, $state, dropDownConfig, $scope) {
        var vm = this;
        _init();

        function _init(){
            vm.isNew = ($stateParams.id === 'new');
            vm.totalWeight = 0.00;
            vm.appFormats = appFormats;
            vm.productConfig = {};
            vm.productOptions = {};
            vm.warehouseConfig = {};
            vm.warehouseOptions = {};
            vm.businessConfig = {};
            vm.businessOptions = {};
            dropDownConfig.prepareWarehouseDropDown(vm.warehouseConfig, vm.warehouseOptions);
            dropDownConfig.prepareBusinessDropDown(vm.businessConfig, vm.businessOptions, 'Local Trader');
            dropDownConfig.prepareProductDropDown(vm.productConfig, vm.productOptions);
            vm.inventoryRecordId = $stateParams.id;
            vm.inventoryRecord = inventoryRecord;
            vm.getNewInventoryTruckObj = inventory.getNewInventoryTruckObj;
            vm.saveTruckInInventoryRecord = inventory.saveTruckInInventoryRecord;
            vm.saveInventoryRecord = saveInventoryRecord;
            vm.inventoryTruckCallback = inventoryTruckCallback;
            vm.removeTruck = removeTruck;
            vm.cancel = cancel;

            $scope.$watch('vm.inventoryRecord.trucks', function(newVal, oldVal){
                vm.totalWeight = _.sumBy(newVal, function(truck) { return parseFloat(truck.weightInKg); });
            }, true)
        }

        function removeTruck(truck, inventoryRecord){
            var truckIndex = vm.inventoryRecord.trucks.indexOf(truck);
            inventoryRecord.removedTrucks = (inventoryRecord.removedTrucks) ? inventoryRecord.removedTrucks : []
            if(truck.id!=='new'){
                inventoryRecord.removedTrucks.push(truck.id);
            }
            vm.inventoryRecord.trucks.splice(truckIndex,1);
        }



        function saveInventoryRecord(inventoryRecordForm, inventoryRecord){
            if(inventoryRecordForm.$valid){
                if(inventoryRecord.trucks.length === 0){
                    toastr.error('Please enter atleast one truck detail!', 'Error')
                }
                else{
                    loaderModal.open();
                    var inventorySaveMethod = (vm.isNew) ? inventory.createInventoryRecord : inventory.updateInventoryRecord;
                    inventorySaveMethod(inventoryRecord).then(inventoryRecordSuccessCallback)
                }
            }
            else{
                console.log(inventoryRecordForm);
                toastr.error('Please enter missing fields', 'Error')
            }

        }

        function inventoryRecordSuccessCallback(response){
            if(response.success){
                toastr.success(response.message, 'Success');
                $state.go('dashboard.inventory.inventoryTransactions');
            }
            else{
                toastr.error(response.message, 'Error');
            }
            loaderModal.close()
        }

        function inventoryTruckCallback(inventoryTruckObj){
            if(inventoryTruckObj.id === 'new'){
                vm.inventoryRecord.trucks.push(inventoryTruckObj);
            }
            else{
                var truck = _.find(vm.inventoryRecord.trucks, function(truck){
                    return truck.id === inventoryTruckObj.id;
                });
                var truckIndex = vm.inventoryRecord.trucks.indexOf(truck);
                vm.inventoryRecord.trucks[truckIndex]=inventoryTruckObj;
            }
        }

        function cancel(){
            $state.go('dashboard.inventory.inventoryTransactions');
        }

    }
})();