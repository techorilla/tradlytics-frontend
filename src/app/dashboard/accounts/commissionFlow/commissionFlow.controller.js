/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.accounts')
        .controller('CommissionFlow', CommissionFlow);

    /* @ngInject */
    function CommissionFlow(appFormats, utilities, $filter, loaderModal, $stateParams, currencyExchange) {
        var vm = this;
        _init();

        function _init(){

        }
    }
})();