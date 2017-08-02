(function () {
    'use strict';
    angular.module('app.dashboard.tradeBook')
        .controller('Transaction', transaction);

    function transaction(dropDownConfig, tradeBook, $scope, deModal, $rootScope, toastr, $state, loaderModal, $stateParams){
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
            vm.primaryFileConfig = {};
            vm.primaryFileOptions = {};
            vm.partialShipConfig = {};
            vm.partialShipOptions = {};
            dropDownConfig.prepareCommissionTypeConfig(vm.commissionTypeConfig, vm.commissionTypeOptions);
            dropDownConfig.preparePackagingConfig(vm.packagingConfig, vm.packagingOptions);
            dropDownConfig.prepareProductItemDropDown(vm.productItemConfig, vm.productItemOptions);
            dropDownConfig.preparePriceMetricConfig(vm.quantityMetricConfig, vm.quantityMetricOptions);
            dropDownConfig.prepareProductDropDown(vm.productConfig, vm.productOptions);
            dropDownConfig.prepareBusinessDropDown(vm.buyerConfig, vm.buyerOptions, 'Buyer');
            dropDownConfig.prepareBusinessDropDown(vm.sellerConfig, vm.sellerOptions, 'Seller');
            dropDownConfig.prepareBusinessDropDown(vm.brokerConfig, vm.brokerOptions, 'Broker');
            dropDownConfig.prepareInternationalFileIdAutoComplete(vm.primaryFileConfig, vm.primaryFileOptions);
            dropDownConfig.prepareInternationalFileIdAutoComplete(vm.partialShipConfig, vm.partialShipOptions);

            console.log(vm.partialShipConfig, vm.partialShipOptions);


            vm.cancel = cancel;
            vm.addTransaction = addTransaction;
            vm.updateTransaction = updateTransaction;
            vm.changeProductSpecs = changeProductSpecs;



            if(vm.isNew){
                vm.transaction = tradeBook.getNewTransaction();
                vm.showForm = true;
            }
            else{
                loaderModal.open();
                tradeBook.getTransactionDetail($stateParams.id, null).then(function(res){
                    $rootScope.headerSubTitle = 'File Id ' + $stateParams.id ;
                    $rootScope.headerTitle = 'Edit Transaction';
                    vm.transaction = res.transaction;
                    vm.showForm = true;
                    loaderModal.close();
                })
            }

        }

        function getPrimaryTrade(filter){
            console.log(filter);
        }



        function cancel(){
            $state.go('dashboard.tradeBook');
        }

        function onSuccessFullSave(id){
            $state.go('dashboard.transactionView', {'id': id});
        }

        function addTransaction(transactionForm, transactionObj){
            if(transactionForm.$valid || true){
                tradeBook.addTransaction(transactionObj).then(function(response){
                    if(response.success){
                        toastr.success(response.message);
                        onSuccessFullSave(response.fileId);
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

        function updateTransaction(transactionForm, transactionObj){
                if(transactionForm.$valid || true){
                    tradeBook.updateTransaction(transactionObj).then(function(response){
                        if(response.success){
                            onSuccessFullSave(response.fileId);
                            toastr.success(response.message);
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

        function changeProductSpecs(){
            deModal.openProductSpecificationModal(vm.transaction.productSpecification, function(productSpecs){
                vm.transaction.productSpecification = productSpecs;
                console.log(vm.transaction);
            });
        }


    }

})();
