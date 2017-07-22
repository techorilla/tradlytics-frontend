(function () {
    'use strict';

    angular.module('app.dashboard.pricing', [
        'app.dashboard.pricing.items'
    ]).config(routeConfigPricing);

    angular.module('app.dashboard.pricing.items',
        []).config(routeConfigPricingItems);

    /** @ngInject */
    function routeConfigPricing($stateProvider){
        $stateProvider
            .state('dashboard.pricing', {
                url: '',
                abstract: true,
                title:'Pricing',
                views: {
                    'content@dashboard':{
                        template:'<div ui-view="pricing"></div>'
                    }
                }
            });
    }


    /** @ngInject */
    function routeConfigPricingItems($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('dashboard.pricing.dashboard', {
                url: '/pricing',
                title:'Pricing Dashboard',
                views: {
                    'pricing@dashboard.pricing':{
                        templateUrl:'app/dashboard/pricing/pricing.html',
                        controller: 'Pricing as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Product',
                    title:'Pricing'
                },
                resolve:{
                    'allProductPriceSummary': function(pricing, loaderModal){
                        loaderModal.open();
                        return pricing.getAllProductPriceSummary().then(function(res){
                            loaderModal.close();
                            return res.data.priceSummary;
                        });
                    }
                }
            })
            .state('dashboard.pricing.market',{
                url:'/market',
                title: 'Price Market',
                pageHeader:{
                    subTitle: 'Add',
                    title: 'Price Market'
                },
                views:{
                    'pricing@dashboard.pricing':{
                        templateUrl: 'app/dashboard/pricing/priceMarket.html',
                        controller: 'PriceMarket as vm'
                    }
                },
                resolve:{
                    'allMarkets': function(pricing, loaderModal){
                        loaderModal.open();
                        return pricing.getAllPriceMarkets().then(function(response){
                            loaderModal.close();
                            return (response.data.pricingMarket);
                        });
                    }
                }

            })
            .state('dashboard.pricing.productItems', {
                url: 'pricing/products',
                title:'Pricing ',
                pageHeader:{
                    subTitle: 'Add',
                    title:'Product Price'
                },
                resolve:{
                    'allPriceItems': function(pricing, loaderModal, utilities){
                        loaderModal.open();
                        var dateRange = utilities.todayDateRange();
                        return pricing.getAllProductItemPrice(dateRange).then(function(res){
                            loaderModal.close();
                            return res.data.allPrices;
                        })
                    }
                },
                views: {
                    'pricing@dashboard.pricing':{
                        templateUrl:'app/dashboard/pricing/productPricing.html',
                        controller:'ProductPricing as vm'
                    }
                }
            })
            .state('dashboard.pricing.priceAnalytics', {
                url: 'pricing/analytics/:productItemId',
                title:'Pricing Analytics',
                views: {
                    'pricing@dashboard.pricing':{
                        templateUrl:'app/dashboard/pricing/priceAnalytics.html',
                        controller:'PriceAnalytics as vm'
                    }
                }
            });

        $urlRouterProvider.when('/pricing','/pricing/market');
    }

})();
