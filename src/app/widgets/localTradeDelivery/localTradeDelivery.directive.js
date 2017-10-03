(function(){

    'use strict';

    angular
        .module('app.widgets')
        .directive('localTradeDelivery', LocalTradeDelivery);

    /* @ngInject */
    function LocalTradeDelivery($state, utilities, $filter, appConstants){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/localTradeDelivery/localTradeDelivery.html',
            scope: {
                colSize:'@',
                deliveryObj:'='
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