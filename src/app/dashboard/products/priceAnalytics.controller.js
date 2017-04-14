(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('ProductPriceAnalytics', productPriceAnalytics);

    function productPriceAnalytics($stateParams, utilities, product){
        var vm = this;
        _init();
        function _init() {
            vm.productItemId = $stateParams.productItemId;
            console.log(vm.productItemId);
            vm.dateRange = utilities.lastThirtyDaysDateRange();
            vm.onDateRangeChanged = onDateRangeChanged;
            getPriceReport(vm.dateRange, vm.productItemId);

        }

        function onDateRangeChanged(dateRange){
            vm.dateRange = dateRange;
            getPriceReport(dateRange, vm.productItemId);
        }


        function getPriceReport(dateRange, productItemId){
            product.getPriceReport(dateRange, productItemId);
        }
    }
})();
