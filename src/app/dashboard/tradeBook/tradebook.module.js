/**
 * @ngdoc overview
 * @name app.dashboard.tradeBook
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.tradeBook', [])
        .config(configuration);

    /* @ngInject */
    function configuration($stateProvider){

        $stateProvider
            .state('dashboard.tradeBook', {
                url:'/tradeBook',
                subNav: true,
                subNavTitle: 'Trade Book',
                pageHeader:{
                    subTitle: 'Business',
                    title:'Trade Book',
                    headerAnchor: [
                        {
                            text: 'Add new Transaction',
                            state: 'dashboard.transaction({id:"new"})'
                        }
                    ]
                },
                views:
                {
                    'content@dashboard':{
                        templateUrl: 'app/dashboard/tradeBook/tradeBook.html',
                        controller: 'TradeBook as vm'
                    }
                }
            })
            .state('dashboard.transaction', {
                url: '/trade/:id',
                title:'Trade',
                pageHeader:{
                    subTitle: 'Add New',
                    title:'Transaction',
                    goBack: true
                },
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/tradeBook/transaction/transaction.html',
                        controller:'Transaction as vm'
                    }
                }
            })
            .state('dashboard.transactionView', {
                url:'/tradeView/:id',
                title: 'Trade',
                resolve:{
                    trade: function(tradeBook, $stateParams, loaderModal, $rootScope){
                        loaderModal.open();
                        return tradeBook.getTransactionDetail($stateParams.id).then(function(response){
                            loaderModal.close();
                            $rootScope.headerTitle = response.transaction.basic.fileNo;
                            return response.transaction
                        });
                    }
                },
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/tradeBook/transaction/transactionView.html',
                        controller: 'TransactionView as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'File No',
                    goBack: true
                },
            });

    }

}());
