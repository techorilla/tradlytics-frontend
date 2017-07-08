
(function() {

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TransactionView', transactionView);

    /* @ngInject */
    function transactionView(Upload, tradeBook, toastr, $stateParams, apiEndPoints, trade, utilities,
                             appFormats, $state, shipmentStatus){
        var vm = this;
        _init();

        function _init(){
            vm.appFormats = appFormats;
            vm.shipmentStatus = shipmentStatus;
            vm.addingNote=false;
            vm.updateNote=false;
            vm.transactionId = $stateParams.id;
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
            vm.activateShipment = activateShipment;
            vm.changeCompleteStatus = changeCompleteStatus;

            vm.productConfig = {};
            vm.productOptions = {};


        }

        function changeCompleteStatus(transactionId, isComplete){
            tradeBook.changeCompleteStatus(transactionId, isComplete).then(function(res){
                if(res.success){
                    vm.transaction = res.transactionObj;
                    toastr.success(res.message)
                }
                else{
                    toastr.error(res.message);
                }
            });
        }

        function activateShipmentStatus(shipmentStatus, status, transactionId){
            tradeBook.activateShipmentStatus(shipmentStatus, status, transactionId).then(function(res){
                if(res.success){
                    vm.transaction = res.transactionObj;
                    toastr.success(res.message, 'Shipment Status Updated')
                }
                else{
                    toastr.error(res.message,'Error Changing Shipment Status');
                }
            });
        }

        function editNotShipped(){

        }

        function editApprobationReceived(){

        }

        function editShipped(){

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
                file.upload = Upload.upload({
                    url: 'api/'+apiEndPoints.transaction.main + '/' + apiEndPoints.transaction.document + '/',
                    data: {
                        file: file,
                        name: vm.newDocumentName+'.'+ext,
                        tradeId: vm.transactionId,
                        extension: ext,

                    }
                });

                file.upload.then(function (response) {
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
            return tradeBook.deleteTradeNote(tradeId, noteId).then(function(res){
                if(res.success){
                    var index = _.indexOf(noteList, note);
                    noteList.splice(index, 1);
                    toastr.success(res.message, 'Note Deleted');
                }
                else{
                    toastr.error(res.message);
                }
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
                        })
                    }
                    else{
                        var noteEdited = _.find(noteList, function(n) { return (n.editing == true); });
                        var index = _.indexOf(noteList, noteEdited);
                        tradeBook.editTradeNote(tradeId, noteEdited.noteId, note).then(function(res){
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