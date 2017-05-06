/**
 * Created by immadimtiaz on 5/4/17.
 */
(function () {
    'use strict';
    angular.module('app.dashboard.products')
        .controller('ProductSpecification', productSpecification);

    function productSpecification($state, product, toastr, specificationData) {
        var vm = this;
        _init();

        function _init(){
            vm.categoryName = specificationData.categoryName;
            vm.specificationData = specificationData;
            vm.addSpecificationItem = addSpecificationItem;
            if(vm.specificationData.specs.length === 0){
                vm.specificationData.specs.push(getEmptySpecs());
            }
            vm.removeSpecItem = removeSpecItem;
            vm.saveSpecs = saveSpecs;
            vm.cancel = cancel;
            vm.specsTypes = [
                {'name': 'Text', 'value': 'text'},
                {'name': 'Percentage', 'value': 'Percentage'}
            ]
        }

        function saveSpecs(specsForm, specificationData){
            if(specsForm.$valid){
                product.saveProductCategorySpecification(specificationData).then(function(res){
                    if(res.success){
                        toastr.success(res.message);
                        cancel();
                    }
                    else{
                        toastr.error(res.message);
                    }
                })
            }
            else{
                toastr.error('Please enter missing fields');
            }
        }

        function cancel(){
            $state.go('dashboard.productsCategories');
        }

        function getEmptySpecs(){
            return {
                'name': null,
                'type': null
            }
        }

        function removeSpecItem(specList, spec){
            if(specList.length!==1){
                var index = _.findIndex(specList, spec);
                specList.splice(index,1);
            }
            else{
                toastr.error('Category specification must have at least one spec item.')
            }
        }

        function addSpecificationItem(){
            vm.specificationData.specs.push(getEmptySpecs());
        }


    }
})();