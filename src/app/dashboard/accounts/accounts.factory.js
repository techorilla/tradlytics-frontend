(function() {

    'use strict';

    angular
        .module('app.dashboard.accounts')
        .factory('accounts', accounts);

    /* @ngInject */
    function accounts(Restangular, apiEndPoints, utilities) {

        var accountsAPI = Restangular.all(apiEndPoints.accounts.main);

        return {
            getDashboardData: getDashboardData,
            getInvoiceObj: getInvoiceObj,
            createInvoice: createInvoice,
            updateInvoice: updateInvoice
        };

        function updateInvoice(fileId, invoiceObj){
            return accountsAPI.customPUT({
                'fileId':fileId,
                'invoiceObj': invoiceObj
            }, apiEndPoints.accounts.invoice);
        }

        function createInvoice(fileId, invoiceObj){
            return accountsAPI.customPOST({
                'fileId':fileId,
                'invoiceObj': invoiceObj
            }, apiEndPoints.accounts.invoice);

        }

        function getDashboardData(){

        }

        function getInvoiceObj(fileId, invoiceId){
            return accountsAPI.customGET(apiEndPoints.accounts.invoice, {
                'fileId': fileId,
                'invoiceId': invoiceId
            })
        }


    }


})();