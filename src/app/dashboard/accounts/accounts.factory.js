(function() {

    'use strict';

    angular
        .module('app.dashboard.accounts')
        .factory('accounts', accounts);

    /* @ngInject */
    function accounts(Restangular, apiEndPoints, utilities) {

        var accountsAPI = Restangular.all(apiEndPoints.currencyExchange.main);

        return {
            getDashboardData: getDashboardData
        };

        function getDashboardData(){

        }


    }


})();