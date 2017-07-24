

/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('WarehouseForm', WarehouseForm);

    /* @ngInject */
    function WarehouseForm(appFormats, warehouseObj,  $state, inventory, loaderModal, $stateParams, toastr) {
        var vm = this;
        _init();

        function _init(){
            vm.isNew = ($stateParams.id === 'new');
            vm.warehouseObj = warehouseObj;
            vm.saveWarehouse = saveWarehouse;
            vm.cancel = cancel;
        }

        function cancel(){
            $state.go('dashboard.inventory.warehouses');
        }

        function saveWarehouse(newWarehouse, warehouseFormObj, warehouseObj){
            if(warehouseFormObj.$valid){
                loaderModal.open();
                var inventoryMethod = (newWarehouse) ? inventory.createWarehouse : inventory.updateWarehouse;
                inventoryMethod(warehouseObj).then(function(res){
                    if(res.success){
                        toastr.success(res.message);
                    }
                    else{
                        toastr.error(res.message, 'Error');
                    }
                    loaderModal.close();
                    $state.go('dashboard.inventory.warehouseDetails', {
                        id: res.id
                    });
                })
            }
            else{
                toastr.error('Please enter missing or incorrect fields! ', 'Error');
            }
        }
    }
})();