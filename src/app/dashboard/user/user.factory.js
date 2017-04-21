/**
 * @ngdoc service
 * @name app.dashboard.tradeBook.tradeBook
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.user')
        .factory('user', user);

    /* @ngInject */
    function user(Restangular, apiEndPoints, utilities){

        var userAPI = Restangular.all(apiEndPoints.user);

        return {
            getUserProfile: getUserProfile,
            getAllUserProfile: getAllUserProfile,
            addUserProfile: addUserProfile,
            updateUserProfile: updateUserProfile,
            addProfilePic: addProfilePic,
            updateProfilePic: updateProfilePic,
            deleteProfilePic: deleteProfilePic,
            getNewUserObj: getNewUserObj,
            changePassword: changePassword

        };

        function changePassword(passwordObj){
            return userAPI.customPOST(passwordObj, apiEndPoints.changePassword)
        }

        function getNewUserObj(){
            return {
                'profilePic': null,
                'username': '',
                'firstName': '',
                'lastName': '',
                'email': '',
                'designationId': null,
                'businessLocationId': null,
                'notify': {
                    'newTransaction': false,
                    'shipmentArrival': false,
                    'messages': false,
                    'monthlyReports': false,
                    'weeklyReports': false,
                    'dailyReports': false
                }
            }
        }

        function getUserProfile(id){
            return userAPI.customGET('',{
                'q': id
            })
        }

        function getAllUserProfile(){
            return userAPI.customGET('', {
                'q': 'all'
            })
        }

        function addProfilePic(imagesData, userId){
            var body = new FormData();
            var file = new File([imagesData.resultBlob], "profile.png");
            body.append('profile', file);
            return userAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPOST(
                body,
                userId+'/profilePic',
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function updateProfilePic(images, userId){
            var fd = new FormData();
            fd.append('file', images);
            return userAPI.customPUT(fd, userId+'/profilePic', {
                'Content-Type': undefined
            });
        }

        function deleteProfilePic(userId){
            return userAPI.customDELETE({}, userId+'/profilePic', {
                'Content-Type': undefined
            });
        }

        function updateUserProfile(updatedUser){
            return userAPI.customPUT({user:updatedUser}, '');
        }

        function addUserProfile(newUser){
            return userAPI.customPOST({user:newUser})
        }
    }

}());

