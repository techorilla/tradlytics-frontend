(function() {

    'use strict';

    angular
        .module('app.dashboard.currencyExchange')
        .factory('currencyExchange', currencyExchange);

    /* @ngInject */
    function currencyExchange(Restangular, apiEndPoints, utilities) {

        var currencyExchangeAPI = Restangular.all(apiEndPoints.currencyExchange.main);

        return {
            getDashboardData: getDashboardData
        };

        function getDashboardData(dateRange, currencyIn, currencyOut){

            return currencyExchangeAPI.customPOST(angular.merge(dateRange, {
                'currencyIn': currencyIn,
                'currencyOut': currencyOut
            }),apiEndPoints.currencyExchange.dashboard);
        }
    }


})();