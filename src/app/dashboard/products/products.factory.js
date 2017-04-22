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



        var productAPI = Restangular.all(apiEndPoints.product);
        var productItemAPI = Restangular.all(apiEndPoints.productItem);

        return {
            getAllProductList: getAllProductList,
            getProductObj:getProductObj,
            setProductInfo: setProductInfo,

            getAllProductCategories: getAllProductCategories,
            getNewProductCategoryObj: getNewProductCategoryObj,
            addProductCategory: addProductCategory,
            updateProductCategory: updateProductCategory,


            addProduct: addProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct,
            getProduct: getProduct,

            getNewProductItem: getNewProductItem,
            addProductItem: addProductItem,
            updateProductItem: updateProductItem,
            getAllProductItems: getAllProductItems,

            getNewKeywordObj: getNewKeywordObj,
            addProductKeyword: addProductKeyword,
            updateProductKeyword: updateProductKeyword,
            getAllKeywords: getAllKeywords,

            resetProductObj: resetProductObj,
            saveProductOrigin: saveProductOrigin,

            getPriceReport: getPriceReport,
            displayOnWebsite: displayOnWebsite,
            productItemPriceOnWebsite: productItemPriceOnWebsite
        };

        function displayOnWebsite(productId, state){
            return productAPI.customPOST({
                'productId': productId,
                'status': state
            }, apiEndPoints.productWebsiteStatus);
        }

        function getPriceReport(dateRange, productItemId){
            var data = angular.copy(dateRange);
            data = angular.extend(data, {
                'productItemId': productItemId
            });
            return productItemAPI.customGET(apiEndPoints.productPriceReport, data);
        }

        function updateProductKeyword(keywordObj, callback){
            return productAPI.customPUT(keywordObj, apiEndPoints.productKeywords).then(function(res){
               callback(res);
            })
        }

        function addProductKeyword(keywordObj, callback){
            return productAPI.customPOST(keywordObj, apiEndPoints.productKeywords).then(function(res){
                callback(res);
            });
        }

        function getAllKeywords(){
            return productAPI.customGET(apiEndPoints.productKeywords);
        }

        function getNewKeywordObj(){
            return {
                keyword: '',
                categoryId: null
            }
        }

        // Start Product Category

        function getAllProductCategories(){
            return productAPI.customGET(apiEndPoints.productCategory)
        }

        function getNewProductCategoryObj(){
            return {
                name:'',
                description: ''
            }
        }

        function addProductCategory(categoryObj, callback){
            return productAPI.customPOST(categoryObj, apiEndPoints.productCategory).then(function(res){
                callback(res);
            })
        }

        function updateProductCategory(categoryObj, callback){
            return productAPI.customPUT(categoryObj, apiEndPoints.productCategory).then(function(res){
                callback(res);
            })
        }

        // End Product Category



        function getAllProductList(){
            return productAPI.customGET()
        }


        function resetProductObj(){
            product.info = {};
            product.growingConditions = {};
            product.growingAreas = {};
        }

        function getNewProductItem(){
            return {
                'keywords':[],
                'productId': null,
                'productOrigin': null
            }
        }

        function addProductItem(productItem, callback){
           productItemAPI.customPOST(productItem).then(function(res){
               callback(res);
           });
        }

        function updateProductItem(productItem, callback){
            productItemAPI.customPUT(productItem).then(function(res){
                callback(res);
            });
        }

        function productItemPriceOnWebsite(productItemId, priceOnWebsite){
            return productItemAPI.customPOST({
                'productItemId': productItemId,
                'priceOnWebsite': priceOnWebsite
            }, apiEndPoints.productItemPriceOnWebsite)
        }

        function getAllProductItems(){
            return productItemAPI.customGET();
        }



        function getProduct(productId){

        }

        function prepareProduct(productObj, imagesData){
            var body = new FormData();
            if(imagesData){
                var file = new File([imagesData.resultBlob], productObj.info.name+'.png');
                body.append('image', file);
            }
            body.append('product', JSON.stringify(productObj.info));
            return body
        }

        function updateProduct(productObj, imagesData){
            return productAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPUT(
                prepareProduct(productObj, imagesData),
                '',
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function addProduct(productObj, imagesData){
            return productAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPOST(
                prepareProduct(productObj, imagesData),
                '',
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function saveProductOrigin(productObj){
            return productAPI.customPOST({
                'origins': productObj.origins,
                'product_id': productObj.id
            }, apiEndPoints.productOrigin);
        }



        function deleteProduct(productId){
            return productAPI.customDELETE(productId);
        }




        function setProductInfo(productInfo){
            product.info = productInfo;
        }

        function getProductObj(){
            return {
                info:{},
                growingConditions:{},
                growingAreas:{},
                origins:null
            };
        }
    }

}());

