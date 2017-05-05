(function () {
    'use strict';
    angular.module('app.dashboard.tradeBook')
        .controller('Transaction', transaction);

    function transaction(dropDownConfig, tradeBook){
        console.log('hello');
        var vm = this;
        _init();

        function _init(){
            vm.quantityMetricConfig = {};
            vm.quantityMetricOptions = {};
            vm.productConfig = {};
            vm.productOptions = {};
            vm.packagingConfig = {};
            vm.packagingOptions = {};
            vm.buyerConfig = {};
            vm.buyerOptions = {};
            vm.sellerConfig = {};
            vm.sellerOptions = {};
            vm.productItemConfig = {};
            vm.productItemOptions = {};
            vm.commissionTypeConfig = {};
            vm.commissionTypeOptions = {};
            dropDownConfig.prepareCommissionTypeConfig(vm.commissionTypeConfig, vm.commissionTypeOptions);
            dropDownConfig.preparePackagingConfig(vm.packagingConfig, vm.packagingOptions);
            dropDownConfig.prepareProductItemDropDown(vm.productItemConfig, vm.productItemOptions);
            dropDownConfig.preparePriceMetricConfig(vm.quantityMetricConfig, vm.quantityMetricOptions);
            dropDownConfig.prepareProductDropDown(vm.productConfig, vm.productOptions);
            dropDownConfig.prepareBusinessDropDown(vm.buyerConfig, vm.buyerOptions, 'Buyer');
            dropDownConfig.prepareBusinessDropDown(vm.sellerConfig, vm.sellerOptions, 'Seller');
            vm.transaction = tradeBook.getNewTransaction();
        }


    }

})();
