/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BpProduct
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.dashboard.businessPartner')
		.controller('BpProduct', BpProduct);

  /* @ngInject */
	function BpProduct($stateParams,businessPartner,tradeBook, product, toastr, bp){
		var vm = this;
        init();


    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:BpProduct
     * @description
     * My Description rules
     */
        function init(){
            product.getAllProducts().then(function(res){
                vm.productList = res.data;
            });
            vm.bpProducts = bp.products;
            vm.addingProduct = false;
            vm.showBpProducts = false;
            vm.productConfig = tradeBook.getProductConfig();
            vm.cancel = cancel;
            vm.saveBpProduct = saveBpProduct;
            vm.deleteBpProduct = deleteBpProduct;
            vm.addNewProduct = addNewProduct;

        }

        function cancel(){
            vm.addingProduct = false;
            vm.newProduct = undefined;
        }

        function addNewProduct(){
            vm.addingProduct = true;
        }

        function saveBpProduct(newProduct){
            if(!vm.newProduct){
                toastr.error('Please select a product to add','Error');
                return;
            }
            var prod = {
                bpId:$stateParams.id,
                product:newProduct
            };
            businessPartner.addBusinessPartnerProduct(prod).then(function(res){
                if(res.data.success){
                    vm.addingProduct = false;
                    vm.bpProducts.push({bp_ID:$stateParams.id,prod_ID:newProduct});
                    vm.newProduct = undefined;
                }
                else{
                    toastr.error('Product already added for this business partner','Error');
                    vm.newProduct = undefined;
                    vm.addingProduct = false;
                }
            });
        }

        function deleteBpProduct(productId, index){
            var prod = {
                bpId:$stateParams.id,
                product:productId
            };
            businessPartner.deleteBusinessPartnerProduct(prod).then(function(res){
                if(res.data.success){
                    vm.bpProducts.splice(index,1);
                    vm.newProduct = undefined;
                }
            });
        }

	}

}());
