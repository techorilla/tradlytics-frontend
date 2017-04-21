(function () {
    'use strict';
    angular.module('app.dashboard.pricing')
        .controller('PriceMarket', priceMarket);

    function priceMarket(allMarkets, dropDownConfig, pricing, $stateParams, toastr, $state){
        var vm = this;
        _init();

        function _init(){
            vm.isNewPriceMarket = ($stateParams.id === 'new');
            vm.showForm = false;
            vm.allMarkets = allMarkets;
            vm.isInternational = true;
            vm.currencyConfig = {};
            vm.currencyOptions = {};
            vm.countryConfig = {};
            vm.countryOptions = {};

            vm.addPriceMarket = addPriceMarket;
            vm.editPriceMarket = editPriceMarket;
            dropDownConfig.prepareCountryDropDown(vm.countryConfig, vm.countryOptions, 1);
            dropDownConfig.prepareCurrencyDropDown(vm.currencyConfig, vm.currencyOptions);
            vm.onInternationalChange = onInternationalChange;
            vm.addNewPriceMarket = addNewPriceMarket;
            vm.updatePriceMarket = updatePriceMarket;
            vm.cancelPriceMarket = cancelPriceMarket;
        }

        function addPriceMarket(){
            vm.showForm = false;
            vm.priceMarket = pricing.getNewPriceMarkets();
            vm.showForm = true;

        }

        function editPriceMarket(row){
            vm.showForm = false;
            vm.priceMarket = row;
            vm.showForm = true;
        }

        function successCallBack(response, successMsg, update){
            if(response.success){
                if(update){
                    var obj = response.obj;
                    var market = _.find(vm.allMarkets, function(market){
                        return market.id == obj.id;
                    });
                    var index = _.indexOf(vm.allMarkets, market);
                    vm.allMarkets[index] = obj;
                    vm.showForm = false;
                }
                else{
                    vm.allMarkets.push(response.obj);
                    vm.showForm = false;
                }
                toastr.success(successMsg);
            }
            else{
                toastr.error(response.message)
            }
        }

        function onInternationalChange(isInternational, priceMarket){
            if(isInternational){
                priceMarket.country = null;
            }
        }

        function getPriceMarket(priceMarketId){
            return pricing.getPriceMarket(priceMarketId);
        }

        function cancelPriceMarket(){
            vm.priceMarket = {};
            vm.showForm = false;
        }

        function addNewPriceMarket(priceMarket){
            pricing.addPriceMarket(priceMarket, successCallBack);
        }

        function updatePriceMarket(priceMarket){
            pricing.updatePriceMarket(priceMarket, successCallBack);
        }
    }

})();
