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
    function LocalTradeBookForm(tradeBook, dropDownConfig, appFormats, utilities, $filter,
                                loaderModal, authentication, $stateParams, localTrade) {
        var vm = this;
        _init();

        function _init(){
            vm.isNew = ($stateParams.id === 'new');
            vm.buyerConfig = {};
            vm.buyerOptions = {};
            vm.sellerConfig = {};
            vm.sellerOptions = {};
            vm.productItemConfig = {};
            vm.productItemOptions = {};
            vm.quantityMetricConfig = {};
            vm.quantityMetricOptions = {};
            vm.userData = authentication.getUserData();
            vm.currency = vm.userData.data.currency;
            vm.internationalTradeConfig = {};
            vm.internationalTradeOptions = {};


            dropDownConfig.prepareBusinessDropDown(vm.buyerConfig, vm.buyerOptions, 'Local Buyer');
            dropDownConfig.prepareBusinessDropDown(vm.sellerConfig, vm.sellerOptions, 'Local Seller');
            dropDownConfig.prepareProductItemDropDown(vm.productItemConfig, vm.productItemOptions);
            dropDownConfig.preparePriceMetricConfig(vm.quantityMetricConfig, vm.quantityMetricOptions);
            dropDownConfig.prepareInternationalFileIdAutoComplete(vm.internationalTradeConfig, vm.internationalTradeOptions);

            vm.localTransaction = localTrade;
            vm.saveLocalTrade = saveLocalTrade;
        }

        function saveLocalTrade(localTradeForm, localTrade){
            console.log(localTradeForm.$valid);
        }
    }
})();