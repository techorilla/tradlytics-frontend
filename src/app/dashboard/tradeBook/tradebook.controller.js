/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TradeBook', tradeBook);

    /* @ngInject */
    function tradeBook(tradeBook,documentExporter, appFormats, utilities, $filter, loaderModal, pageType){
        var vm = this;
        init();
        /////////////////////
        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.dashboard.tradeBook.controller:tradeBook
         * @description
         * My Description rules
         */
        function init(){
            vm.currentPage = 1;
            vm.itemsPerPage = 10;
            vm.searchTransaction = '';
            vm.dateRange = utilities.initialDateRange(30);
            vm.appFormats = appFormats;
            vm.columnHeader = [];
            vm.dateFilter = [];
            vm.selectedBuyerID = [];
            vm.selectedSellerID = [];
            vm.selectedProductID = [];
            vm.selectedCountries = [];
            vm.selectedTranStatus = [];
            vm.allTransactions = [];
            vm.allTransactionsList = [];
            vm.pageType = pageType;
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.onBuyersSelectedChanged = onBuyersSelectedChanged;
            vm.onSellersSelectedChanged = onSellersSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onTranStatusSelectedChanged = onTranStatusSelectedChanged;
            vm.filterChanged = filterChanged;
            onDateRangeChanged(vm.dateRange, true);

            vm.headingclass = ['dateColumn','fileId','dropDownCol2','dropDownCol2','','','dropDownCol2','','dateColumn2','dateColumn',''];


            vm.headerAnchor = [
                {
                    text: 'Add new Transaction',
                    state: 'shell.tradeBook.Transaction({tran:"new"})'
                }
            ];

        }



        function onDateRangeChanged(dateRange, firstTime){
            loaderModal.open();
            tradeBook.getTransactionList(dateRange, 'tradeBook').then(function(res){
                if(res.success){
                    vm.allTransactions = res.transactions;
                    vm.columnHeader = res.columnHeader;
                    filterChanged(vm.allTransactions , firstTime);
                    loaderModal.close();
                }
            });
        }

        function filterChanged(allTransactions, firstTime){
            vm.tranToRemove = [];
            if(!firstTime){
                angular.forEach(allTransactions,function(transaction,key){
                    var removeTransaction = false;
                    removeTransaction = (vm.selectedBuyerID.indexOf(transaction.buyerId)<=-1);
                    removeTransaction = removeTransaction ||((vm.selectedSellerID.indexOf(transaction.sellerId))<=-1);
                    removeTransaction = removeTransaction || (vm.selectedProductID.indexOf(transaction.productItemId)<=-1);
                    removeTransaction = removeTransaction || (vm.selectedTranStatus.indexOf(transaction.status)<=-1);
                    console.log(transaction.status)
                    if(removeTransaction){
                        vm.tranToRemove.push(transaction.id);
                    }
                    vm.allTransactionsList = $filter('selectedRows')(allTransactions, vm.tranToRemove, 'id');
                });
            }
            else{
                vm.allTransactionsList = allTransactions;
            }
        }



        function onBuyersSelectedChanged(selectedList, initialized){
            vm.selectedBuyerID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.allTransactions);
            }

        }

        function onSellersSelectedChanged(selectedList, initialized){
            vm.selectedSellerID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.allTransactions);
            }
        }

        function onProductsSelectedChanged(selectedList, initialized){
            vm.selectedProductID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.allTransactions);
            }
        }

        function onTranStatusSelectedChanged(selectedList, initialized){
            vm.selectedTranStatus = _.map(selectedList, 'name');
            if(!initialized){
                filterChanged(vm.allTransactions);
            }


        }

    }

}());
