(function(){

    'use strict';

    angular
        .module('app.widgets')
        .directive('localTradePayment', localTradePayment);

    /* @ngInject */
    function localTradePayment($state, utilities, $filter, appConstants){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/localTradePayment/localTradePayment.html',
            scope: {
                colSize:'@',
                paymentObj:'='
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){

            }
        }
    }

}());