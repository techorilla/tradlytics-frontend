/**
 * @ngdoc service
 * @name app.dashboard.tradeBook.tradeBook
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.products')
        .factory('product', product);

    /* @ngInject */
    function product(Restangular, apiEndPoints, utilities){

        var product = {
            info:{},
            growingConditions:{},
            growingAreas:{}
        };

        var productAPI = Restangular.all(apiEndPoints.product);

        return {
            getAllProductList: getAllProductList,
            getProductObj:getProductObj,
            setProductInfo: setProductInfo,

            addProduct: addProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct,
            getProduct: getProduct,

            addProductImage: addProductImage,
            updateProductImage: updateProductImage,
            deleteProductImage: deleteProductImage,

            resetProductObj: resetProductObj
        };

        function getAllProductList(){
            return productAPI.customGET()
        }

        function resetProductObj(){
            product.info = {};
            product.growingConditions = {};
            product.growingAreas = {};
        }

        function addProductImage(productId, imagesData){
            var body = new FormData();
            var file = new File([imagesData.resultBlob], "profile.png");
            body.append('product_image', file);
            body.append('primary', true);
            return productAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPOST(
                body,
                productId+'/image',
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function updateProductImage(){

        }

        function deleteProductImage(){

        }

        function getProduct(productId){

        }

        function updateProduct(form, productObj, images, callback){
            if(form.$valid){

            }
        }

        function deleteProduct(productId){

        }

        function addProduct(form, productObj, images, callback){
            if(form.$valid){
                productAPI.customPOST({'product':productObj.info}).then(function(productResponse){
                    callback(productResponse);
                    resetProductObj();
                })
            }
        }

        function setProductInfo(productInfo){
            product.info = productInfo;
        }

        function getProductObj(){
            return product;
        }
    }

}());

