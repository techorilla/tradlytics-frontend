/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('app.dashboard.user')
        .controller('ProfilePage', ProfilePage);

    /** @ngInject */
    function ProfilePage(fileReader, authentication, $filter, deModal, userProfile,
                         utilities, dropDownConfig, toastr, $scope, user, $state) {
        var vm = this;
        _init();

        function _init(){
            vm.locationConfig = {};
            vm.locationOptions = {};
            vm.designationOptions = {};
            vm.designationConfig = {};
            vm.userProfile = userProfile;
            vm.cancel = cancel;
            vm.imagesData = null;
            vm.userData = authentication.getUserData();
            vm.picture = $filter('profilePicture')(userProfile.profilePic);
            vm.updateUser = updateUser;
            vm.addUser = addUser;
            vm.removePicture = removePicture;
            vm.uploadPicture = uploadPicture;
            vm.getFile = getFile;
            dropDownConfig.prepareBusinessLocationsDropDown(vm.locationConfig, vm.locationOptions);
            dropDownConfig.prepareDesignationDropDown(vm.designationConfig, vm.designationOptions);
        }

        function cancel(){
            try {
                $state.go($state.current.prevState, $state.current.prevParam);
            }
            catch(err) {
                $state.go('dashboard.main');
            }

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

        function addUser(form, userObj, images){
            if(form.$valid){
                user.addUserProfile(userObj, images).then(function(response){
                    if(response.success){
                        if(!vm.noPicture){
                            user.addProfilePic(images, response.user_id).then(function(picResp){
                                toastr.success(response.message,'Success');
                                cancel();
                            });
                        }
                    }
                    else{
                        toastr.error(response.message);
                        utilities.goBackState();
                    }
                });
            }
            else{
                toastr.error('Please enter the missing fields', 'Invalid Form');
            }

        }

        function updateUser(form, userObj, images){
            if(form.$valid){
                user.updateUserProfile(userObj, images).then(function(response){
                    if(response.success){
                        if(!vm.noPicture){
                            user.addProfilePic(images, response.user_id).then(function(picResp){
                                if(vm.userData.data.id === response.user_id){
                                    authentication.getUserData(true);
                                }
                                toastr.success(response.message,'Success');
                                cancel();
                            });
                        }
                        else{
                            toastr.success(response.message,'Success');
                            utilities.goBackState();
                        }
                    }
                    else{
                        toastr.error(response.message);
                    }
                });
            }
            else {
                toastr.error('Please enter the missing fields', 'Invalid Form');
            }
        }

        function getFile(picture){
            fileReader.readAsDataUrl(picture, $scope)
                .then(function (result) {
                    deModal.openImageCropper(result, 1, [{w: 200,h: 200}, {w:100, h:100}], {width:100, height:100},
                        function(imagesData){
                            vm.picture = imagesData.croppedImage;
                            vm.imagesData = imagesData;
                        });
                    // vm.picture = result;
                });
        }


    }

})();
