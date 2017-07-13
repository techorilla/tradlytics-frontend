(function() {

    'use strict';

    angular
        .module('app.widgets')
        .directive('tradeWashOutCard', tradeWashOutCard);

    /* @ngInject */
    function tradeWashOutCard($filter, tradeBook, toastr, appFormats, utilities, loaderModal) {
        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/tradeWashOutCard/tradeWashOutCard.template.html',
            scope: {
                trade:'='
            },
            replace: true
        };

        function link(scope){
            _init();

            function _init(){
                scope.appFormats = appFormats;
                if(!scope.trade.washOut){
                    scope.trade.washOut = getNewWashoutObj();
                }
                scope.getNewWashoutObj = getNewWashoutObj;
                scope.showWashOutForm = showWashOutForm;
                scope.saveWashOutDetails = saveWashOutDetails;
                scope.cancelWashingOut = cancelWashingOut;
            }


            function cancelWashingOut(){
                scope.showForm = false;
            }


            function getNewWashoutObj(){
                return {
                    'isWashout': false,
                    'initialCommissionPayable': true,
                    'washoutDate': null,
                    'washoutDueDate': null,
                    'buyerWashoutPrice': $filter('number')(scope.trade.commission.price, '2'),
                    'sellerWashoutPrice': $filter('number')(scope.trade.commission.price, '2'),
                    'brokerDifference': $filter('number')('0.00', '2')
                }
            }

            function showWashOutForm(action){
                // scope.washOutValue = (action==='add') ? scope.trade.commission.price : scope.trade.washOut.isWashOutAt;
                // scope.washOutValue = $filter('number')(scope.washOutValue, 2);
                scope.addMode = true;
                scope.showForm = true;
            }

            function saveWashOutDetails(washOutForm, trade, status, washOutValue, activate){
                if(washOutForm.$valid || !activate){
                    loaderModal.open();
                    tradeBook.changeWashoutStatus(trade.id, status, washOutValue).then(function(res){
                        if(res.success){
                            scope.trade = res.transactionObj;
                            toastr.success(res.message, 'Washout Status Changed');
                            scope.showForm = false;
                            if(!status){
                                scope.trade.washOut = getNewWashoutObj();
                            }
                        }
                        else{
                            toastr.error(res.message, 'Error!');
                        }
                        loaderModal.close();
                    })
                }
                else{
                    toastr.error('Please enter washout value', 'Error')
                }

            }
        }
    }

})();