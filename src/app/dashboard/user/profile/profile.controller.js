/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('app.dashboard.user')
        .controller('ProfilePage', ProfilePage);

    /** @ngInject */
    function ProfilePage(fileReader, authentication, $filter, deModal, userProfile, dropDownConfig, toastr, $scope, user) {
        var vm = this;
        _init();

        function _init(){
            vm.locationConfig = {};
            vm.locationOptions = {};
            vm.designationOptions = {};
            vm.designationConfig = {};
            vm.userProfile = userProfile;
            vm.imagesData = null;
            vm.userData = authentication.getUserData();
            console.log(vm.userData);
            vm.picture = $filter('profilePicture')(userProfile.profilePic);
            vm.updateUser = updateUser;
            vm.removePicture = removePicture;
            vm.uploadPicture = uploadPicture;
            vm.getFile = getFile;
            dropDownConfig.prepareBusinessLocationsDropDown(vm.locationConfig, vm.locationOptions);
            dropDownConfig.prepareDesignationDropDown(vm.designationConfig, vm.designationOptions);
        }

        function removePicture() {
            vm.noPicture = true;
            userProfile.profilePic = null;
            vm.picture = $filter('profilePicture')(userProfile.profilePic);
        }

        function uploadPicture() {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();
        }

        function updateUser(userObj, images){
            user.updateUserProfile(userObj, images).then(function(response){
                if(!vm.noPicture){
                    user.addProfilePic(images, response.user_id).then(function(picResp){
                        if(vm.userData.data.id === response.user_id){
                            authentication.getUserData(true);
                        }
                        toastr.success(response.message,'Success')
                    });
                }
                else{
                    toastr.success(response.message,'Success')
                }
            });
        }

        function getFile(picture){
            fileReader.readAsDataUrl(picture, $scope)
                .then(function (result) {
                    deModal.openImageCropper(result, 1, [{w:100, h:100}, {w: 200,h: 200}], {width:100, height:100},
                        function(imagesData){
                            vm.picture = imagesData.croppedImages[1].dataURI;
                            vm.imagesData = imagesData;
                        });
                    // vm.picture = result;
                });
        }


    }

})();
