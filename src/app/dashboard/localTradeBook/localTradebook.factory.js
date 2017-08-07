
(function() {

    'use strict';

    var paymentTerms = {
        ADVANCE: 'advance',
        PRODUCT_DELIVERY: 'product_delivery',
        ON_DATE: 'on_date'

    };

    angular
        .module('app.dashboard.localTradeBook')
        .constant('paymentTerms', paymentTerms)
        .factory('localTradeBook', localTradeBook);



    /* @ngInject */
    function localTradeBook(Restangular, apiEndPoints, utilities, paymentTerms){

        var localTradeAPI = Restangular.all(apiEndPoints.localTrade.main);
        var locatTradeListAPI = Restangular.all(apiEndPoints.localTrade.tradeList);
        var localTradeStatusAPI = Restangular.all(apiEndPoints.localTrade.tradeStatus);
        var localTradeDeliverySlipAPI = Restangular.all(apiEndPoints.localTrade.deliverySlip);
        var localTradeDashboardAPI = Restangular.all(apiEndPoints.localTrade.deliverySlip);


        return {
            getNewLocalTrade: getNewLocalTrade
        };

        function addLocalTrade(){

        }

        function updateLocalTrade(){

        }

        function getLocalTrade(){

        }

        function getNewLocalTrade(){
            return {
                date: null,
                buyerId: '',
                sellerId: '',
                productItemId: '',
                quantityFCL: 0,
                quantity: 0.00,
                price: 0.00,
                fileId: null,
                contractId: '',
                deliveryDueDate: null,
                internationalFileId: '',
                otherInfo: '',
                paymentDate: null,
                paymentTerms: paymentTerms.ADVANCE
            };
        }
    }


})();