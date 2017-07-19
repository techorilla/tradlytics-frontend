(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .factory('dashboard', dashboard);

    /* @ngInject */
    function dashboard(Restangular, apiEndPoints, utilities) {

        var dashboardAPI = Restangular.all(apiEndPoints.dashboard.main);
        var notificationAPI = Restangular.all(apiEndPoints.notification.main);

        return {
            getCompleteDashboardReport: getCompleteDashboardReport,
            refreshCurrentDollarRate: refreshCurrentDollarRate,
            searchQueryPageTop: searchQueryPageTop,
            getNotificationCount: getNotificationCount,
            getUnReadNotificationList: getUnReadNotificationList
        };

        function getNotificationCount(){
            return notificationAPI.customGET(apiEndPoints.notification.unreadCount);
        }

        function getUnReadNotificationList(markRead){
            return notificationAPI.customGET(apiEndPoints.notification.unreadList, {
                mark_as_read: markRead
            });
        }

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