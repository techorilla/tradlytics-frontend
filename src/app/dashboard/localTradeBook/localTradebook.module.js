(function () {
    'use strict';

    angular
        .module('app.dashboard.localTradeBook', [])
        .config(configuration);

    function configuration($stateProvider){
        $stateProvider
            .state('dashboard.localTradeBook', {
                url:'/localTradeBook',
                subNav: true,
                subNavTitle: 'Trade Book',
                pageHeader:{
                    subTitle: 'Business',
                    title:'Local Trade Book',
                    headerAnchor: [
                        {
                            text: 'Add New Local Transaction',
                            state: 'dashboard.localTransactionForm({id:"new"})'
                        }
                    ]
                },
                views:
                {
                    'content@dashboard':{
                        templateUrl: 'app/dashboard/localTradeBook/localTradeBook.html',
                        controller: 'LocalTradeBook as vm'
                    }
                }
            })
            .state('dashboard.localTransactionForm', {
                url: '/localTrade/:id',
                title:'Local Trade',
                pageHeader:{
                    subTitle: 'Add New',
                    title:'Local Transaction',
                    goBack: true
                },
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/localTradeBook/transaction/localTradebookForm.html',
                        controller:'LocalTradeBookForm as vm'
                    }
                },
                resolve: {
                    localTrade : function(localTradeBook, $stateParams){
                        if($stateParams.id==='new'){
                            return localTradeBook.getNewLocalTrade();
                        }
                        else{
                            return localTradeBook.getTransactionDetail($stateParams.id, false).then(function(res){
                                return res.localTrade;
                            })
                        }
                    }
                }
            })
            .state('dashboard.localTransactionView',{
                url:'/localTradeView/:fileId',
                title: 'Local Trade',
                views:{
                    'content@dashboard':{
                        templateUrl: 'app/dashboard/localTradeBook/transaction/localTransactionView.html',
                        controller: 'LocalTradeBookView as vm'
                    }
                },
                resolve: {
                    localTrade : function(localTradeBook, $stateParams, loaderModal){
                        loaderModal.open();
                        return localTradeBook.getTransactionDetail($stateParams.fileId, false)
                            .then(function(res){
                                loaderModal.close();
                                return res.localTrade;
                            })
                    }
                }
            });
    }

})();
