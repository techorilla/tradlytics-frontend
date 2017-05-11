(function () {
    'use strict';
    angular.module('app.dashboard.tradeBook')
        .controller('Transaction', transaction);

    function transaction(dropDownConfig, tradeBook, $scope, deModal, product, toastr){
        console.log('hello');
        var vm = this;
        _init();

        function _init(){
            vm.quantityMetricConfig = {};
            vm.quantityMetricOptions = {};
            vm.productConfig = {};
            vm.productOptions = {};
            vm.packagingConfig = {};
            vm.packagingOptions = {};
            vm.buyerConfig = {};
            vm.buyerOptions = {};
            vm.sellerConfig = {};
            vm.sellerOptions = {};
            vm.productItemConfig = {};
            vm.productItemOptions = {};
            vm.commissionTypeConfig = {};
            vm.commissionTypeOptions = {};
            vm.brokerConfig = {};
            vm.brokerOptions = {};
            dropDownConfig.prepareCommissionTypeConfig(vm.commissionTypeConfig, vm.commissionTypeOptions);
            dropDownConfig.preparePackagingConfig(vm.packagingConfig, vm.packagingOptions);
            dropDownConfig.prepareProductItemDropDown(vm.productItemConfig, vm.productItemOptions);
            dropDownConfig.preparePriceMetricConfig(vm.quantityMetricConfig, vm.quantityMetricOptions);
            dropDownConfig.prepareProductDropDown(vm.productConfig, vm.productOptions);
            dropDownConfig.prepareBusinessDropDown(vm.buyerConfig, vm.buyerOptions, 'Buyer');
            dropDownConfig.prepareBusinessDropDown(vm.sellerConfig, vm.sellerOptions, 'Seller');
            dropDownConfig.prepareBusinessDropDown(vm.brokerConfig, vm.brokerOptions, 'Broker');
            vm.transaction = tradeBook.getNewTransaction();
            vm.addTransaction = addTransaction;
            vm.updateTransaction = updateTransaction;
            vm.changeProductSpecs = changeProductSpecs;
            vm.netCommission = (vm.transaction.id) ? 0.00 : 0.00;
            $scope.$watch('vm.transaction.commission', function(newVal, oldVal){
                if((newVal !== oldVal)){
                    vm.netCommission = tradeBook.calculateCommission(vm.transaction);
                }

            }, true);

            $scope.$watch('vm.transaction.basic.price', function(newVal, oldVal){
                if((newVal !== oldVal)){
                    vm.netCommission = tradeBook.calculateCommission(vm.transaction);
                }
            });

            $scope.$watch('vm.transaction.basic.quantity', function(newVal, oldVal){
                if((newVal !== oldVal)){
                    vm.netCommission = tradeBook.calculateCommission(vm.transaction);
                }
            });

            $scope.$watch('vm.transactionForm.basic.productItemId', function(newVal, oldVal){
                if(newVal){
                    product.getProductSpecification(newVal).then(function(response){
                        if(response.success){
                            vm.transaction.productSpecification = response.specification;
                        }
                    })
                }
            });
        }

        function addTransaction(transactionForm, transactionObj){
            if(transactionForm.$valid){
                tradeBook.addTransaction(transactionObj).then(function(response){
                    if(response.success){
                        console.log(transactionObj);
                    }
                })
            }
            else{
                toastr.error('Please enter missing fields');
            }
        }

        function updateTransaction(transactionObj){
            tradeBook.updateTransaction(transactionObj).then(function(response){
                if(transactionForm.$valid){
                    tradeBook.addTransaction(transactionObj).then(function(response){
                        if(response.success){

                        }
                    })
                }
            })
        }

        function changeProductSpecs(){
            deModal.openProductSpecificationModal(vm.transaction.productSpecification, function(productSpecs){
                vm.transaction.productSpecification = productSpecs;
                console.log(vm.transaction);
            });
        }


    }

})();
