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
    function LocalTradeBookView(localTrade, documentExporter, appFormats, appConstants, $state, deModal, loaderModal) {
        var vm = this;
        _init();

        function _init(){
            vm.transaction = localTrade;
            vm.appFormats = appFormats;
            vm.appConstants = appConstants;
            vm.addingDocument = false;
            vm.editTransactionDetails = editTransactionDetails;
            vm.changeCompleteStatus = changeCompleteStatus;
            vm.addLocalPayment = addLocalPayment;


        }

        function changeCompleteStatus(completeObj, transactionId){
            deModal.openTransactionCompleteModel(completeObj, transactionId, function(completeObj){
                loaderModal.open();
                tradeBook.changeCompleteStatus(transactionId, completeObj).then(function(res){
                    if(res.success){
                        vm.transaction = res.transactionObj;
                        toastr.success(res.message)
                    }
                    else{
                        toastr.error(res.message);
                    }
                    loaderModal.close();
                });

            });

        }


        function addLocalPayment(fileNo){
            deModal.openLocalTransactionPaymentModal(fileNo)
        }

        function editTransactionDetails(fileNo){
            $state.go('dashboard.localTransactionForm', {
                'id': fileNo
            });
        }
    }
})();

