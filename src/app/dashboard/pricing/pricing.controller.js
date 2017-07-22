(function () {
    'use strict';
    angular.module('app.dashboard.pricing')
        .controller('Pricing', pricing);

    function pricing($state, allProductPriceSummary, appConstants, appFormats){
        var vm = this;
        _init();

        function _init(){
            vm.allProductPriceSummary = allProductPriceSummary;
            vm.appConstants = appConstants;
            vm.appFormats = appFormats;
            vm.selectedProductID = [];
            vm.selectedCountry = [];
            vm.addProductPricing = addProductPricing;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;
            vm.productPriceReport = productPriceReport;
        }

        function productPriceReport(productItemId){
            $state.go('dashboard.pricing.priceAnalytics', {'productItemId': productItemId});
        }

        function filterChanged(){
            vm.priceSummaryToRemove = [];
            angular.forEach(vm.allProductPriceSummary, function(summaryItem,key){
                var removeTransaction = false;
                removeTransaction = removeTransaction || (vm.selectedProductID.indexOf(summaryItem.productId)<=-1);
                removeTransaction = removeTransaction || (vm.selectedCountry.indexOf(summaryItem.productOriginName)<=-1);
                if(removeTransaction){
                    vm.priceSummaryToRemove.push(summaryItem.productItemId);
                }
            });
        }

        function onProductsSelectedChanged(selectedList, initialized){
            vm.selectedProductID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged();
            }
        }

        function onCountrySelectedChanged(selectedList, initialized){
            vm.selectedCountry = _.map(selectedList, 'name');
            if(!initialized){
                filterChanged();
            }
        }

        function addProductPricing(stateName){
            $state.go(stateName);
        }
    }

})();