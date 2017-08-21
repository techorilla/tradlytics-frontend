(function () {
    'use strict';
    angular.module('app.dashboard.pricing')
        .controller('ProductPricing', ProductPricing);

    function ProductPricing(pricing, dropDownConfig, toastr, allPriceItems, appFormats, utilities, loaderModal){
        var vm = this;
        _init();

        function _init(){
            vm.priceItemsToRemove = [];
            vm.showForm = false;
            vm.dateRange = utilities.todayDateRange();
            vm.appFormats = appFormats;
            vm.allPriceItems = allPriceItems;
            vm.marketPriceObj = pricing.getNewMarketPriceObj();
            vm.currentCurrency = 'USD';
            vm.currentMetric = 'FCL';
            vm.productItemConfig = {};
            vm.productItemOptions = {};
            vm.priceMarketConfig = {};
            vm.priceMarketOptions = {};
            vm.shipmentMonthConfig = {};
            vm.shipmentMonthOptions = {};
            vm.priceMetricConfig = {};
            vm.priceMetricOptions = {};
            vm.selectedPriceMarketID = [];
            vm.selectedCountry = [];
            vm.selectedProductID = [];
            vm.time = new Date();
            dropDownConfig.prepareShipmentMonthDropDown(vm.shipmentMonthConfig, vm.shipmentMonthOptions);
            dropDownConfig.prepareProductItemDropDown(vm.productItemConfig, vm.productItemOptions, true);
            dropDownConfig.preparePriceMarketDropDown(vm.priceMarketConfig, vm.priceMarketOptions, onPriceMarketChange);
            dropDownConfig.preparePriceMetricConfig(vm.priceMetricConfig, vm.priceMetricOptions);
            vm.openDatePicker = function() {
                vm.dateOpened = true;
            };
            vm.currentMetric = 'FCL';
            vm.addMarketPriceItemObj = addMarketPriceItemObj;
            vm.addMarketPrice = addMarketPrice;
            vm.editProductItemPrice = editProductItemPrice;
            vm.updateMarketPrice = updateMarketPrice;
            vm.deleteMarketPrice = deleteMarketPrice;
            vm.onPriceMarketChange = onPriceMarketChange;
            vm.removeMarketPriceItemObj = removeMarketPriceItemObj;
            vm.currentValueChange = currentValueChange;
            vm.addNewProductItemPrice = addNewProductItemPrice;
            vm.cancel = cancel;
            vm.toggleDetailDisplay = toggleDetailDisplay;
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onPriceMarketSelectedChanged = onPriceMarketSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;
            vm.onPriceDateChange = onPriceDateChange;
        }

        function filterChanged(){
            vm.priceItemsToRemove = [];
            angular.forEach(vm.allPriceItems,function(priceItem,key){
                var removeTransaction = false;
                removeTransaction = removeTransaction || (vm.selectedProductID.indexOf(priceItem.productId)<=-1);
                removeTransaction = removeTransaction || (vm.selectedPriceMarketID.indexOf(priceItem.priceMarketId)<=-1);
                removeTransaction = removeTransaction || (vm.selectedCountry.indexOf(priceItem.productOriginName)<=-1);
                if(removeTransaction){
                    vm.priceItemsToRemove.push(priceItem.id);
                }
            });
        }

        function onPriceDateChange(){
            var priceTime = new Date(vm.marketPriceObj.priceTime);
            priceTime = priceTime.toUTCString();
            angular.forEach(vm.marketPriceObj.priceItems, function(val, key){
                val.shipmentMonths = [];
            });
            dropDownConfig.prepareShipmentMonthDropDown(vm.shipmentMonthConfig, vm.shipmentMonthOptions, priceTime);

        }

        function editProductItemPrice(row){
            vm.showForm=false;
            vm.marketPriceObj = row;
            vm.shipmentMonthConfig = {};
            vm.shipmentMonthOptions = {};
            dropDownConfig.prepareShipmentMonthDropDown(vm.shipmentMonthConfig, vm.shipmentMonthOptions, row.priceTime);
            vm.showForm=true;
        }

        function onProductsSelectedChanged(selectedList){
            vm.selectedProductID = _.map(selectedList, 'id');
            filterChanged();
        }

        function onCountrySelectedChanged(selectedList){
            vm.selectedCountry = _.map(selectedList, 'name');
            filterChanged();
        }

        function onPriceMarketSelectedChanged(selectedList){
            vm.selectedPriceMarketID = _.map(selectedList, 'id');
            filterChanged();
        }

        function onDateRangeChanged(dateRange){
            loaderModal.open();
            return pricing.getAllProductItemPrice(dateRange).then(function(res){
                loaderModal.close();
                vm.allPriceItems = res.data.allPrices;
            })
        }

        function toggleDetailDisplay(row){
            row.showDetails = !row.showDetails;
        }

        function addNewProductItemPrice(){
            vm.showForm = true;
        }

        function cancel(){
            vm.showForm = false;
            vm.marketPriceObj = pricing.getNewMarketPriceObj();
        }

        function currentValueChange(marketPriceObj, price, currentValue){
            if(currentValue){
                angular.forEach(marketPriceObj.priceItems, function(value, key){
                    value.currentValue = (price === value);
                });
            }
            else{
                price.currentValue=true;
                toastr.error('Must have one price item as current market value.')
            }
        }

        function addMarketPrice(form, marketPriceObj, addAnother){
            if(form.$valid){
                pricing.addProductItemPrice(marketPriceObj, function(res){
                   if(res.success){
                       if(!addAnother){
                           toastr.success(res.message);
                           onDateRangeChanged(vm.dateRange);
                           cancel();
                       }
                       else{
                           toastr.success(res.message);
                           vm.marketPriceObj = pricing.getNewMarketPriceObj();
                           utilities.resetFormValidation(form);
                       }

                   }
                });
            }
            else{
                toastr.error('Please enter missing fields.','Invalid Form')
            }
        }

        function updateMarketPrice(form, marketPriceObj){
            if(form.$valid){
                pricing.updateProductItemPrice(marketPriceObj, function(res){
                    if(res.success){
                        var item = _.find(vm.allPriceItems, function(priceItem){
                            return priceItem.id == res.obj.id;
                        });
                        var index = _.indexOf(vm.allPriceItems, item);
                        vm.allPriceItems[index] = res.obj;
                        cancel();
                        toastr.success(res.message);
                    }
                })
            }
            else{
                toastr.error('Please enter missing fields.','Invalid Form')
            }
        }

        function deleteMarketPrice(marketPriceObj){
            loaderModal.open();
            pricing.deleteProductItemPrice(marketPriceObj).then(function(res){
                if(res.success){
                    var deletedPriceItem = _.find(vm.allPriceItems, function(item){
                        return item.id = marketPriceObj.id
                    });
                    var index = _.indexOf(vm.allPriceItems, deletedPriceItem);
                    if (index !== -1){
                        vm.allPriceItems.splice(index,1);
                        toastr.success(res.message);
                    }
                }
                else{
                    toastr.error(res.message);
                }
                loaderModal.close();
            });

        }

        function addMarketPriceItemObj(marketPriceObj){
            marketPriceObj.priceItems.push(pricing.getNewMarketPriceItemObj())
        }

        function onPriceMarketChange(priceMarketValue){
            if(priceMarketValue){
                vm.marketItem = _.find(vm.priceMarketOptions.list, function(market){
                    return market.id == priceMarketValue;
                });
                vm.currentCurrency = vm.marketItem.currency;
            }
            else{
                vm.currentCurrency = 'USD';
            }
        }

        function removeMarketPriceItemObj(marketPriceObj, price){
            if(marketPriceObj.priceItems.length!==1){
                var index = _.findIndex(marketPriceObj.priceItems, price);
                marketPriceObj.priceItems.splice(index,1);
                if(marketPriceObj.priceItems.length==1){
                    marketPriceObj.priceItems[0].currentValue=true;
                }
            }
            else{
                toastr.error('Market Price must have atleast one price item.')
            }

        }
    }

})();
