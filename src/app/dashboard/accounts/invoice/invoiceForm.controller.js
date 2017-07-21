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
    function InvoiceForm($filter, utilities, accounts, $stateParams, $scope, $state, invoice, toastr) {
        var vm = this;
        _init();

        function _init(){
            vm.fileId = $stateParams.fileId;
            vm.invoiceId = $stateParams.invoiceId;
            vm.invoiceObj = invoice;
            vm.createInvoice = createInvoice;
            vm.updateInvoice = updateInvoice;
            vm.invoiceObj.invoiceAmount = calculateInvoiceTotal(vm.invoiceObj.invoiceItems);
            vm.convertToDecimal = convertToDecimal;
            vm.cancel = cancel;
            initializeWatcher();
        }

        function convertToDecimal(item){
            if(item.amount) {
                item.amount = $filter('number')(item.amount, 2);
            }
        }

        function cancel(fileId){
            $state.go('dashboard.transactionView', {'id': fileId});
        }

        function onSuccessInvoice(res){
            if(res.success){
                toastr.success(res.message);
                cancel(vm.fileId);
            }
        }

        function updateInvoice(fileId, invoiceObj){
            accounts.updateInvoice(fileId, invoiceObj, onSuccessInvoice)
        }

        function createInvoice(fileId, invoiceObj){
            accounts.createInvoice(fileId, invoiceObj, onSuccessInvoice)
        }

        function initializeWatcher(){
            $scope.$watch('vm.invoiceObj.invoiceItems', function(newVal, oldVal){
                vm.invoiceObj.invoiceAmount = calculateInvoiceTotal(newVal);
            }, true);

            $scope.$watch('vm.invoiceObj.currencyRate', function(newVal, oldVal){
                if(newVal){
                    var searchStr = vm.invoiceObj.currency+ ' ' + oldVal;
                    var replaceStr = vm.invoiceObj.currency+ ' ' + newVal;
                    angular.forEach(vm.invoiceObj.invoiceItems, function(val, key){
                        if(val.name.indexOf(searchStr) > -1){
                            val.name = val.name.replace(searchStr, replaceStr);
                            val.amount = utilities.evalMathExpressionInString(val.name);
                        }
                    })
                }

            })
        }

        function calculateInvoiceTotal(invoiceItems){
            var total = _.sumBy(invoiceItems, function(item){
                if(item.amount === ''){
                    return 0.00
                }
                return parseFloat(item.amount);
            });
            return total;
        }
    }
})();