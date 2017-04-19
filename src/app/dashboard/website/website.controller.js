(function () {
    'use strict';
    angular.module('app.dashboard.website')
        .controller('Website', website);

    function website($state, utilities, product, authentication){
        var vm = this;
        _init();
        function _init() {
            vm.goToWebsiteBlogs = goToWebsiteBlogs;
            vm.connectGoogleAnalytics = connectGoogleAnalytics;
        }

        function goToWebsiteBlogs(){
            $state.go('dashboard.websiteBlog');
        }

        function connectGoogleAnalytics(){
            authentication.authenticate('google');
        }


    }
})();