
(function() {

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TradeList', tradeList);

    /* @ngInject */
    function tradeList(reportType, data, $filter) {
        var vm = this;
        init();
        function init(){
            vm.reportType = reportType;
            vm.transactions = data.transactions;
            vm.columnHeader = data.columnHeader;
            vm.onBuyersSelectedChanged = onBuyersSelectedChanged;
            vm.onSellersSelectedChanged = onSellersSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;

        }

        function filterChanged(allTransactions, firstTime){
            vm.tranToRemove = [];
            if(!firstTime){
                angular.forEach(allTransactions,function(transaction,key){
                    var removeTransaction = false;
                    removeTransaction = (vm.selectedBuyerID.indexOf(transaction.buyerId)<=-1);
                    removeTransaction = removeTransaction ||((vm.selectedSellerID.indexOf(transaction.sellerId))<=-1);
                    removeTransaction = removeTransaction || (vm.selectedProductID.indexOf(transaction.productItemId)<=-1);
                    // removeTransaction = removeTransaction || (vm.selectedTranStatus.indexOf(transaction.status)<=-1);
                    if(removeTransaction){
                        vm.tranToRemove.push(transaction.id);
                    }
                    vm.transactions = $filter('selectedRows')(allTransactions, vm.tranToRemove, 'id');
                });
            }
            else{
                vm.transactions = allTransactions;
            }
        }



        function onBuyersSelectedChanged(selectedList, initialized){
            vm.selectedBuyerID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.transactions);
            }

        }

        function onSellersSelectedChanged(selectedList, initialized){
            vm.selectedSellerID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.transactions);
            }
        }

        function onProductsSelectedChanged(selectedList, initialized){
            vm.selectedProductID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged(vm.transactions);
            }
        }
    }
})();