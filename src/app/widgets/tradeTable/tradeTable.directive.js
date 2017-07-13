(function() {

    'use strict';

    angular
        .module('app.widgets')
        .directive('tradeTable', tradeTable);

    /* @ngInject */
    function tradeTable(appConstants, tradeBook, toastr, appFormats, utilities) {
        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/tradeTable/tradeTable.template.html',
            scope: {
                type:'@',
                listData: '=',
                itemsPerPage: '@'
            },
            replace: true
        };

        function link(scope){
            _init();
            scope.toggleNotes = function(row){
                if(row.showNotes){
                    row.showNotes = false;
                }
                else{
                    row.showNotes = true;
                    row.noteListLoading = true;
                    tradeBook.getAllNotesForTrade(row.id).then(function(res){
                        row.noteList = res.notesList;
                        row.noteListLoading = false;
                    });
                    angular.forEach(scope.listData, function(val,key){
                        if(val.id !== row.id){
                            val.showNotes = false;
                        }
                    });
                }

            };

            scope.editTradeNote = function(trade, noteText, note){
                trade.note = noteText;
                note.editing = true;
                scope.updateNote = true;
            };

            scope.deleteTradeNote = function(tradeId, noteId, note, noteList){
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

            scope.addTradeNote = function(tradeId, note, noteList, trade, formObj){
                if(formObj.$valid){
                    trade.note = '';
                    if(note === ''){
                        toastr.error('Please add a note');
                    }
                    else{
                        scope.addingNote = false;
                        if(!scope.updateNote){
                            tradeBook.addTradeNote(tradeId, note).then(function(res){
                                if(res.success){
                                    toastr.success(res.message, 'Note Added');
                                    noteList.push(res.note);
                                }
                                else{
                                    toastr.error(res.message);
                                }
                                utilities.resetFormValidation(formObj);
                            })
                        }
                        else{
                            var noteEdited = _.find(noteList, function(n) { return (n.editing == true); });
                            var index = _.indexOf(noteList, noteEdited);
                            tradeBook.editTradeNote(tradeId, noteEdited.noteId, note).then(function(res){
                                if(res.success){
                                    scope.updateNote = false;
                                    noteList[index] = res.note;
                                    toastr.success(res.meesage, 'Note Updated')
                                }
                                else{
                                    toastr.error(res.message);
                                }
                                utilities.resetFormValidation(formObj);


                            })
                        }

                    }
                }

            };

            function _init(){
                scope.searchTransactionByFileID = '';
                scope.displayList = [];
                scope.appConstants = appConstants;
                scope.appFormats = appFormats;
                scope.currentPage = 1;
                var intTradeHeading = [
                    'Date',
                    'File No',
                    'Buyer',
                    'Product',
                    'Origin',
                    'Quantity',
                    'Rate',
                    'Seller',
                    'Shipment Start',
                    'Shipment End',
                    'Expected Commission',
                    'Actual Commission'
                ];
                scope.heading = intTradeHeading;
                angular.forEach(scope.listData, function(val,key){
                    val.showNotes = false;
                    val.note = '';
                });

                scope.pageChanged = function(page){
                    scope.setPagingData(page, scope.listData, scope.itemsPerPage);
                };

                scope.setPagingData = function(page, list, itemsPerPage) {
                    scope.totalItems = list.length;
                    scope.currentPage = page;
                    var pagedData = list.slice((page - 1) * itemsPerPage, page * itemsPerPage);
                    scope.displayList = pagedData;
                };

                scope.$watch('listData', function(newVal, oldVal){
                    if(newVal.length > 0) {
                        scope.setPagingData(scope.currentPage, newVal, scope.itemsPerPage);
                    }
                });
            }

        }
    }
})();