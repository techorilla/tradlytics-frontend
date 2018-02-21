/**
 * @ngdoc service
 * @name app.dashboard.tradeBook.tradeBook
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .factory('tradeBook', tradeBook);

    /* @ngInject */
    function tradeBook(apiEndPoints, Restangular, $state, appFormats, FileSaver, Blob, utilities, $http, $uibModal){

        var transactionAPI = Restangular.all(apiEndPoints.transaction.main);

        var productItemAPI = Restangular.all(apiEndPoints.productItem);

        // var transactionAPI =

        return {
            getNewTransaction: getNewTransaction,
            getTransactionList: getTransactionList,
            calculateCommission: calculateCommission,
            addTransaction: addTransaction,
            updateTransaction: updateTransaction,
            getTransactionDetail: getTransactionDetail,

            addTradeNote: addTradeNote,
            editTradeNote: editTradeNote,
            deleteTradeNote: deleteTradeNote,
            getAllNotesForTrade: getAllNotesForTrade,
            deleteTransactionDocument: deleteTransactionDocument,
            downloadTradeDocument: downloadTradeDocument,
            activateShipmentStatus: activateShipmentStatus,
            changeCompleteStatus: changeCompleteStatus,
            changeWashoutStatus: changeWashoutStatus,


            updateShippedInfo: updateShippedInfo,
            updateNotShippedInfo: updateNotShippedInfo,
            updateApprobationReceivedInfo: updateApprobationReceivedInfo,
            updateArrivedAtPortInfo: updateArrivedAtPortInfo,


            getCommissionCashFlow: getCommissionCashFlow,
            getTradebookDashbordData: getTradebookDashboardData,
            getTradeBusinessAnalytics: getTradeBusinessAnalytics,

            openTradeBookModal: openTradeBookModal,
            saveDisputeData: saveDisputeData


        };

        function saveDisputeData(disputeData, fileId, activate){
            var disputeDataPost = angular.extend(disputeData, {
                'fileId': fileId,
                'activate': activate
            });
            console.log(disputeDataPost);
            return transactionAPI.customPOST(disputeDataPost, apiEndPoints.transaction.dispute);
        }

        function getTradebookDashboardData(){
            return transactionAPI.customGET(apiEndPoints.transaction.dashboard)
        }

        function getCommissionCashFlow(fileId){
            return transactionAPI.customGET(apiEndPoints.transaction.cashFlow, {
                'fileId': fileId
            })
        }

        function getTradeBusinessAnalytics(dateRange){
            var data = angular.copy(dateRange);
            data = angular.extend(data, {
                'pageType': 'businessAnalytics'
            });
            return transactionAPI.customGET(apiEndPoints.transaction.analytics, data);
        }

        function updateShippedInfo(dataObj, transactionId){
            return transactionAPI.customPUT({
                'dataObj':dataObj,
                'transactionId': transactionId
            }, apiEndPoints.transaction.shippedInfo);
        }

        function updateNotShippedInfo(dataObj, transactionId){
            return transactionAPI.customPUT({
                'dataObj':dataObj,
                'transactionId': transactionId
            }, apiEndPoints.transaction.notShippedInfo);
        }

        function updateApprobationReceivedInfo(dataObj, transactionId){
            return transactionAPI.customPUT({
                'dataObj':dataObj,
                'transactionId': transactionId

            }, apiEndPoints.transaction.approbationReceivedInfo);
        }

        function updateArrivedAtPortInfo(dataObj, transactionId, earnedCommission){
            return transactionAPI.customPUT({
                'dataObj':dataObj,
                'transactionId': transactionId,
                'earnedCommission': earnedCommission
            }, apiEndPoints.transaction.arrivedAtPortInfo);
        }

        function changeWashoutStatus(transactionId, status, washOut){
            washOut.isWashout = status;
            return transactionAPI.customPOST({
                'transactionId': transactionId,
                'washOut': washOut
            }, apiEndPoints.transaction.washout);
        }

        function changeCompleteStatus(transactionId, completeObj){
            return transactionAPI.customPOST({
                'transactionId': transactionId,
                'completeObj': completeObj
            }, apiEndPoints.transaction.completeStatus);
        }

        function activateShipmentStatus(shipmentStatus, status, transactionId){
            return transactionAPI.customPOST({
                'shipmentStatus': shipmentStatus,
                'status': status,
                'transactionId': transactionId
            }, apiEndPoints.transaction.shipmentStatus)
        }

        function downloadTradeDocument(docId, fileName, fileType){
            return transactionAPI.withHttpConfig({responseType: 'arraybuffer'}).customGET(apiEndPoints.transaction.document+'/'+docId).then(function(response){
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                var file = new Blob([response], {type: fileType});
                var fileURL = (window.URL || window.webkitURL).createObjectURL(file);
                a.href = fileURL;
                a.download = fileName;
                a.click();
                a.remove();
                (window.URL || window.webkitURL).revokeObjectURL(file);
            })
        }

        function deleteTransactionDocument(docId){
            return transactionAPI.customDELETE(apiEndPoints.transaction.document+'/'+docId);
        }

        function getTransactionDetail(tradeId, full){
            return transactionAPI.customGET(apiEndPoints.transaction.basic,{
                'tradeId': tradeId,
                'full': full
            });
        }

        function getAllNotesForTrade(tradeId){
            return transactionAPI.customGET(apiEndPoints.transaction.note+'/'+tradeId)
        }

        function addTradeNote(tradeId, note){
            return transactionAPI.customPOST({
                'note': note,
                'tradeId': tradeId
            }, apiEndPoints.transaction.note);
        }

        function deleteTradeNote(tradeId, noteId){
            return transactionAPI.customDELETE(apiEndPoints.transaction.note+'/'+tradeId+'/'+noteId);
        }

        function editTradeNote(tradeId, noteId, note){
            return transactionAPI.customPUT({
                'note': note,
                'noteId': noteId,
                'tradeId': tradeId
            }, apiEndPoints.transaction.note)

        }

        function getTransactionList(dateRange, pageType){
            var dateRangeCopy = angular.copy(dateRange);

            dateRangeCopy =  angular.extend(dateRangeCopy, {
                'pageType': pageType
            });
            return transactionAPI.customGET(apiEndPoints.transaction.list, dateRangeCopy);
        }

        function addTransaction(transactionObj){
            return transactionAPI.customPOST(transactionObj, apiEndPoints.transaction.basic);
        }

        function updateTransaction(transactionObj){
            return transactionAPI.customPUT(transactionObj, apiEndPoints.transaction.basic);
        }

        function calculateCommission(transactionObj, quantity){
            var type = transactionObj.commission.typeId;
            var price = parseFloat(transactionObj.basic.price);
            var quantity = (quantity) ? parseFloat(quantity) : parseFloat(transactionObj.basic.quantity);
            var comm =  transactionObj.commission.commission;
            var commIntoPrice = 0;
            var brokerCommType = transactionObj.commission.buyerBrokerCommissionTypeId;
            var brokerIntoPrice = 0;
            var differance = parseFloat(transactionObj.commission.difference);
            var discount = parseFloat(transactionObj.commission.discount);
            var bComm = parseFloat(transactionObj.commission.buyerBrokerCommission);
            if(type){
                commIntoPrice = (parseInt(type) === 1) ? (comm) : (comm*0.01)*price;
            }
            if(brokerCommType){
                brokerIntoPrice = (parseInt(brokerCommType)===1) ? bComm : (bComm*0.01)*price;
            }
            var netCommission = (commIntoPrice - brokerIntoPrice + differance  - discount);

            return (netCommission * quantity);
        }

        function getNewTransaction(){
            return {
                id: null,
                basic:{
                    date: new Date(),
                    quantity: 0.00,
                    quantityFcl: 0.0,
                    buyerId: null,
                    sellerId: null,
                    productItemId: null,
                    contractualBuyerId: null,
                    price: 0.00,
                    fileId: null,
                    contractId: null,
                    packagingId: null,
                    shipmentEnd: (new Date()).addDays(30),
                    shipmentStart: null,
                    otherInfo: ''
                },
                commission:{
                    typeId: 1,
                    commission: 0,
                    difference: 0,
                    discount: 0,
                    buyerBrokerId: null,
                    buyerBrokerCommissionTypeId: 1,
                    buyerBrokerCommission: 0,
                    sellerBrokerId: null

                },
                productSpecification:{
                    moisture: null,
                    purity: null,
                    foreignMatter: null,
                    brokenSplits: null,
                    damaged: null,
                    greenDamaged: null,
                    weevilied: null,
                    otherColor: null,
                    wrinkled: null
                }
            }
        }


        function openTradeBookModal(reportType){
            $state.go('dashboard.transactionList', {reportType:reportType})

        }


    }

}());
