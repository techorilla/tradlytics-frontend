/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('InventoryDashboard', InventoryDashboard);

    /* @ngInject */
    function InventoryDashboard(dashboardData, baConfig, utilities, $filter, loaderModal, $stateParams) {
        var vm = this;
        _init();

        function _init(){
            vm.dashboardColors = baConfig;
            vm.dashboardData = dashboardData;
            vm.allWarehouses = vm.dashboardData.allWarehouse;
        }
    }
})();