(function(){

    'use strict';

    angular
        .module('app.dashboard.pricing')
        .factory('manifest', manifest);

    /* @ngInject */
    function manifest(Restangular, apiEndPoints, utilities){

        var manifestAPI = Restangular.all(apiEndPoints.manifest);
        var manifestDashboardAPI = Restangular.all(apiEndPoints.manifestDashboard);

        return {
            getNewManifestItemObj: getNewManifestItemObj,
            addManifestItem: addManifestItem,
            updateManifestItem: updateManifestItem,
            deleteManifestItem: deleteManifestItem,
            getAllManifestItems: getAllManifestItems,
            getManifestDashboardReport: getManifestDashboardReport
        };

        function getNewManifestItemObj(date){
            return {
                'date': (date) ? date : new Date(),
                'buyerId': null,
                'sellerId': null,
                'productId': null,
                'quantity': null,
                'quantityMetricId': 'FCL',
                'containerNo': null,
                'comments': null
            }
        }

        function getManifestDashboardReport(dateRange, selectedBuyer, selectedSeller, selectedProduct){
            var dateRangeCopy = angular.copy(dateRange);
            // dateRangeCopy.startDate = dateRangeCopy.startDate.addTimeZoneOffset();
            // dateRangeCopy.endDate = dateRangeCopy.endDate.addTimeZoneOffset();
            var postData = dateRangeCopy;
            postData = angular.extend({
                'selectedBuyer': selectedBuyer.join(),
                'selectedSeller': selectedSeller.join(),
                'selectedProduct': selectedProduct.join()
            }, postData);
            return manifestDashboardAPI.customPOST(postData);
        }

        function deleteManifestItem(manifestId){
            return manifestAPI.customDELETE(manifestId)
        }

        function getAllManifestItems(dataRange){
            return manifestAPI.get('', dataRange)
        }

        function updateManifestItem(manifestItem){
            return manifestAPI.customPUT({'manifestItem': manifestItem});
        }

        function addManifestItem(manifestItem){
            return manifestAPI.customPOST({'manifestItem': manifestItem});
        }

    }

}());
