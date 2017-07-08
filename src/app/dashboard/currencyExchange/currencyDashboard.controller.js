/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.currencyExchange')
        .controller('CurrencyDashboard', CurrencyDashboard);

    /* @ngInject */
    function CurrencyDashboard(appFormats, utilities, $filter, loaderModal, $stateParams, currencyExchange) {
        var vm = this;
        _init();

        function _init(){
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.chartValues = ['value'];
            vm.chartType = 'line';
            vm.currencyDashboardData = {};
            vm.graphData = [];
            vm.showGraph=true;
            vm.dateRange = utilities.initialDateRange();
            onDateRangeChanged(vm.dateRange, true);
        }

        function onDateRangeChanged(dateRange, firstTime){
            vm.dateRange = dateRange;
            getCurrencyExchangeDashboardData(dateRange, $stateParams.currencyIn, $stateParams.currencyOut);
        }

        function getCurrencyExchangeDashboardData(dateRange, currencyIn, currencyOut){
            vm.showGraph = false;
            loaderModal.open();
            currencyExchange.getDashboardData(dateRange, currencyIn, currencyOut).then(function(res){
                if(res.success){
                    vm.currencyDashboardData = res.data;
                    vm.graphData = utilities.prepareGraphData(vm.currencyDashboardData.graphData);
                    console.log(vm.graphData);
                    vm.showGraph = true;
                    loaderModal.close();
                }
            })
        }

    }
})();