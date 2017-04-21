(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('ProductKeyword', productKeyword);

    function productKeyword(allKeywords, $state, product, dropDownConfig, toastr){
        var vm = this;
        _init();

        function _init(){
            vm.allKeywords = allKeywords;
            vm.categoryConfig = {};
            vm.categoryOptions = {};
            dropDownConfig.prepareProductCategoryDropDown(vm.categoryConfig, vm.categoryOptions);
            vm.keywordObj = product.getNewKeywordObj();
            vm.showForm = false;
            vm.addNewKeyword = addNewKeyword;
            vm.addKeyword = addKeyword;
            vm.editKeyword = editKeyword;
            vm.updateKeyword = updateKeyword;
            vm.cancel = cancel;

        }

        function addNewKeyword(){
            vm.keywordObj=product.getNewKeywordObj();
            vm.showForm = true;
        }

        function addKeyword(form, keywordObj){
            if(form.$valid){
                product.addProductKeyword(keywordObj, function(res){
                    if(res.success) {
                        vm.allKeywords.push(res.obj);
                        cancel();
                        toastr.success(res.message)
                    }
                    else{
                        toastr.error(res.message);
                    }
                })
            }
            else{
                toastr.error('Please fill missing fields.', 'Incomplete form')
            }

        }

        function editKeyword(row){
            vm.keywordObj = row;
            vm.showForm=true;
        }

        function updateKeyword(form, keywordObj){
            if(form.$valid){
                product.updateProductKeyword(keywordObj, function(res){
                    if(res.success){
                        var obj = res.obj;
                        var item = _.find(vm.allKeywords, function(keyword){
                            return keyword.id == obj.id;
                        });
                        var index = _.indexOf(vm.allKeywords, item);
                        vm.allKeywords[index] = obj;
                        cancel();
                        toastr.success(res.message)
                    }
                    else{
                        toastr.error(res.message);
                    }
                })
            }
            else{
                toastr.error('Please fill missing fields.', 'Incomplete form')
            }
        }

        function cancel(){
            vm.keywordObj = product.getNewKeywordObj();
            vm.showForm=false;
        }
    }

})();
