(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('ProductItems', productItems);

    function productItems(product, $state, dropDownConfig, appConstants, allProductItems, toastr){
        var vm = this;
        _init();

        function _init(){
            vm.allProductItems = allProductItems;
            vm.showForm = false;
            vm.cancel = cancel;
            vm.productItem = product.getProductObj();
            vm.appConstants = appConstants;
            vm.keywordConfig = {};
            vm.keywordOptions = {};
            vm.originConfig = {};
            vm.originOptions = {};
            vm.editProductItem = editProductItem;
            vm.addNewProductItem = addNewProductItem;
            vm.addProductItem = addProductItem;
            vm.updateProductItem = updateProductItem;
            vm.productConfig = {};
            vm.productOptions = {};
            dropDownConfig.prepareProductOriginDropDown(vm.originConfig, vm.originOptions, null);
            dropDownConfig.prepareKeywordDropDown(vm.keywordConfig, vm.keywordOptions, null);
            dropDownConfig.prepareProductDropDown(vm.productConfig, vm.productOptions, vm.originConfig, vm.originOptions,
                vm.keywordConfig, vm.keywordOptions, onProductChange);

        }

        function onProductChange(productOriginConfig, productOriginOptions, keywordConfig, keywordOptions, value, callback){
            if(value){
                dropDownConfig.prepareProductOriginDropDown(productOriginConfig, productOriginOptions, value, function(){
                    dropDownConfig.prepareKeywordDropDown(keywordConfig, keywordOptions, value, callback);
                });
            }
            else{
                vm.productItem.origin = null;
                vm.productItem.keywords = null;
            }
        }

        function addProductItem(form, productItem){
            product.addProductItem(productItem, function(res){
                if(res.success){
                    vm.allProductItems.push(res.obj);
                    vm.productItem = product.getProductObj();
                    vm.showForm = false;
                    toastr.success('Product item added successfully.');
                }
            });
        }

        function cancel(){
            vm.productItemObj = product.getProductObj();
            vm.showForm=false;

        }

        function updateProductItem(form, productItem){
            product.updateProductItem(productItem, function(res){
                if(res.success){
                    var obj = res.obj;
                    var item = _.find(vm.allProductItems, function(prodItem){
                        return prodItem.id == obj.id;
                    });
                    var index = _.indexOf(vm.allProductItems, item);
                    vm.allProductItems[index] = obj;
                    vm.productItem = product.getProductObj();
                    vm.showForm = false;
                    toastr.success('Product item updated successfully.')
                }
            });
        }

        function editProductItem(row){
            vm.showForm=false;
            onProductChange(vm.originConfig, vm.originOptions, vm.keywordConfig, vm.keywordOptions, row.productId, function(){
                vm.productItem=row;
                vm.showForm=true;
            });
        }


        function addNewProductItem(){
            vm.showForm = false;
            vm.productItem = product.getNewProductItem();
            vm.showForm = true;
        }
    }

})();