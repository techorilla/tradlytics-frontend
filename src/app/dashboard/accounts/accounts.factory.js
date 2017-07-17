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
            getInvoiceObj: getInvoiceObj
        };

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