/**
 * @ngdoc service
 * @name app.modal.alertModalFactory
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.modals')
        .factory('deModal', deModal);

    /* @ngInject */
    function deModal($uibModal, modalTemplates, fileReader){
        return {
            openProgressModal: openProgressModal,
            openModal: openModal,
            dismissModal: dismissModal,
            openImageCropper: openImageCropper,
            getFile: getFile,
            openProductSpecificationModal: openProductSpecificationModal
        };


        ////////////////////


        function openProductSpecificationModal(defaultSpecs, callback){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: modalTemplates.PRODUCT_SPECS,
                controller: function($scope, productSpecs, $uibModalInstance){
                    $scope.productSpecs = productSpecs;
                    $scope.saveSpecs = function(productSpecs){
                        $uibModalInstance.close({
                            'productSpecs': productSpecs
                        });
                    };
                },
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    productSpecs: function(){
                        return defaultSpecs;
                    }
                }


            });

            modalInstance.result.then(function(productSpecs){
                callback(productSpecs.productSpecs);
            });
        }

        function openProgressModal(){

        }


        function getFile(picture, scope, aspectRatio, sizeArray, resultSize, callBack){
            fileReader.readAsDataUrl(picture, scope)
                .then(function (result) {
                    openImageCropper(result, aspectRatio, sizeArray, resultSize, callBack);
                });
        }

        function dismissModal(modalInstance){
            modalInstance.dismiss('cancel');
        }

        function openModal(page, size, controller, resolve) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                controller: controller,
                size: size,
                backdrop: 'static',
                resolve: resolve
            });

        }

        function openImageCropper(image, aspectRatio, imageSizes, cropSize, callback){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: modalTemplates.IMAGE_CROP_WINDOW,
                controller: function($scope, image, aspectRatio, $uibModalInstance){
                    if(aspectRatio){
                        $scope.aspectRatio = aspectRatio;
                    }
                    if(cropSize){
                        $scope.cropper = {
                            w: cropSize.width,
                            h: cropSize.height
                        };
                    }
                    if(imageSizes){
                        $scope.resultImageSizes=imageSizes[0];
                    }

                    $scope.croppedImages = [];
                    $scope.croppedImage = '';
                    $scope.image = image;

                    $scope.saveImage = function () {
                        console.log($scope.croppedImages, $scope.blob);
                        $uibModalInstance.close({
                            'croppedImages':$scope.croppedImages,
                            'resultBlob': $scope.blob,
                            'croppedImage': $scope.croppedImage
                        });
                    };

                },
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    image: function(){
                        return image
                    },
                    aspectRatio: function(){
                        return aspectRatio
                    }
                }
            });

            modalInstance.result.then(function(images){
                callback(images);
            });
        }

    }

}());
