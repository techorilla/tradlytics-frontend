/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.localTradeBook')
        .controller('LocalTradeBook', LocalTradeBook);

    /* @ngInject */
    function LocalTradeBook(localTradeBook, documentExporter, appFormats, utilities, $filter, loaderModal) {
        var vm = this;
        _init();

        function _init(){
            vm.dateRange = utilities.initialDateRange(30);
            vm.allTransactions = [];
            vm.columnHeader = [];
            onDateRangeChanged(vm.dateRange, true);

        }

        function filterChanged(allTransactions, firstTime){

        }


        function onDateRangeChanged(dateRange, firstTime){
            loaderModal.open();
                localTradeBook.getTransactionList(dateRange, 'localTradeBook').then(function(res){
                if(res.success){
                    vm.allTransactions = res.transactions;
                    vm.columnHeader = res.columnHeader;
                    console.log(vm.allTransactions);
                    filterChanged(vm.allTransactions , firstTime);
                    loaderModal.close();
                }
            });
        }
    }
})();