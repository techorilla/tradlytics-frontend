/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.localTradeBook')
        .controller('LocalTradeBookView', LocalTradeBookView);

    /* @ngInject */
    function LocalTradeBookView(localTrade, documentExporter, appFormats, appConstants, $state, $filter, loaderModal) {
        var vm = this;
        _init();

        function _init(){
            vm.transaction = localTrade;
            vm.appFormats = appFormats;
            vm.appConstants = appConstants;
            vm.addingDocument = false;
            vm.editTransactionDetails = editTransactionDetails;
            console.log('hello')


        }

        function editTransactionDetails(fileNo){
            $state.go('dashboard.localTransactionForm', {
                'id': fileNo
            });
        }
    }
})();

