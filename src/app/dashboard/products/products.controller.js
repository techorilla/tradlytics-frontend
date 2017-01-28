(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('Products', products);

    function products(product, allProducts, $state){
        var vm = this;
        _init();

        function _init(){
            vm.allProducts = allProducts;
            vm.addNewProduct = addNewProduct;
            vm.goToProduct = goToProduct;
        }

        function addNewProduct(){
            $state.go('dashboard.products.single', {'id':'new'});
        }

        function goToProduct(productId){

        }
    }

})();