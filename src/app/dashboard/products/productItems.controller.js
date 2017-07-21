(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('ProductItems', productItems);

    function productItems(product, $state, dropDownConfig, appConstants, allProductItems, toastr, loaderModal){
        var vm = this;
        _init();

        function _init(){
            vm.allProductItems = allProductItems;
            vm.productItemToRemove = [];
            vm.selectedProductID = [];
            vm.selectedCountry = [];
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
            vm.displayPriceOnWebsite = displayPriceOnWebsite;
            vm.specsConfig = [];
            vm.productConfig = {};
            vm.productOptions = {};
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;
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
            loaderModal.open();
            product.addProductItem(productItem, function(res){
                if(res.success){
                    vm.allProductItems.push(res.obj);
                    vm.productItem = product.getProductObj();
                    vm.showForm = false;
                    toastr.success('Product item added successfully.');
                }
                loaderModal.close();
            });
        }

        function cancel(){
            vm.productItemObj = product.getProductObj();
            vm.showForm=false;

        }

        function updateProductItem(form, productItem){
            loaderModal.open();
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
                    toastr.success('Product item updated successfully.');
                    loaderModal.close();
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

        function displayPriceOnWebsite(row){
            loaderModal.open()
            product.productItemPriceOnWebsite(row.id, !row.priceOnWebsite).then(function(res){
                if(res.success){
                    row.priceOnWebsite = !row.priceOnWebsite;
                    toastr.success(res.message);
                }
                else{
                    toastr.error(res.message);
                }
                loaderModal.close();
            })
        }

        function addNewProductItem(){
            vm.showForm = false;
            vm.productItem = product.getNewProductItem();
            vm.showForm = true;
        }

        function filterChanged(){
            vm.productItemToRemove = [];
            angular.forEach(vm.allProductItems, function(item,key){
                var removeProductItem = false;
                removeProductItem = removeProductItem || (vm.selectedProductID.indexOf(item.productId)<=-1);
                removeProductItem = removeProductItem || (vm.selectedCountry.indexOf(item.productOriginName)<=-1);
                if(removeProductItem){
                    vm.productItemToRemove.push(item.id);
                }
            });
        }

        function onProductsSelectedChanged(selectedList, initialized){
            vm.selectedProductID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged();
            }
        }

        function onCountrySelectedChanged(selectedList, initialized){
            vm.selectedCountry = _.map(selectedList, 'name');
            console.log(vm.selectedCountry)
            if(!initialized){
                filterChanged();
            }
        }
    }

})();