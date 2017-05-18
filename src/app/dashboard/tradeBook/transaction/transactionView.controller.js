
(function() {

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TransactionView', transactionView);

    /* @ngInject */
    function transactionView(Upload, tradeBook, toastr, $stateParams){
        var vm = this;
        _init();

        function _init(){
            vm.transactionId = $stateParams.id;
            vm.showDocument = false;
            vm.documentAdding = false;
            vm.addingDocument = false;
            vm.newDocumentName = '';
            vm.addNewDocument = addNewDocument;
            vm.uploadTradeDocument = uploadTradeDocument;
            vm.cancelDocumentUpload = cancelDocumentUpload;
        }

        function uploadTradeDocument(file, errFiles){
            if(vm.newDocumentName === ''){
                toastr.error('Please enter document name', 'Error');
                return;
            }
        }

        function cancelDocumentUpload(){

        }

        function addNewDocument(){
            vm.addingDocument = true;
        }

    }


})();