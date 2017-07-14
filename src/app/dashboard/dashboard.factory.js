(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .factory('dashboard', dashboard);

    /* @ngInject */
    function dashboard(Restangular, apiEndPoints, utilities) {

        var dashboardAPI = Restangular.all(apiEndPoints.dashboard.main);

        return {
            getCompleteDashboardReport: getCompleteDashboardReport,
            refreshCurrentDollarRate: refreshCurrentDollarRate,
            searchQueryPageTop: searchQueryPageTop
        };

        function getCompleteDashboardReport(){
            return dashboardAPI.customGET('',{

            });
        }

        function searchQueryPageTop(queryObj){
            return dashboardAPI.customGET(apiEndPoints.dashboard.searchPageTop, queryObj);
        }

        function refreshCurrentDollarRate(){

        }
    }

})();