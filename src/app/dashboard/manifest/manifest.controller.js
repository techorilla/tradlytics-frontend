(function () {
    'use strict';
    angular.module('app.dashboard.manifest')
        .controller('Manifest', manifest);

    function manifest($state, $stateParams, $filter, loaderModal, utilities, manifest, dropDownConfig,
                      toastr, appConstants, documentExporter){
        var vm = this;
        _init();

        function _init(){
            vm.hidePaging = false;
            vm.unpagedView = unpagedView;
            vm.currentPage = 1;
            vm.itemsPerPage = 10;
            vm.appConstants = appConstants;
            vm.exportToExcel = exportToExcel;
            vm.exportToPDF = exportToPDF;
            vm.addNewManifestItem = addManifestItem;
            vm.editManifestItem = editManifestItem;
            vm.saveManifestItem = saveManifestItem;
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.onBuyersSelectedChanged = onBuyersSelectedChanged;
            vm.onSellersSelectedChanged = onSellersSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.deleteManifestItem = deleteManifestItem;
            vm.pageChanged = pageChanged;
            vm.cancel = cancel;
            vm.quantityMetricConfig = {};
            vm.quantityMetricOptions = {};
            vm.productConfig = {};
            vm.productOptions = {};
            vm.buyerConfig = {};
            vm.buyerOptions = {};
            vm.sellerConfig = {};
            vm.sellerOptions = {};
            vm.selectedBuyerID = [];
            vm.selectedSellerID = [];
            vm.selectedProductID = [];
            vm.dateRange = utilities.lastThirtyDaysDateRange();
            dropDownConfig.preparePriceMetricConfig(vm.quantityMetricConfig, vm.quantityMetricOptions);
            dropDownConfig.prepareProductDropDown(vm.productConfig, vm.productOptions);
            dropDownConfig.prepareBusinessDropDown(vm.buyerConfig, vm.buyerOptions, 'Buyer');
            dropDownConfig.prepareBusinessDropDown(vm.sellerConfig, vm.sellerOptions, 'Seller');
            vm.allManifestItems = [];
            vm.allManifestList = [];
            vm.displayList = [];
            vm.columnHeader=[
                'Date',
                'Buyer',
                'Seller',
                'Product',
                'Origin (Seller Country)',
                'Quantity(FCL)',
                'Container No.'
            ];
            vm.columnKeys = [
                'date',
                'buyerName',
                'sellerName',
                'productName',
                'sellerCountry',
                'quantity',
                'containerNo'
            ];
            getManifestItems(vm.dateRange);
        }

        function pageChanged(){
            setPagingData(vm.currentPage, vm.allManifestList, vm.itemsPerPage);
        }

        function unpagedView(list, flag){
            vm.hidePaging = !flag;
            vm.displayList = (vm.hidePaging) ? list : vm.pagedData;

        }

        function setPagingData(page, list, itemsPerPage) {
            vm.totalItems = list.length;
            vm.currentPage = page;
            vm.pagedData = list.slice((page - 1) * itemsPerPage, page * itemsPerPage);
            vm.displayList = vm.pagedData;
        }


        function filterChanged(){
            vm.currentPage = 1;
            vm.manifestItemsToRemove = [];
            angular.forEach(vm.allManifestItems,function(manifestItem,key){
                var removeManifestItem;
                removeManifestItem = ((vm.selectedBuyerID.indexOf(manifestItem.buyerId)<=-1) || (vm.selectedSellerID.indexOf(manifestItem.sellerId)<=-1));
                removeManifestItem = removeManifestItem || (vm.selectedProductID.indexOf(manifestItem.productId)<=-1);
                if(removeManifestItem){
                    vm.manifestItemsToRemove.push(manifestItem.id);
                }
            });
            vm.allManifestList = $filter('selectedRows')(vm.allManifestItems, vm.manifestItemsToRemove, 'id');
            vm.totalQuantity = _.sumBy(vm.allManifestList, function(item) { return item.quantity; });
            if(!vm.hidePaging){
                setPagingData(vm.currentPage, vm.allManifestList, vm.itemsPerPage);
            }
        }

        function onBuyersSelectedChanged(selectedList, initialized){
            vm.selectedBuyerID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged();
            }

        }

        function onSellersSelectedChanged(selectedList, initialized){
            vm.selectedSellerID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged();
            }
        }

        function onProductsSelectedChanged(selectedList, initialized){
            vm.selectedProductID = _.map(selectedList, 'id');
            if(!initialized){
                filterChanged();
            }
        }

        function onDateRangeChanged(dateRange){
            vm.currentPage = 1;
            vm.dateRange = dateRange;
            getManifestItems(dateRange);
        }

        function getManifestItems(dateRange){
            loaderModal.open();
            manifest.getAllManifestItems(dateRange).then(function(res){
                vm.allManifestItems = res.manifestItems;
                vm.allManifestList = angular.copy(vm.allManifestItems);
                vm.totalQuantity = _.sumBy(vm.allManifestList, function(item) { return item.quantity; });
                setPagingData(vm.currentPage, vm.allManifestList, vm.itemsPerPage);
                loaderModal.close();
            }, function(err){
                loaderModal.close();
            });
        }

        function editManifestItem(manifestItem){
            vm.manifestItem = manifestItem;
            vm.showForm = true;
        }

        function saveManifestItem(manifestItem, form, addMore){
            if(form.$valid){
                if(manifestItem.id){
                    manifest.updateManifestItem(manifestItem).then(function(response){
                        if(response.success){
                            var index = vm.allManifestItems.indexOf(manifestItem);
                            vm.allManifestItems[index] = response.item;
                            toastr.success(response.message);
                            vm.showForm = false;
                        }
                        else{
                            toastr.error(response.message);
                        }
                    })
                }
                else{
                    manifest.addManifestItem(manifestItem).then(function(response){
                        if(response.success){
                            toastr.success(response.message);
                            if(addMore){
                                vm.manifestItem = manifest.getNewManifestItemObj(manifestItem.date);
                                utilities.resetFormValidation(form);
                            }
                            else {
                                vm.cancel();
                            }
                        }
                    })
                }
            }
            else{
                toastr.error('Please enter required missing fields.');
            }

        }

        function deleteManifestItem(item){
            manifest.deleteManifestItem(item.id).then(function(response){
               if(response.success){
                   var index = vm.allManifestItems.indexOf(item);
                   vm.allManifestItems.splice(index, 1);
                   toastr.success(response.message);
               }
               else{
                   toastr.error(response.message);
               }
            });
        }

        function cancel(){
            vm.showForm = false;
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }

        function addManifestItem(){
            vm.showForm = true;
            vm.manifestItem = manifest.getNewManifestItemObj();
        }

        function exportToPDF(manifestList){
            documentExporter.printPDF(angular.copy(vm.columnHeader), angular.copy(vm.columnKeys), manifestList);
        }

        function exportToExcel(manifestList, dateRange){
            documentExporter.getTableInExcelSheet(angular.copy(vm.columnHeader), angular.copy(vm.columnKeys), manifestList, 'Manifest');
        }
    }

})();
