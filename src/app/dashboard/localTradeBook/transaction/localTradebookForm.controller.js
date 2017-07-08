/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.localTradeBook')
        .controller('LocalTradeBookForm', LocalTradeBookForm);

    /* @ngInject */
    function LocalTradeBookForm(tradeBook, dropDownConfig, appFormats, utilities, $filter, loaderModal) {
        var vm = this;
        _init();

        function _init(){
            vm.buyerConfig = {};
            vm.buyerOptions = {};
            vm.sellerConfig = {};
            vm.sellerOptions = {};
            vm.productItemConfig = {};
            vm.productItemOptions = {};
            vm.quantityMetricConfig = {};
            vm.quantityMetricOptions = {};

            vm.internationalTradeConfig = {};
            vm.internationalTradeOptions = {};


            dropDownConfig.prepareBusinessDropDown(vm.buyerConfig, vm.buyerOptions, 'Buyer');
            dropDownConfig.prepareBusinessDropDown(vm.sellerConfig, vm.sellerOptions, 'Seller');
            dropDownConfig.prepareProductItemDropDown(vm.productItemConfig, vm.productItemOptions);
            dropDownConfig.preparePriceMetricConfig(vm.quantityMetricConfig, vm.quantityMetricOptions);
            dropDownConfig.prepareInternationalTradeConfig(vm.internationalTradeConfig, vm.internationalTradeOptions);

            vm.localTransaction = {};
        }
    }
})();