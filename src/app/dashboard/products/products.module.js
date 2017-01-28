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
                    'allProducts': function(product){
                        return product.getAllProductList().then(function(success){
                            return success.allProducts;
                        })
                    }
                }

            })
            .state('dashboard.products.single', {
                url: '/:id',
                title:'Products',
                pageHeader:{
                    subTitle: 'Add New',
                    title:'Product'
                },
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/products/detailProduct.html',
                        controller:'DetailProduct as vm'
                    }
                }
            });
    }

})();
