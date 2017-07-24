/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('WarehousesRentForm', WarehousesRentForm);

    /* @ngInject */
    function WarehousesRentForm($scope, $uibModalInstance, warehouseId, toastr, inventory, callback) {
        var vm = this;
        _init();

        function _init(){
            vm.warehouseId = warehouseId;
            vm.saveNewCurrentRent = saveNewCurrentRent;
        }

        function saveNewCurrentRent(warehouseRentForm, warehouseId, warehouseObj){
            if(warehouseRentForm.$valid){
                inventory.saveNewWarehouseRent(warehouseId, warehouseObj).then(function(res){
                    if(res.success){
                        toastr.success(res.message);
                        $uibModalInstance.close(res);
                    }
                    else{
                        toastr.error(res.message);
                    }
                });
            }else{
                toastr.error('Please enter missing fields', 'Error');
            }
        }

        function goToWarehouseDetails(id){
            $state.go('dashboard.inventory.warehouseDetails', {'id':id})
        }
    }
})();