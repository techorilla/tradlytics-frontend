(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .factory('inventory', inventory);

    /* @ngInject */
    function inventory(Restangular, apiEndPoints, utilities, $uibModal) {
        var inventoryAPI = Restangular.all(apiEndPoints.inventory.main);

        return {
            getDashboardData: getDashboardData,
            createWarehouse: createWarehouse,
            updateWarehouse: updateWarehouse,
            createWarehouseTransaction: createWarehouseTransaction,
            getWarehouseList: getWarehouseList,
            getWarehouseDetails: getWarehouseDetails,
            getNewWarehouseObj: getNewWarehouseObj,
            changeCurrentWarehouseRent: changeCurrentWarehouseRent,
            saveNewWarehouseRent: saveNewWarehouseRent
        };

        function getWarehouseDetails(id, rentDetails){
            return inventoryAPI.customGET(apiEndPoints.inventory.warehouse, {
                'id': id,
                'rent': rentDetails
            })
        }

        function saveNewWarehouseRent(id, warehouseObj){
            var warehouseObj = angular.extend(warehouseObj, {'warehouseId': id})
            return inventoryAPI.customPOST(warehouseObj, apiEndPoints.inventory.warehouseRent);
        }

        function changeCurrentWarehouseRent(warehouseId, callback){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/dashboard/inventory/warehouseRentForm.html',
                controller: 'WarehousesRentForm as vm',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    warehouseId: function(){
                        return warehouseId;
                    },
                    callback: function(){
                        return callback;
                    }
                }


            });

            modalInstance.result.then(function(response){
                callback(response);
            });
        }

        function getNewWarehouseObj(){
            return {
                name: '',
                lots: 1,
                totalCapacityKgs: 0.00,
                selfWarehouse:false,
                contact: '',
                address: ''
            }
        }

        function getDashboardData(){
            return inventoryAPI.customGET(apiEndPoints.inventory.dashboard);
        }

        function getWarehouseList(){
            return inventoryAPI.customGET(apiEndPoints.inventory.warehouse+'/list');
        }

        function createWarehouse(warehouseObj){
            return inventoryAPI.customPOST(warehouseObj, apiEndPoints.inventory.warehouse);
        }

        function updateWarehouse(warehouseObj){
            return inventoryAPI.customPUT(warehouseObj, apiEndPoints.inventory.warehouse);
        }

        function createWarehouseTransaction(){

        }
    }

})();