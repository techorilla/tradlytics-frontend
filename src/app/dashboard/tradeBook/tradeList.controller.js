
(function() {

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TradeList', tradeList);

    /* @ngInject */
    function tradeList(reportType, data) {
        var vm = this;
        init();
        function init(){
            vm.reportType = reportType;
            vm.transactions = data.transactions;
            vm.columnHeader = data.columnHeader;
        }
    }
})();