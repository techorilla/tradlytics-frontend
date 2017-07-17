/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.accounts')
        .controller('InvoiceForm', InvoiceForm);

    /* @ngInject */
    function InvoiceForm(appFormats, utilities, $filter, loaderModal, $stateParams, editableOptions, invoice) {
        var vm = this;
        _init();

        function _init(){
            vm.invoiceObj = invoice;
            console.log(vm.invoiceObj)
        }
    }
})();