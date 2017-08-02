
(function() {

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TransactionView', transactionView);

    /* @ngInject */
    function transactionView(Upload, tradeBook, toastr, deModal, apiEndPoints, trade, utilities,
                             appConstants, appFormats, $state, shipmentStatus, dropDownConfig, shipping, loaderModal){
        var vm = this;
        _init();

        function _init(){
            vm.appConstants = appConstants;

            //shipment Form
            vm.showNotShippedForm = false;
            vm.showApprobationRecievedForm = false;
            vm.showShippedForm = false;
            vm.showArrivedAtPort = false;
            vm.loadVessel = loadVessel;
            vm.cancelShipmentForm = cancelShipmentForm;

            vm.shipperConfig = {};
            vm.shipperOptions = {};


            vm.shippingLineConfig = {};
            vm.shippingLineOptions = {};
            vm.portConfig = {};
            vm.portOptions = {};

            dropDownConfig.prepareShippingLineConfig(vm.shippingLineConfig, vm.shippingLineOptions);
            dropDownConfig.prepareShippingPortConfig(vm.portConfig, vm.portOptions);
            dropDownConfig.prepareBusinessDropDown(vm.shipperConfig, vm.shipperOptions, 'Shipper');


            vm.appFormats = appFormats;
            vm.shipmentStatus = shipmentStatus;
            vm.addingNote=false;
            vm.updateNote=false;
            vm.transactionId = trade.id;
            console.log(vm.transactionId);
            vm.transaction = trade;
            vm.showDocument = false;
            vm.documentAdding = false;
            vm.addingDocument = false;
            vm.newDocumentName = '';
            vm.noteText = '';
            vm.addNewDocument = addNewDocument;
            vm.uploadTradeDocument = uploadTradeDocument;
            vm.cancelDocumentUpload = cancelDocumentUpload;
            vm.editTradeNote = editTradeNote;
            vm.deleteTradeNote = deleteTradeNote;
            vm.addTradeNote = addTradeNote;
            vm.deleteTradeDoc = deleteTradeDoc;
            vm.downloadTradeDoc = downloadTradeDoc;
            vm.editTransactionDetails = editTransactionDetails;
            vm.createWatsappCopy = createWatsappCopy;
            vm.activateShipmentStatus = activateShipmentStatus;

            vm.editNotShipped = editNotShipped;
            vm.editApprobationReceived = editApprobationReceived;
            vm.editShipped = editShipped;
            vm.editArrivedAtPort = editArrivedAtPort;

            vm.loadPorts = loadPorts;

            vm.createTransactionInvoice = createTransactionInvoice;
            vm.activateShipment = activateShipment;
            vm.changeCompleteStatus = changeCompleteStatus;
            vm.showTradeCashFlow = showTradeCashFlow;
            vm.goToInvoice = goToInvoice;

            vm.productConfig = {};
            vm.productOptions = {};
        }

        function showTradeCashFlow(fileId){
            deModal.openTransactionCashFlowModal(fileId, function(fileId){

            });
        }

        function createTransactionInvoice(fileId){
            $state.go('dashboard.accounts.invoiceForm',{
                'fileId': fileId,
                'invoiceId': 'new'
            })
        }

        function loadVessel(query){
            return shipping.getVesselTags(query).then(function(res){
                return res.data
            });
        }

        function loadPorts(query){
            return shipping.getPortTags(query).then(function(res){
                return res.data

            });
        }

        function goToInvoice(fileId, invoiceId){
            $state.go('dashboard.accounts.invoiceForm', {fileId: fileId, invoiceId: invoiceId})
        }

        function cancelShipmentForm(flag){
            vm[flag] = false;
        }

        function changeCompleteStatus(completeObj, transactionId){
            deModal.openTransactionCompleteModel(completeObj, transactionId, function(completeObj){
                loaderModal.open();
                tradeBook.changeCompleteStatus(transactionId, completeObj).then(function(res){
                    if(res.success){
                        vm.transaction = res.transactionObj;
                        toastr.success(res.message)
                    }
                    else{
                        toastr.error(res.message);
                    }
                    loaderModal.close();
                });

            });

        }

        function activateShipmentStatus(shipmentStatus, status, transactionId){
            loaderModal.open();
            tradeBook.activateShipmentStatus(shipmentStatus, status, transactionId).then(function(res){
                if(res.success){
                    vm.transaction = res.transactionObj;
                    toastr.success(res.message, 'Shipment Status Updated');
                }
                else{
                    toastr.error(res.message,'Error Changing Shipment Status');
                }
                loaderModal.close();
            });
        }


        function onSuccessForm(boolean, res){
            if(res.success){
                vm.transaction = res.transactionObj;
                toastr.success(res.message, 'Shipment Information Updated!');
                cancelShipmentForm(boolean);
            }
            else{
                toastr.error();
            }

        }

        function editNotShipped(formObj, dataObj, transactionId){
            loaderModal.open();
            tradeBook.updateNotShippedInfo(dataObj, transactionId).then(function(res){
                loaderModal.close();
                onSuccessForm('showNotShippedForm', res);
            });
        }


        function editApprobationReceived(formObj, dataObj, transactionId){
            loaderModal.open();
            tradeBook.updateApprobationReceivedInfo(dataObj, transactionId).then(function(res){

                loaderModal.close();
                onSuccessForm('showApprobationRecievedForm', res);
            });
        }

        function editShipped(formObj, dataObj, transactionId){
            loaderModal.open();
            tradeBook.updateShippedInfo(dataObj, transactionId).then(function(res){
                loaderModal.close();
                onSuccessForm('showShippedForm', res);
            });
        }

        function editArrivedAtPort(formObj, arrivedObj, transactionObj, transactionId){
            var expectedCommission = null;
            console.log(arrivedObj);
            loaderModal.open();
            return tradeBook.updateArrivedAtPortInfo(arrivedObj, transactionId, expectedCommission).then(function(res){
                loaderModal.close();
                onSuccessForm('showArrivedAtPort', res);

            });
        }


        function activateShipment(){

        }


        function createWatsappCopy(transaction){

        }

        function editTransactionDetails(transactionId){
            $state.go('dashboard.transaction', {id: transactionId});
        }

        function openTradeDoc(){

        }

        function downloadTradeDoc(docId, fileName, fileType){
            tradeBook.downloadTradeDocument(docId, fileName, fileType);
        }

        function deleteTradeDoc(docId){
            loaderModal.open();
            tradeBook.deleteTransactionDocument(docId).then(function(res){
                if(res.success){
                    toastr.success(res.message);
                    var index = _.findIndex(vm.transaction.files, function(doc){
                        return doc.id = doc.fileId;
                    });
                    vm.transaction.files.splice(index, 1);
                }
                else{
                    toastr.error(res.message);
                }
                loaderModal.close();
            })
        }

        function uploadTradeDocument(file, errFiles){
            if(vm.newDocumentName === ''){
                toastr.error('Please enter document name', 'Error');
                return;
            }
            var extension = file.name.split('.');
            var ext = extension[extension.length - 1];
            if(file){
                loaderModal.open();
                file.upload = Upload.upload({
                    url: 'api/'+apiEndPoints.transaction.main + '/' + apiEndPoints.transaction.document + '/',
                    data: {
                        file: file,
                        name: vm.newDocumentName+'.'+ext,
                        tradeId: vm.transactionId,
                        extension: ext
                    }
                });

                file.upload.then(function (response) {
                    loaderModal.close();
                    if(response.data.success){
                        vm.addingDocument = false;
                        vm.transaction.files.push(response.data.fileObj);

                    }
                });
            }
        }

        function editTradeNote(noteText, note){
            vm.noteText = noteText;
            note.editing = true;
            vm.updateNote = true;
        }

        function deleteTradeNote(tradeId, noteId, note, noteList){
            loaderModal.open();
            return tradeBook.deleteTradeNote(tradeId, noteId).then(function(res){
                if(res.success){
                    var index = _.indexOf(noteList, note);
                    noteList.splice(index, 1);
                    toastr.success(res.message, 'Note Deleted');
                }
                else{
                    toastr.error(res.message);
                }
                loaderModal.close();
            });

        };

        function addTradeNote(tradeId, note, noteList, formObj){
            if(formObj.$valid){
                if(note === ''){
                    toastr.error('Please add a note');
                }
                else{

                    vm.addingNote = false;
                    if(!vm.updateNote){
                        loaderModal.open();
                        tradeBook.addTradeNote(tradeId, note).then(function(res){
                            if(res.success){
                                toastr.success(res.message, 'Note Added');
                                noteList.push(res.note);

                            }
                            else{
                                toastr.error(res.message);
                            }
                            vm.noteText = '';
                            utilities.resetFormValidation(formObj);
                            loaderModal.close();
                        })
                    }
                    else{
                        var noteEdited = _.find(noteList, function(n) { return (n.editing == true); });
                        var index = _.indexOf(noteList, noteEdited);
                        tradeBook.editTradeNote(tradeId, noteEdited.noteId, note).then(function(res){
                            loaderModal.open();
                            if(res.success){
                                vm.updateNote = false;
                                noteList[index] = res.note;
                                toastr.success(res.message, 'Note Updated')
                            }
                            else{
                                toastr.error(res.message);
                            }
                            vm.noteText = '';
                            utilities.resetFormValidation(formObj);
                            loaderModal.close();
                        })
                    }

                }
            }

        };

        function cancelDocumentUpload(){

        }

        function addNewDocument(){
            vm.addingDocument = true;
        }

    }


})();