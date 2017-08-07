(function () {
    'use strict';

    angular.module('app.dashboard.inventory', [])
        .config(routeConfig);

    function routeConfig($stateProvider, baSidebarServiceProvider) {
        $stateProvider
            .state('dashboard.inventory', {
                url: '/inventory',
                abstract: true,
                title: 'Inventory',
                views: {
                    'content@dashboard': {
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
            .state('dashboard.inventory.dashboard', {
                url: '/summary',
                title:'Inventory Dashboard',
                views:{
                    'content@dashboard.inventory':{
                        templateUrl:'app/dashboard/inventory/inventoryDashboard.html',
                        controller: 'InventoryDashboard as vm'
                    }
                },
                resolve: {
                    dashboardData: function (inventory) {
                        return inventory.getDashboardData().then(function(res){
                            return res.data
                        });
                    }
                },
                pageHeader:{
                    subTitle: 'Inventory',
                    title:'Dashboard',
                    headerAnchor: [
                        {
                            text: 'Warehouses',
                            state: 'dashboard.inventory.warehouses'
                        },
                        {
                            text: 'Inventory Record Book',
                            state: 'dashboard.inventory.inventoryTransactions'
                        }
                    ]
                }
            })
            .state('dashboard.inventory.warehouses',{
                url: '/warehouses',
                title: 'Warehouses',
                views:{
                    'content@dashboard.inventory':{
                        templateUrl:'app/dashboard/inventory/warehouses.html',
                        controller:'Warehouses as vm'
                    }
                },
                resolve:{
                    allWarehouses: function($rootScope, $stateParams, inventory){
                        return inventory.getWarehouseList().then(function(res){
                            return res.list;
                        })
                    }
                },
                pageHeader:{
                    subTitle: 'All',
                    title:'Warehouses',
                    headerAnchor: [
                        {
                            text: 'Add New Warehouse',
                            state: 'dashboard.inventory.warehousesForm({id:"new"})'
                        }
                    ],
                    goBack: true
                }
            })
            .state('dashboard.inventory.warehousesLotReport',{
                url: '/warehouses',
                title: 'Warehouses Lot Report',
                views:{
                    'content@dashboard.inventory':{
                        templateUrl:'app/dashboard/inventory/warehouseLotReport.html',
                        controller:'Wareh as vm'
                    }
                },
                resolve:{

                },
                pageHeader:{
                    goBack: true
                }
            })
            .state('dashboard.inventory.warehousesForm',{
                url: '/warehouse/:id',
                title: 'Warehouses',
                pageHeader:{
                    goBack: true
                },
                views:{
                    'content@dashboard.inventory':{
                        templateUrl:'app/dashboard/inventory/warehouseForm.html',
                        controller:'WarehouseForm as vm'
                    }
                },
                resolve:{
                    warehouseObj: function($rootScope, $stateParams, inventory){
                        if($stateParams.id === 'new'){
                            $rootScope.headerSubTitle = 'Add New';
                            $rootScope.headerTitle = 'Warehouse';
                            return inventory.getNewWarehouseObj();
                        }
                        else{
                            return inventory.getWarehouseDetails($stateParams.id, false).then(function(res){
                                if(res.success){
                                    return res.warehouseObj;
                                }
                            })
                        }
                    }
                }

            })
            .state('dashboard.inventory.warehouseDetails',{
                url: '/warehouseDetails/:id',
                title: 'Warehouses',
                views:{
                    'content@dashboard.inventory':{
                        templateUrl:'app/dashboard/inventory/warehouseDetails.html',
                        controller:'WarehousesDetails as vm'
                    }
                },
                pageHeader:{
                    goBack: true
                },
                resolve:{
                    warehouseObj: function($rootScope, $stateParams, inventory){
                        return inventory.getWarehouseDetails($stateParams.id, true).then(function(res){
                            if(res.success){
                                $rootScope.headerSubTitle = 'Warehouse';
                                $rootScope.headerTitle = res.warehouseObj.name;
                                return res.warehouseObj;
                            }
                        })
                    }
                }

            })
            .state('dashboard.inventory.inventoryTransactionForm', {
                url: '/inventoryForm/:id',
                title: 'Inventory Transaction',
                views:{
                    'content@dashboard.inventory':{
                        templateUrl:'app/dashboard/inventory/inventoryTransactionForm.html',
                        controller:'InventoryTransactionForm as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Inventory',
                    title:'Dashboard',
                    goBack:true
                },
                resolve:{
                    inventoryRecord: function($stateParams, inventory, loaderModal){
                        if($stateParams.id==='new'){
                            return inventory.getNewInventoryRecordObj();
                        }
                        else{
                            return inventory.getInventoryRecord($stateParams.id).then(function(res){
                                if(res.success){
                                    return res.recordObj;
                                }
                            })
                        }
                    }
                }
            })
            .state('dashboard.inventory.inventoryTransactions', {
                url: '/inventoryTransactions',
                title: 'Inventory Transactions',
                views:{
                    'content@dashboard.inventory':{
                        templateUrl:'app/dashboard/inventory/inventoryTransactions.html',
                        controller:'InventoryTransactions as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Inventory',
                    title:'Record Book',
                    headerAnchor: [
                        {
                            text: 'Add New Inventory Record',
                            state: 'dashboard.inventory.inventoryTransactionForm({id: "new"})'
                        }
                    ],
                    goBack:true
                }
            });
    }


})();