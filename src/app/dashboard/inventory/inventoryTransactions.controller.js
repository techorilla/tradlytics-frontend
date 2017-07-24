/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.inventory')
        .controller('InventoryTransactions', InventoryTransaction);

    /* @ngInject */
    function InventoryTransaction(appFormats, utilities, $filter, loaderModal, $state) {
        var vm = this;
        _init();

        function _init(){
        }

    }
})();