(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('DetailProduct', detailProduct);

    function detailProduct(fileReader, product, $filter, deModal, $scope, toastr, $state){
        var vm = this;
        _init();

        function _init(){
            vm.productObj = product.getProductObj();
            vm.productImage = $filter('productPicture')(vm.productObj.info.image);
            vm.noPicture = (vm.productImage === null);
            vm.uploadProductImage = uploadProductImage;
            vm.removeProductPicture = removeProductPicture;
            vm.getFile = getFile;
            vm.addProduct = addProduct;
            console.log(vm.productImage);
        }

        function addProduct(form, productObj, images){
            product.addProduct(form, productObj, images, function(productResp){
                if(vm.productImage){
                    product.addProductImage(productResp.id, images).then(function(productImgResponse){

                    })
                }
                toastr.success(productObj.info.name + ' successfully added.', 'Product Added');
                $state.go('dashboard.products');
            });
        }

        function uploadProductImage() {
            var fileInput = document.getElementById('uploadProductFile');
            fileInput.click();
        }

        function getFile(picture){
            deModal.getFile(picture, $scope, 1.5, [{w: 600,h: 300}], {width:600, height:300}, function(imagesData){
                vm.productImage = imagesData.croppedImages[0].dataURI;
                vm.imagesData = imagesData;
            });
        }

        function removeProductPicture() {
            vm.noPicture = true;
            vm.productImage = null;
        }
    }

})();
