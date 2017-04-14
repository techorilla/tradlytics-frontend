/**
 * @ngdoc service
 * @name app.dashboard.tradeBook.tradeBook
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.settings')
        .factory('settings', settings);

    /* @ngInject */
    function settings(Restangular, apiEndPoints, utilities){
        
        var tranStatusAPI = Restangular.all(apiEndPoints.dropDown.main);

        return {
            dropDown: utilities.setupCRUD(
                dropDownCreate,
                dropDownRead,
                dropDownUpdate,
                dropDownDelete
            )
        };

        function dropDownCreate(endPoint, name){
            return tranStatusAPI.customPOST({name:name}, endPoint)
        }

        function dropDownRead(endPoint, query){
            if(typeof query === 'object' ){
                return tranStatusAPI.customGET(endPoint, query)
            }
            else{
                query = (query) ? query : 'all';
                return tranStatusAPI.customGET(endPoint, {q: query})
            }
        }

        function dropDownDelete(endPoint, id){
            return tranStatusAPI
        }

        function dropDownUpdate(endPoint, name, id){
            return tranStatusAPI
        }
        
        

        
    }

}());

