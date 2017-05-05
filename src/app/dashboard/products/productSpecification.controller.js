/**
 * Created by immadimtiaz on 5/4/17.
 */
(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('ProductSpecification', productSpecification);

    function productSpecification(allKeywords, $state, product, dropDownConfig, toastr) {
        var vm = this;
        _init();

        function _init(){
            vm.addProductSpecification = addProductSpecification;
        }

        function addProductSpecification(){


        }
    }
})();