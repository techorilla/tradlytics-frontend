(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .factory('dashboard', dashboard);

    /* @ngInject */
    function dashboard(Restangular, apiEndPoints, utilities) {

        var dashboardAPI = Restangular.all(apiEndPoints.dashboard);

        return {
            getCompleteDashboardReport: getCompleteDashboardReport,
            refreshCurrentDollarRate: refreshCurrentDollarRate
        };

        function getCompleteDashboardReport(){
            return dashboardAPI.customGET('');
        }

        function refreshCurrentDollarRate(){

        }
    }

})();