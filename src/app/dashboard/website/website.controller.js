(function () {
    'use strict';
    angular.module('app.dashboard.website')
        .controller('Website', website);

    function website($state, utilities, dashboard, authentication){
        var vm = this;
        _init();
        function _init() {
            vm.dashboardData = dashboard;
            vm.goToWebsiteBlogs = goToWebsiteBlogs;
            vm.connectGoogleAnalytics = connectGoogleAnalytics;

        }

        function goToWebsiteBlogs(){
            $state.go('dashboard.websiteBlog');
        }

        function connectGoogleAnalytics(){
            authentication.authenticate('google', function(){
                vm.dashboardData.googleAnalyticsConnected = true;
            });
        }


    }
})();