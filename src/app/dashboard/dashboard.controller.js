(function () {
    'use strict';
    angular.module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard(completeReport, $state, baSidebarService) {
        var vm = this;
        _init();

        function _init(){
            vm.completeReport=completeReport;
            console.log(vm.completeReport.usdExchange.sevenDays);
            vm.refreshCurrentDollarRate = refreshCurrentDollarRate;
            vm.goToCurrencyDashboard = goToCurrencyDashboard;
            vm.invertSideBar = invertSideBar;
            prepareDashboard();
        }

        function prepareDashboard(){

        }

        function refreshCurrentDollarRate(){

        }

        function invertSideBar(collapse){
            console.log('hello');
            baSidebarService.setMenuCollapsed(collapse);
        }

        function goToCurrencyDashboard(currencyIn, currencyOut){
            $state.go('dashboard.currencyExchange.dashboard',  {'currencyIn': currencyIn, 'currencyOut': currencyOut});
        }
    }

})();
