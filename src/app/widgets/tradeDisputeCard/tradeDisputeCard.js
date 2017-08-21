(function() {

    'use strict';

    angular
        .module('app.widgets')
        .directive('tradeDisputeCard', tradeDisputeCard);

    /* @ngInject */
    function tradeDisputeCard($filter, tradeBook, toastr, appFormats, utilities, loaderModal) {
        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/tradeDisputeCard/tradeDisputeCard.template.html',
            scope: {
                trade:'='
            },
            replace: true
        };

        function link(scope){
            _init();

            function _init(){
                scope.appFormats = appFormats;
                if(!scope.trade.dispute){
                    scope.trade.dispute = getNewDisputeObj();
                }
                scope.getNewDisputeObj = getNewDisputeObj;
                scope.showDisputeForm = showDisputeForm;
                scope.saveDisputeDetails = saveDisputeDetails;
                scope.cancelDisputingTrade = cancelDisputingTrade;
            }


            function cancelDisputingTrade(){
                scope.showForm = false;
                scope.trade.dispute = scope.disputeCopy;
            }


            function getNewDisputeObj(){
                return {
                    'isDisputed': false,
                    'qualityComplain': false,
                    'weightShortage': false,
                    'other': false,
                    'disputeResolved': false,
                    'disputeResolvedDate': null,
                    'details': '',
                    'disputeDate': null
                }
            }

            function showDisputeForm(action){
                // scope.washOutValue = (action==='add') ? scope.trade.commission.price : scope.trade.washOut.isWashOutAt;
                // scope.washOutValue = $filter('number')(scope.washOutValue, 2);
                scope.addMode = true;
                scope.showForm = true;
                scope.disputeCopy = angular.copy(scope.trade.dispute);
            }

            function saveDisputeDetails(disputeForm, trade, activate){
                if(disputeForm.$valid){
                    tradeBook.saveDisputeData(trade.dispute, trade.basic.fileNo, activate).then(function(res){
                        if(res.success){
                            scope.trade = res.transactionObj;
                            toastr.success(res.message);
                            scope.showForm = false;
                        }
                    })
                }
                else{
                    toastr.error('Please enter missing fields');
                }
            }
        }
    }

})();