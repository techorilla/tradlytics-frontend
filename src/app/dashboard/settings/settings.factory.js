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
        
        var dropDownAPI = Restangular.all(apiEndPoints.dropDown.main);

        return {
            dropDownAPI: dropDownAPI,
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
            return dropDownAPI.customPOST({name:name}, endPoint)
        }

        function dropDownRead(endPoint, query, tabFilter){
            if(typeof query === 'object' ){
                return dropDownAPI.customGET(endPoint, query, {
                    tabFilter:tabFilter
                })
            }
            else{
                query = (query) ? query : 'all';
                return dropDownAPI.customGET(endPoint, {q: query, tabFilter:tabFilter})
            }
        }

        function dropDownDelete(endPoint, id){
            return dropDownAPI
        }

        function dropDownUpdate(endPoint, name, id){
            return dropDownAPI.customPUT({
                name: name,
                id: id
            }, endPoint);
        }
        
        

        
    }

}());

