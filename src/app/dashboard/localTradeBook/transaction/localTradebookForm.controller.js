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
    function LocalTradeBookForm(tradeBook, dropDownConfig, $state, paymentTerms, toastr,
                                loaderModal, authentication, $stateParams, localTrade, localTradeBook) {
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
            vm.localTradeConfig = {};
            vm.localTradeOptions = {};
            vm.paymentTerms = paymentTerms;

            dropDownConfig.prepareBusinessDropDown(vm.buyerConfig, vm.buyerOptions, 'Local Buyer');
            dropDownConfig.prepareBusinessDropDown(vm.sellerConfig, vm.sellerOptions, 'Local Seller');
            dropDownConfig.prepareProductItemDropDown(vm.productItemConfig, vm.productItemOptions);
            dropDownConfig.preparePriceMetricConfig(vm.quantityMetricConfig, vm.quantityMetricOptions);
            dropDownConfig.prepareInternationalFileIdAutoComplete(vm.internationalTradeConfig, vm.internationalTradeOptions, true);
            dropDownConfig.prepareLocalTradeConfig(vm.localTradeConfig, vm.localTradeOptions, true);

            vm.localTransaction = localTrade;
            vm.saveLocalTrade = saveLocalTrade;
            vm.cancel = cancel;
        }

        function saveLocalTradeCallBack(res){
            if(res.success){
                toastr.success(res.message, 'Success');
                $state.go('dashboard.localTradeBook');
            }
            else{
                toastr.error(res.message, 'Error');
            }

        }

        function cancel(){
            $state.go('dashboard.localTradeBook');
        }

        function saveLocalTrade(localTradeForm, trade){
            if(vm.isNew){
                localTradeBook.addLocalTrade(trade).then(saveLocalTradeCallBack);
            }
            else{
                localTradeBook.updateLocalTrade(trade).then(saveLocalTradeCallBack);
            }
        }
    }
})();