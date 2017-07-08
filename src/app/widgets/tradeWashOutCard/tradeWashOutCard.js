(function() {

    'use strict';

    angular
        .module('app.widgets')
        .directive('tradeWashOutCard', tradeWashOutCard);

    /* @ngInject */
    function tradeWashOutCard($filter, tradeBook, toastr, appFormats, utilities) {
        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/tradeWashOutCard/tradeWashOutCard.template.html',
            scope: {
                trade:'=',
                washOut: '='
            },
            replace: true
        };

        function link(scope){
            scope.showWashOutForm = showWashOutForm;
            scope.saveWashOutDetails = saveWashOutDetails;
            scope.showForm = false;



            scope.cancelWashingOut = cancelWashingOut;

            function cancelWashingOut(){
                scope.showForm = false;
            }

            function showWashOutForm(action){
                scope.washOutValue = (action==='add') ? scope.trade.commission.price : scope.trade.washOut.isWashOutAt;
                scope.washOutValue = $filter('number')(scope.washOutValue, 2);
                scope.addMode = true;
                scope.showForm = true;
            }

            function saveWashOutDetails(washOutForm, trade, status, washOutValue, activate){
                if(washOutForm.$valid || !activate){
                    tradeBook.changeWashoutStatus(trade.id, status, washOutValue).then(function(res){
                        if(res.success){
                            scope.trade = res.transactionObj;
                            toastr.success(res.message, 'Washout Status Changed');
                            scope.showForm = false;
                        }
                        else{
                            toastr.error(res.message, 'Error!');
                        }
                    })
                }
                else{
                    toastr.error('Please enter washout value', 'Error')
                }

            }
        }
    }

})();