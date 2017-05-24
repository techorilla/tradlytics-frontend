(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('Products', products);

    function products(fileReader, product, allProducts, $scope, appConstants, $filter, dropDownConfig, loaderModal,
                      deModal, toastr, $state, $stateParams){
        var vm = this;
        _init();

        function _init(){
            vm.showForm = false;
            vm.productObj = product.getProductObj();
            vm.allProducts = allProducts;
            vm.appConstants = appConstants;
            vm.addStepTitle = [
                'Add New Product',
                'Add Product Origins'
            ];
            vm.updateStepTitle = [
                'Update Product',
                'Update Product Origins'
            ];
            vm.categoryConfig = {};
            vm.categoryOptions = {};
            vm.countryConfig = {};
            vm.countryOptions = {};
            vm.cancel = cancel;
            vm.addNewProduct = addNewProduct;
            vm.editProduct = editProduct;
            vm.deleteProduct = deleteProduct;
            vm.uploadProductImage = uploadProductImage;
            vm.removeProductPicture = removeProductPicture;
            vm.getFile = getFile;
            vm.saveProduct = saveProduct;
            vm.onSaveProductCallback = onSaveProductCallback;
            vm.saveProductOrigin = saveProductOrigin;
            vm.onSaveProductOriginCallback = onSaveProductOriginCallback;
            vm.displayOnWebsite = displayOnWebsite;
            vm.loadRelatedProducts = loadRelatedProducts;
            dropDownConfig.prepareProductCategoryDropDown(vm.categoryConfig, vm.categoryOptions);
            dropDownConfig.prepareCountryDropDown(vm.countryConfig, vm.countryOptions);
        }

        function loadRelatedProducts(query, productId){
            return product.loadRelatedProducts(query, productId);
        }

        function displayOnWebsite(prod){
            loaderModal.open();
            product.displayOnWebsite(prod.info.id, !prod.info.onWebsite).then(function(res){
                if(res.success){
                    toastr.success(res.message);
                    prod.info.onWebsite = !prod.info.onWebsite;
                }
                else{
                    toastr.error(res.message);
                }
                loaderModal.close();
            }, function(err){
                toastr.error('Some Error occurred');
                loaderModal.close();
            });
        }

        function cancel(){
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }


        function addNewProduct(){
            vm.action='add';
            vm.showForm = false;
            vm.stepTitle = vm.addStepTitle;
            vm.productObj = product.getProductObj();
            vm.productImage = $filter('productPicture')(vm.productObj.info.image);
            vm.noPicture = (vm.productImage === null);
            vm.showForm = true;
        }

        function editProduct(product){
            vm.action='update';
            vm.showForm = false;
            vm.stepTitle = vm.updateStepTitle;
            vm.productObj = product;
            vm.productImage = $filter('productPicture')(vm.productObj.info.image);
            vm.noPicture = (vm.productImage === null);
            vm.showForm = true;
        }

        function saveProduct(productObj, images){
            console.log(productObj);
            if(productObj.id){
                return product.updateProduct(productObj, images);
            }
            else{
                return product.addProduct(productObj, images);
            }
        }

        function onSaveProductCallback(response){
            if(response.success){
                vm.productObj.id = response.id;
                vm.productObj.info.id = response.id;
            }
        }

        function saveProductOrigin(productObj){
            return product.saveProductOrigin(productObj);
        }

        function onSaveProductOriginCallback(response){
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }

        function deleteProduct(allProducts, prod){
            product.deleteProduct(prod.id).then(function(res){
                if(res.success){
                    var index = allProducts.indexOf(prod);
                    allProducts.splice(index, 1);
                    toastr.success(res.message);
                }
                else{
                    toastr.error(res.message);
                }
            })
        }


        function uploadProductImage(){
            var fileInput = document.getElementById('uploadProductFile');
            fileInput.click();
        }

        function getFile(picture){
            deModal.getFile(picture, $scope, 1.2, [{w: 400,h: 400}], {width:400, height:400}, function(imagesData){
                vm.productImage = imagesData.croppedImage;
                vm.imagesData = imagesData;
            });
        }

        function removeProductPicture() {
            vm.noPicture = true;
            vm.productImage = null;
        }
    }

})();