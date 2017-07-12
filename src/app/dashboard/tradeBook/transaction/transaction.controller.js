(function () {
    'use strict';
    angular.module('app.dashboard.tradeBook')
        .controller('Transaction', transaction);

    function transaction(dropDownConfig, tradeBook, $scope, deModal, product, toastr, $state, loaderModal, $stateParams){
        console.log('hello');
        var vm = this;
        _init();

        function _init(){
            vm.quantityMetricConfig = {};
            vm.quantityMetricOptions = {};
            vm.isNew = ($stateParams.id === 'new');
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

            vm.cancel = cancel;
            vm.addTransaction = addTransaction;
            vm.updateTransaction = updateTransaction;
            vm.changeProductSpecs = changeProductSpecs;



            if(vm.isNew){
                vm.transaction = tradeBook.getNewTransaction();
                vm.netCommission =  0.00;
                vm.showForm = true;
                intitalizeWatchers();
            }
            else{
                tradeBook.getTransactionDetail($stateParams.id, null).then(function(res){
                    vm.transaction = res.transaction;
                    vm.netCommission = vm.transaction.commission.netCommission;
                    vm.showForm = true;
                    intitalizeWatchers();
                })
            }

        }

        function intitalizeWatchers(){
            $scope.$watch('vm.transaction.commission', function(newVal, oldVal){
                if((newVal !== oldVal)){
                    vm.netCommission = tradeBook.calculateCommission(vm.transaction);
                }

            }, true);

            $scope.$watch('vm.transaction.basic.price', function(newVal, oldVal){
                console.log('hello');
                if((newVal !== oldVal)){
                    vm.netCommission = tradeBook.calculateCommission(vm.transaction);
                }
            });

            $scope.$watch('vm.transaction.basic.quantity', function(newVal, oldVal){
                if((newVal !== oldVal)){
                    vm.netCommission = tradeBook.calculateCommission(vm.transaction);
                }
            });

            $scope.$watch('vm.transaction.basic.productItemId', function(newVal, oldVal){
                if(newVal){
                    product.getProductSpecification(newVal).then(function(response){
                        if(response.success){
                            vm.transaction.productSpecification = response.specification;
                        }
                    })
                }
            });
        }

        function cancel(){
            $state.go('dashboard.tradeBook');
        }

        function onSuccessFullSave(id){
            $state.go('dashboard.transactionView', {'id': id});
        }

        function addTransaction(transactionForm, transactionObj){
            if(transactionForm.$valid || true){
                tradeBook.addTransaction(transactionObj, vm.netCommission).then(function(response){
                    if(response.success){
                        toastr.success(response.message);
                        onSuccessFullSave(response.tradeId);
                    }
                    else{
                        toastr.error(response.message);
                    }
                })
            }
            else{
                toastr.error('Please enter missing fields');
            }
        }

        function updateTransaction(transactionObj){
            tradeBook.updateTransaction(transactionObj, vm.netCommission).then(function(response){
                if(transactionForm.$valid || true){
                    tradeBook.addTransaction(transactionObj).then(function(response){
                        if(response.success){
                            onSuccessFullSave(response.tradeId);
                            toastr.success(response.message);
                        }
                        else{
                            toastr.error(response.message);
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
