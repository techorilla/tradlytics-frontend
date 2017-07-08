(function () {
    'use strict';
    angular.module('app.dashboard.shipping')
        .controller('ShippingLineForm', ShippingLineForm);

    function ShippingLineForm($state, shipping, toastr, loaderModal, $filter, $stateParams, fileReader, $scope,
                              deModal, utilities) {
        var vm = this;
        _init();



        function saveShippingLine(formObj, lineObj, imagesData, addAnother){

            function saveShippingLineCallBack(res){

                if(res.success){
                    toastr.success('Created Successfully',res.message);
                    if(addAnother){
                        vm.shippingObj = shipping.getNewShippingLineObj();
                        vm.shippingLineLogo = $filter('shippingLineLogo')(vm.shippingObj.logo);
                        utilities.resetFormValidation(formObj);
                    }
                    else{
                        cancel();
                    }

                }
                else{
                    toastr.error('Updated Successfully', res.message);
                }
                loaderModal.close();
            }

            if(formObj.$valid){
                loaderModal.open();
                if(lineObj.id){

                    shipping.updateShippingLine(lineObj, imagesData).then(saveShippingLineCallBack);
                }
                else{
                    shipping.addShippingLine(lineObj, imagesData).then(saveShippingLineCallBack);
                }
            }
            else{
                toastr.error('Please Enter Missing Fields', 'Incomplete Form');
            }
        }

        function removeLogo() {
            vm.noLogo = true;
            vm.shippingObj.logo = null;
            vm.shippingLineLogo = $filter('shippingLineLogo')(vm.shippingObj.logo);
        }

        function uploadLogo() {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();
        }

        function getFile(picture){
            fileReader.readAsDataUrl(picture, $scope)
                .then(function (result) {
                    deModal.openImageCropper(result, null, null, {width:200, height:200},
                        function(imagesData){
                            vm.shippingLineLogo = imagesData.croppedImage;
                            vm.imagesData = imagesData;
                        });
                    // vm.picture = result;
                });
        }

        function cancel(){
            try {
                $state.go($state.current.prevState, $state.current.prevParam);
            }
            catch(err) {
                $state.go('dashboard.main');
            }
        }


        function getShippingLineObj(id){
            loaderModal.open();
            shipping.getShippingLineObj(id).then(function(res){
                if(res.success){
                    vm.shippingObj = res.shippingLineObj;
                    vm.shippingLineLogo = $filter('shippingLineLogo')(vm.shippingObj.logo);
                }
                loaderModal.close();
            });

        }

        function _init() {
            vm.isNew = ($stateParams.id === 'new');
            vm.getFile = getFile;
            vm.saveShippingLine = saveShippingLine;
            vm.cancel = cancel;
            vm.removeLogo = removeLogo;
            vm.uploadLogo = uploadLogo;

            if(vm.isNew){
                vm.shippingObj = shipping.getNewShippingLineObj();
                vm.shippingLineLogo = $filter('shippingLineLogo')(vm.shippingObj.logo);
            }
            else{
                getShippingLineObj($stateParams.id)
            }




        }
    }
})();