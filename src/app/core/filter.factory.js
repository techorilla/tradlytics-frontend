    /**
 * @ngdoc service
 * @name app.common.filter
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.core')
        .factory('tabFilter', filter);

    /* @ngInject */
    function filter(Restangular, apiEndPoints, settings, crud){

        var tabFilterAPI = Restangular.all(apiEndPoints.dropDown.main);
        return {
            getTabFilters: getTabFilters
        };

        ////////////////////

        /**
         * @ngdoc
         * @name app.common.filter#testFunction
         * @methodOf app.common.filter
         *
         * @description < description placeholder >
         * @example
         * <pre>
         * filter.testFunction(id);
         * </pre>
         * @param {int} entity id
         */

        function getTabFilters(endPoint, params){
            return settings.dropDown[crud.READ](endPoint, params, true);
        }

    }

}());
