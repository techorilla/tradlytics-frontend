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
            getChangePasswordObj: getChangePasswordObj,
            dropDown: utilities.setupCRUD(
                dropDownCreate,
                dropDownRead,
                dropDownUpdate,
                dropDownDelete
            )
        };

        function getChangePasswordObj(){
            return {
                'confirmPassword': '',
                'oldPassword': '',
                'newPassword': ''
            }
        }

        function dropDownCreate(endPoint, name){
            return tranStatusAPI.customPOST({name:name}, endPoint)
        }

        function dropDownRead(endPoint, query, tabFilter){
            if(typeof query === 'object' ){
                return tranStatusAPI.customGET(endPoint, query, {
                    tabFilter:tabFilter,
                })
            }
            else{
                query = (query) ? query : 'all';
                return tranStatusAPI.customGET(endPoint, {q: query, tabFilter:tabFilter})
            }
        }

        function dropDownDelete(endPoint, id){
            return tranStatusAPI
        }

        function dropDownUpdate(endPoint, name, id){
            return tranStatusAPI.customPUT({
                name: name,
                id: id
            }, endPoint);
        }
        
        

        
    }

}());

