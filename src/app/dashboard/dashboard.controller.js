(function () {
    'use strict';
    angular.module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard(completeReport) {
        var vm = this;
        _init();

        function _init(){
            vm.completeReport=completeReport;
            console.log(vm.completeReport.usdExchange.sevenDays);
            prepareDashboard();
        }

        function prepareDashboard(){

        }
    }

})();
