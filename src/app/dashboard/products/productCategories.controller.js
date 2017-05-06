(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('ProductCategories', productCategories);

    function productCategories(allCategories, $state, product, toastr){
        var vm = this;
        _init();

        function _init(){
            vm.showform = true;
            vm.allCategories = allCategories;
            vm.categoryObj = product.getNewProductCategoryObj();
            vm.addNewCategory = addNewCategory;
            vm.addCategory = addCategory;
            vm.updateCategory = updateCategory;
            vm.editCategory = editCategory;
            vm.cancel = cancel;
            vm.specification = specification;

        }

        function specification(categoryId){
            $state.go('dashboard.productSpecification', {'categoryId': categoryId});
        }

        function updateCategory(form, categoryObj){
            if(form.$valid){
                product.updateProductCategory(categoryObj, function(res){
                    if(res.success){
                        var item = _.find(vm.allCategories, function(cat){
                            return cat.id == res.obj.id;
                        });
                        var index = _.indexOf(vm.allCategories, item);
                        vm.allCategories[index] = res.obj;
                        cancel();
                        toastr.success(res.message);
                    }
                    else{
                        toastr.error(res.message);
                    }
                })
            }
            else{
                toastr.error('Please provide a category name', 'Invalid form')
            }
        }

        function editCategory(row){
            vm.showForm = false;
            vm.categoryObj = angular.copy(row);
            vm.showForm = true;
        }

        function addCategory(form, categoryObj){
            if(form.$valid){
                product.addProductCategory(categoryObj, function(res){
                    if(res.success){
                        vm.allCategories.push(res.obj);
                        toastr.success(res.message);
                        cancel();
                    }
                    else{
                        toastr.error(res.message);
                    }
                })
            }
            else{
                toastr.error('Please provide a category name', 'Invalid form')
            }
        }

        function cancel(){
            vm.categoryObj = product.getNewProductCategoryObj();
            vm.showForm = false;
        }

        function addNewCategory(){
            vm.categoryObj = product.getNewProductCategoryObj();
            vm.showForm = true;
        }
    }

})();
