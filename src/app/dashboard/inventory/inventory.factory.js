(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .factory('inventory', inventory);

    /* @ngInject */
    function inventory(Restangular, apiEndPoints, utilities, $uibModal, loaderModal) {
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
            saveNewWarehouseRent: saveNewWarehouseRent,
            getNewInventoryRecordObj: getNewInventoryRecordObj,
            saveTruckInInventoryRecord: saveTruckInInventoryRecord,
            getNewInventoryTruckObj: getNewInventoryTruckObj,

            createInventoryRecord: createInventoryRecord,
            updateInventoryRecord: updateInventoryRecord,

            getInventoryRecordList: getInventoryRecordList,
            getInventoryRecord: getInventoryRecord,
            openWarehouseProductStockReport:openWarehouseProductStockReport,

            getWarehouseProductReport: getWarehouseProductReport


        };

        function getWarehouseProductReport(warehouseId){
            return inventoryAPI.customGET(apiEndPoints.inventory.warehouseProductReport, {warehouseId: warehouseId})
        }


        function getInventoryRecordList(){
            return inventoryAPI.customGET(apiEndPoints.inventory.transaction+'/list');
        }

        function getInventoryRecord(id){
            return inventoryAPI.customGET(apiEndPoints.inventory.transaction,{
                id: id
            });
        }

        function createInventoryRecord(inventoryRecord){
            return inventoryAPI.customPOST(inventoryRecord, apiEndPoints.inventory.transaction);
        }

        function updateInventoryRecord(inventoryRecord){
            return inventoryAPI.customPUT(inventoryRecord, apiEndPoints.inventory.transaction)
        }




        function getNewInventoryTruckObj(){
            return {
                'id': 'new',
                'date': null,
                'truckNo': '',
                'weightInKg': 0.00,
                'remarks': ''
            }
        }

        function getNewInventoryRecordObj(){
            return {
                'warehouseId': null,
                'lotNo': '',
                'date': null,
                'businessId': '',
                'portClearingNo': '',
                'fclQuantity': 0,
                'productId': '',
                'positive': 'True',
                'trucks': [],
                'removedTrucks': []
            }
        }

        function getWarehouseDetails(id, rentDetails){
            return inventoryAPI.customGET(apiEndPoints.inventory.warehouse, {
                'id': id,
                'rent': rentDetails
            })
        }

        function saveNewWarehouseRent(id, warehouseObj){
            var warehouseObj = angular.extend(warehouseObj, {'warehouseId': id});
            return inventoryAPI.customPOST(warehouseObj, apiEndPoints.inventory.warehouseRent);
        }

        function openWarehouseProductStockReport(warehouseId, warehouseName, warehouseQuantity){
            var modelsInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/dashboard/inventory/warehouseProductStockReport.html',
                controller: function($scope, productReport){
                    $scope.productReport = productReport;
                    $scope.warehouseName = warehouseName;
                    $scope.warehouseQuantity = warehouseQuantity;
                    $scope.totalSelfQuantity = _.sumBy(productReport, function(report){
                        return report.selfQuantity;
                    });
                    $scope.totalOtherQuantity = _.sumBy(productReport, function(report){
                        return report.otherBusinessQuantityInStock;
                    });
                },
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    productReport: function(){
                        loaderModal.open();
                        return getWarehouseProductReport(warehouseId).then(function(res){
                            loaderModal.close();
                            console.log(res);
                            return res.productReport;
                        })
                    },
                    warehouseName: function(){
                        return warehouseName;
                    },
                    warehouseQuantity: function(){
                        return warehouseQuantity;
                    }

                }
            });
        }

        function saveTruckInInventoryRecord(inventoryRecordId, callback, inventoryTruckObj, toastr){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/dashboard/inventory/inventoryTruckForm.html',
                controller: function($scope){
                    $scope.inventoryRecordId = inventoryRecordId;
                    $scope.inventoryTruckObj = inventoryTruckObj;
                    $scope.saveNewInventoryTruck = function(inventoryTruckForm, inventoryTruckId, inventoryTruckObj){
                        if(inventoryTruckForm.$valid){
                            modalInstance.close($scope.inventoryTruckObj);
                        }
                        else{
                            toastr.error('Please Enter mandatory fields');
                        }

                    }
                },
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    inventoryRecordId: function(){
                        return inventoryRecordId;
                    },
                    callback: function(){
                        return callback;
                    },
                    inventoryTruckObj: function(){
                        return inventoryTruckObj
                    }
                }
            });

            modalInstance.result.then(function(inventoryTruckObj){
                callback(inventoryTruckObj);
            });
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