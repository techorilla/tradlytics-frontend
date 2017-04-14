(function () {
    'use strict';
    angular.module('app.dashboard.website')
        .controller('Website', website);

    function website($state, utilities, product){
        var vm = this;
        _init();
        function _init() {
            vm.goToWebsiteBlogs = goToWebsiteBlogs;
        }

        function goToWebsiteBlogs(){
            $state.go('dashboard.websiteBlog');
        }


    }
})();