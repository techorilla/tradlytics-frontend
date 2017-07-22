(function() {

    'use strict';

    angular
        .module('app.dashboard.pricing')
        .controller('PriceAnalytics', PriceAnalytics);

    /* @ngInject */
    function PriceAnalytics(appFormats, utilities, $filter, loaderModal, $stateParams, pricing) {
        var vm = this;
        _init();

        function _init(){
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.chartValues = ['importVolume', 'intUsdPmt', 'intPkrPkg', 'localPkrPkg', 'localUsdPmt'];
            vm.chartType = 'line';
            vm.priceAnalyticsData = {};
            vm.graphData = [];
            vm.showGraph=true;
            vm.dateRange = utilities.initialDateRange();
            onDateRangeChanged(vm.dateRange);
        }

        function onDateRangeChanged(dateRange){
            vm.dateRange = dateRange;
            getPriceAnalyticsData(dateRange, $stateParams.productItemId);
        }

        function getPriceAnalyticsData(dateRange, productItemId){
            vm.showGraph = false;
            loaderModal.open();
            pricing.getProductPricingAnalytics(dateRange, productItemId).then(function(res){
                loaderModal.close();
                if(res.success){
                    vm.priceAnalyticsData = res.data;
                    console.log(vm.priceAnalyticsData.graphData);
                    vm.graphData = utilities.prepareGraphData(vm.priceAnalyticsData.graphData);
                    vm.totalVolume = vm.priceAnalyticsData.totalVolume;
                    vm.showGraph = true;
                }

            })
        }

    }
})();