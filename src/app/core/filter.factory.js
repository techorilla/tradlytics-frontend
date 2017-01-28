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
    function filter(Restangular, apiEndPoints){

        var tabFilterAPI = Restangular.all(apiEndPoints.tabFilters);
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

        function getTabFilters(type, subtype){
            return tabFilterAPI.customGET('list', {type:type, subType: subtype});
        }

    }

}());
