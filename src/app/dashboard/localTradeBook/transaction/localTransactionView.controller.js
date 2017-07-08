/**
 * @ngdoc controller
 * @name app.dashboard.tradeBook.controller:tradeBook
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.localTradeBook')
        .controller('LocalTradeBookView', LocalTradeBookView);

    /* @ngInject */
    function LocalTradeBookView(tradeBook, documentExporter, appFormats, utilities, $filter, loaderModal) {
        var vm = this;
        _init();

        function _init(){

        }
    }
})();

