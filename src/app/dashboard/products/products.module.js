(function () {
    'use strict';

    angular.module('app.dashboard.products', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, baSidebarServiceProvider){
        $stateProvider
            .state('dashboard.products', {
                url: '/products',
                title:'Products',
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/products/products.html',
                        controller: 'Products as vm'
                    }
                },
                resolve: {
                    'allProducts': function(product, loaderModal){
                        loaderModal.open();
                        return product.getAllProductList().then(function(success){
                            loaderModal.close();
                            return success.allProducts;
                        })
                    }
                },
                pageHeader:{
                    subTitle: 'Manage',
                    title:'Products'
                }

            })
            .state('dashboard.productsCategories', {
                url: '/categories',
                title:'Products Categories',
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/products/productCategories.html',
                        controller: 'ProductCategories as vm'
                    }
                },
                resolve: {
                    'allCategories': function(product){
                        return product.getAllProductCategories().then(function(success){
                            return success.allCategories;
                        })
                    }
                },
                pageHeader:{
                    subTitle: 'Manage',
                    title:'Product Categories'
                }

            })
            .state('dashboard.productsItems', {
                url: '/productItems',
                title:'Product Items',
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/products/productItems.html',
                        controller: 'ProductItems as vm'
                    }
                },
                resolve: {
                    'allProductItems': function(product){
                        return product.getAllProductItems().then(function(res){
                            return res.data.productItems;
                        })
                    }
                },
                pageHeader:{
                    subTitle: 'Manage',
                    title:'Product Items'
                }

            })
            .state('dashboard.productPriceAnalytics', {
                url: '/productPrice/:productItemId',
                title:'Product Price Report',
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/products/priceAnalytics.html',
                        controller: 'ProductPriceAnalytics as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Product',
                    title:'Price Report'
                }

            })

            .state('dashboard.productSpecification', {
                url:'/productSpecification/:categoryId',
                title: 'Product Specification',
                views:{
                    'content@dashboard':{
                        templateUrl: 'app/dashboard/products/productSpecification.html',
                        controller: 'ProductSpecification as vm'
                    }
                },
                resolve: {
                    'specificationData': function(product, loaderModal, $stateParams){
                        loaderModal.open();
                        return product.getProductCategorySpecification($stateParams.categoryId).then(function(success){
                            loaderModal.close();
                            return success.data;
                        }).finally(function(){
                            loaderModal.close();
                        });
                    }
                },
                pageHeader:{
                    subTitle: 'Category',
                    title:'Specification'
                }

            })

            .state('dashboard.productKeywords', {
                url: '/productKeywords',
                title:'Product Keywords',
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/products/productKeyword.html',
                        controller: 'ProductKeyword as vm'
                    }
                },
                resolve: {
                    allKeywords: function (product, apiEndPoints, crud) {
                        return product.getAllKeywords().then(function(res){
                            return res.data.keywords;
                        });
                    }
                },
                pageHeader:{
                    subTitle: 'Manage',
                    title:'Product Keywords'
                }

            });
    }

})();
