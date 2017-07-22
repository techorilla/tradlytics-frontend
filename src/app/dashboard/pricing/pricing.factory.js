/**
 * @ngdoc service
 * @name app.dashboard.pricing.pricing
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.pricing')
        .factory('pricing', pricing);

    /* @ngInject */
    function pricing(Restangular, apiEndPoints, utilities){

        var pricingAPI = Restangular.all(apiEndPoints.pricing);

        return {
            getAllPriceMarkets: getAllPriceMarkets,
            getNewPriceMarkets: getNewPriceMarkets,
            addPriceMarket: addPriceMarket,
            updatePriceMarket: updatePriceMarket,
            getNewMarketPriceObj: getNewMarketPriceObj,
            getNewMarketPriceItemObj: getNewMarketPriceItemObj,

            getAllProductItemPrice: getAllProductItemPrice,
            addProductItemPrice: addProductItemPrice,
            updateProductItemPrice: updateProductItemPrice,
            deleteProductItemPrice: deleteProductItemPrice,
            getAllProductPriceSummary: getAllProductPriceSummary,

            getProductPricingAnalytics: getProductPricingAnalytics
        };

        function getProductPricingAnalytics(dateRange, productItemId){
            return pricingAPI.customPOST(angular.merge(dateRange, {
                'productItemId': productItemId
            }), apiEndPoints.productItem+'/analytics')
        }

        function getAllProductPriceSummary(){
            return pricingAPI.customGET(apiEndPoints.pricingSummary);
        }

        function getAllProductItemPrice(dataRange){
            return pricingAPI.customGET(apiEndPoints.productItem, dataRange)
        }

        function addProductItemPrice(marketPriceObj, callback){
            pricingAPI.customPOST(marketPriceObj, apiEndPoints.productItem).then(function(res){
                callback(res);
            });
        }

        function updateProductItemPrice(marketPriceObj, callback){
            pricingAPI.customPUT(marketPriceObj, apiEndPoints.productItem).then(function(res){
                callback(res);
            });
        }

        function deleteProductItemPrice(marketPriceObj){
            return pricingAPI.customDELETE(apiEndPoints.productItem+'/'+marketPriceObj.id);
        }

        function getNewMarketPriceItemObj(isCurrent){
            return {
                'shipmentMonths':null,
                'priceValue': '',
                'currentValue': (isCurrent) ? isCurrent : false
            }
        }

        function getNewMarketPriceObj(){
            var marketPriceObj =  {
                'comments': '',
                'priceMarketId': null,
                'productItemId': null,
                'priceTime': new Date(),
                'priceItems': [

                ]
            };
            marketPriceObj.priceItems.push(getNewMarketPriceItemObj(true));
            return marketPriceObj;
        }


        function getAllPriceMarkets(){
            return pricingAPI.customGET(apiEndPoints.pricingMarket)
        }

        function addPriceMarket(priceMarket, callBack){
            pricingAPI.customPOST(priceMarket, apiEndPoints.pricingMarket).then(function(res){
                callBack(res, 'Added Price Market', false);
            })
        }

        function updatePriceMarket(priceMarket, callBack){
            pricingAPI.customPUT(priceMarket, apiEndPoints.pricingMarket).then(function(res){
                callBack(res, 'Updated Price Market', true);
            })
        }

        function getNewPriceMarkets(){
            return {
                'country': null,
                'currency': null,
                'description': '',
                'isInternational': true
            }
        }
    }

}());

