(function () {
    'use strict';
    angular.module('app.dashboard.website')
        .controller('Website', website);

    function website($state, utilities, dashboard, authentication){
        var vm = this;
        _init();
        function _init() {
            vm.dashboardData = dashboard;
            vm.trafficChartData = [];
            vm.mapData = [];
            vm.trafficChartValues = ['newUsers', 'visits']
            vm.goToWebsiteBlogs = goToWebsiteBlogs;
            vm.connectGoogleAnalytics = connectGoogleAnalytics;
            if(vm.dashboardData.googleAnalyticsConnected) {
                vm.mapData = vm.dashboardData.data.trafficCountryChartData;
                vm.cardsTotalData = vm.dashboardData.data.cardsTotalData;
                vm.trafficChartData = utilities.prepareGraphData(vm.dashboardData.data.trafficChartData);
            }
        }

        function goToWebsiteBlogs(){
            $state.go('dashboard.websiteBlog');
        }

        function connectGoogleAnalytics(){
            authentication.authenticate('google', function(){
                $state.reload();
            });
        }


    }
})();