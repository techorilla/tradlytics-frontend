(function() {

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TradeBusinessAnalytics', TradeBusinessAnalytics);


    /* @ngInject */
    function TradeBusinessAnalytics(baConfig, tradeBook, $filter, appFormats, utilities){
        var vm = this;
        init();

        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.dashboard.controller:Dashboard
         * @description
         * My Description rules
         */
        function init(){
            vm.dateRange = utilities.initialDateRange(30);
            vm.timeDrillBy = 'day';
            vm.productSalesAnalytics = [];
            vm.allTransactions = [];
            vm.totalVolume = 0;
            vm.totalQuantity = 0;
            vm.totalNetCommission = 0;
            vm.selectedBuyerID = [];
            vm.selectedSellerID = [];
            vm.selectedProductID = [];
            vm.selectedCountries = [];
            vm.selectedTranStatus = [];
            vm.dateLabels = [];
            vm.timeDrillOptions = {};
            vm.timeDrillConfig = {};
            vm.getTransactionAnalytics = getTransactionAnalytics;
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.showTradeBarCharts = true;
            vm.showPie = true;
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.onBuyersSelectedChanged = onBuyersSelectedChanged;
            vm.onSellersSelectedChanged = onSellersSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;
            vm.onTranStatusSelectedChanged = onTranStatusSelectedChanged;

            vm.seriesBarCharts = ['Quantity (MT)','Volume ($)','Net Commission ($)'];
            vm.dataBarChars = undefined;
            vm.timeDrillChanged = timeDrillChanged;
            vm.onDateRangeChanged(vm.dateRange);
            vm.sellerList = [];
            vm.buyerList = [];
            vm.curBuyer = 0;
            vm.curSeller = 0;
            vm.nextBusinessPartner = nextBusinessPartner;
            vm.preBusinessPartner = preBusinessPartner;

        }


        function nextBusinessPartner(type, bpList){
            if((bpList.length-1) !== (vm['cur'+type])){
                vm['cur'+type] += 1;
            }
        }

        function preBusinessPartner(type){
            if(vm['cur'+type]!==0){
                vm['cur'+type] -= 1;
            }
        }


        function onDateRangeChanged(dateRange){
            // vm.getProductSalesAnalytics(dateRange);
            vm.getTransactionAnalytics(dateRange);
        }

        // function getProductSalesAnalytics(dateRange){
        //     var startDate = new Date(dateRange.startDate);
        //     var endDate = new Date(dateRange.endDate);
        //     product.productSalesAnalytics(startDate,endDate).then(function(res){
        //         vm.productSalesAnalytics = res.data.productSalesAnalytics;
        //         vm.productsVolume = _.map(vm.productSalesAnalytics,'volume');
        //         vm.productsQuantity = _.map(vm.productSalesAnalytics,'quantity');
        //         vm.productsNetCommission = _.map(vm.productSalesAnalytics,'netCommission');
        //         vm.products = _.map(vm.productSalesAnalytics,'productName');
        //     });
        // }



        function getTransactionAnalytics(dateRange){
            tradeBook.getTradeBusinessAnalytics(dateRange).then(function(res){
                vm.allTransactions = res.data.transactions;
                filterChanged();
            });

        }



        function timeDrillChanged(timeDrill,allTransactions){
            if(allTransactions.length!==0){
                vm.showTradeBarCharts = false;
                var minDate = _.minBy(allTransactions,'transactionDate').transactionDate;
                var maxDate = _.maxBy(allTransactions,'transactionDate').transactionDate;
                if(timeDrill === 'day'){
                    vm.dateLabels = navigation.getDateRangeArray(minDate,maxDate);
                    vm.dataBarChars = [[],[],[]];
                    angular.forEach(vm.dateLabels,function(date,key){
                        vm.dateLabels[key] = $filter('date')(date, appFormats.Date);
                        var tranInDate = _.filter(allTransactions,function(tran){
                            return vm.dateLabels[key] === $filter('date')(tran.transactionDate, appFormats.Date);
                        });
                        analytics.getBarChartValuesOnTimeDrillChanged(vm.dataBarChars,tranInDate);



                    });
                }
                if(timeDrill === 'year'){
                    vm.dateLabels = navigation.getYearsInDateRange(minDate,maxDate);
                    vm.dataBarChars = [[],[],[]];
                    angular.forEach(vm.dateLabels,function(year,key){
                        var tranInDate = _.filter(allTransactions,function(tran){
                            return year === ((new Date(tran.transactionDate)).getFullYear());
                        });
                        analytics.getBarChartValuesOnTimeDrillChanged(vm.dataBarChars,tranInDate);

                    });

                }
                if(timeDrill === 'month'){
                    vm.dateLabels = navigation.getMonthsInDateRange(minDate,maxDate);
                    vm.dataBarChars = [[],[],[]];
                    angular.forEach(vm.dateLabels,function(month,key){
                        if(key <= vm.dateLabels.length-2){
                            var sMonth = new Date(month);
                            var eMonth = new Date(vm.dateLabels[parseInt(key)+1]);
                            var tranInDate = _.filter(allTransactions,function(tran){
                                var tranDate = new Date(tran.transactionDate);
                                return ((tranDate >= sMonth) && (tranDate < eMonth));
                            });
                            vm.dateLabels[key] = navigation.getMonthTitle(sMonth);
                            analytics.getBarChartValuesOnTimeDrillChanged(vm.dataBarChars,tranInDate);
                        }

                    });
                    vm.dateLabels.splice(vm.dateLabels.length-1,1);
                }
                if(timeDrill === 'week'){
                    vm.dateLabels = navigation.getWeeksInDateRange(minDate,maxDate);
                    vm.dataBarChars = [[],[],[]];
                    angular.forEach(vm.dateLabels,function(week,key){
                        if(key <= vm.dateLabels.length-2){
                            var sWeek = new Date(week);
                            var eWeek = new Date(vm.dateLabels[parseInt(key)+1]);
                            var tranInDate = _.filter(allTransactions,function(tran){
                                var tranDate = new Date(tran.transactionDate);
                                tranDate = new Date( tranDate.getFullYear()+'-'+(tranDate.getMonth()+1)+'-'+tranDate.getDate());
                                return ((tranDate >= sWeek) && (tranDate <= eWeek));
                            });
                            vm.dateLabels[key] = navigation.getWeekTitle(sWeek,eWeek);
                            analytics.getBarChartValuesOnTimeDrillChanged(vm.dataBarChars,tranInDate);
                        }

                    });
                    vm.dateLabels.splice(vm.dateLabels.length-1,1);

                }

                vm.showTradeBarCharts = true;
            }
            else{
                vm.showTradeBarCharts = false;
            }
        }



        function filterChanged(){
            vm.tranToRemove = [];
            angular.forEach(vm.allTransactions,function(transaction,key){
                var removeTransaction = false;
                removeTransaction = (vm.selectedBuyerID.indexOf(transaction.tr_bpBuyerID)<=-1);
                removeTransaction = removeTransaction ||((vm.selectedSellerID.indexOf(transaction.tr_bpSellerID))<=-1);
                removeTransaction = removeTransaction || (vm.selectedProductID.indexOf(transaction.tr_productID)<=-1);
                removeTransaction = removeTransaction || (vm.selectedCountries.indexOf(transaction.origin)<=-1);
                if(removeTransaction){
                    vm.tranToRemove.push(transaction.tr_transactionID);
                }
            });
            var filteredData = $filter('selectedRows')(vm.allTransactions,vm.tranToRemove,'tr_transactionID');
            calculateAnalytics(filteredData);
            timeDrillChanged(vm.timeDrillBy,filteredData);
        }

        function calculateAnalytics(filteredData){
            var groupByBuyer = (_.groupBy(filteredData,'tr_bpBuyerID'));
            groupByBuyer =  _.orderBy(groupByBuyer, ['length'], ['desc']);
            var groupBySeller = (_.groupBy(filteredData,'tr_bpSellerID'));
            groupBySeller =  _.orderBy(groupBySeller, ['length'], ['desc']);
            var buyerList = [];
            for(var buyer in groupByBuyer){
                var buyerDetails = {};
                buyerDetails['transactions'] = groupByBuyer[buyer].length;
                buyerDetails['bp_buyer_id'] = groupByBuyer[buyer][0]['tr_bpBuyerID'];
                buyerDetails['name'] = groupByBuyer[buyer][0]['buyer'];
                buyerDetails['quantity'] = 0;
                buyerDetails['volume'] = 0;
                buyerDetails['commission'] = 0;
                for(var tran in  groupByBuyer[buyer]){
                    buyerDetails['quantity'] += groupByBuyer[buyer][tran]['quantity'];
                    var comm = 0;
                    if(groupByBuyer[buyer][tran]['commission'] !== 'Not Entered'){
                        comm = parseInt((groupByBuyer[buyer][tran]['commission']).replace('$',''));
                    }
                    buyerDetails['volume'] += groupByBuyer[buyer][tran]['quantity'] * groupByBuyer[buyer][tran]['rate'];
                    buyerDetails['commission'] += comm;
                }
                buyerList.push(buyerDetails)
            }
            var sellerList = [];
            for(var seller in groupBySeller){
                var sellerDetails = {};
                sellerDetails['transactions'] = groupBySeller[seller].length;
                sellerDetails['bp_seller_id'] = groupBySeller[seller][0]['tr_bpSellerID'];
                sellerDetails['name'] = groupBySeller[seller][0]['seller'];
                sellerDetails['quantity'] = 0;
                sellerDetails['volume'] = 0;
                sellerDetails['commission'] = 0;
                for(var tran in groupBySeller[seller]){
                    sellerDetails['quantity'] += groupBySeller[seller][tran]['quantity'];
                    var comm = 0;
                    if(groupBySeller[seller][tran]['commission'] !== 'Not Entered'){
                        comm = parseInt((groupBySeller[seller][tran]['commission']).replace('$',''));
                    }
                    sellerDetails['volume'] += groupBySeller[seller][tran]['quantity']*groupBySeller[seller][tran]['rate'];
                    sellerDetails['commission'] += comm;
                }
                sellerList.push(sellerDetails)
            }
            vm.sellerList = _.orderBy(sellerList, ['commission'], ['desc']);
            vm.buyerList = _.orderBy(buyerList, ['commission'], ['desc']);
            vm.curBuyer = 0;
            vm.curSeller = 0;
            vm.totalVolume = _.sumBy(filteredData, function(tran) {
                return (tran.quantity * tran.rate);
            });
            vm.totalQuantity = _.sumBy(filteredData, function(tran) {
                return (tran.quantity);
            });
            vm.totalNetCommission = _.sumBy(filteredData, function(tran) {
                if(tran.commission === 'Not Entered'){
                    return 0;
                }
                else{
                    tran.commission = tran.commission.replace('$','');
                    return (parseInt(tran.commission));
                }
            });
        }

        function onBuyersSelectedChanged(selectedList){
            vm.selectedBuyerID = _.map(selectedList, 'bp_ID');
            filterChanged();
        }

        function onSellersSelectedChanged(selectedList){
            vm.selectedSellerID = _.map(selectedList, 'bp_ID');
            filterChanged();
        }

        function onProductsSelectedChanged(selectedList){
            vm.selectedProductID = _.map(selectedList, 'id');
            filterChanged();
        }

        function onCountrySelectedChanged(selectedList) {
            vm.selectedCountries = _.map(selectedList, 'origin_name');
            filterChanged();
        }

        function onTranStatusSelectedChanged(selectedList){
            vm.selectedTranStatus = _.map(selectedList, 'text');
            filterChanged();
        }

    }

})();