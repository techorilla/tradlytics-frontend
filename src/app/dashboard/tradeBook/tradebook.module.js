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
            .state('dashboard.tradeDashboard', {
                url:'/tradeDashboard',
                subNav: true,
                subNavTitle: 'Trade Book',
                pageHeader:{
                    subTitle: 'Dashboard',
                    title:'International Trades',
                    headerAnchor: [
                        {
                            text: 'Add New Transaction',
                            state: 'dashboard.transaction({id:"new"})'
                        },
                        {
                            text: 'Trade Book',
                            state: 'dashboard.tradeBook'
                        }
                    ]
                },
                views:
                {
                    'content@dashboard':{
                        templateUrl: 'app/dashboard/tradeBook/tradeDashboard/tradeDashboard.html',
                        controller: 'TradeDashboard as vm'
                    }
                },
                resolve:{
                    dashboardData: function(tradeBook, $stateParams, loaderModal, $rootScope){
                        loaderModal.open();
                        return tradeBook.getTradebookDashbordData().then(function(response){
                            loaderModal.close();
                            return response.dashboardData
                        });
                    }
                }
            })
            .state('dashboard.tradeBook', {
                url:'/tradeBook',
                subNav: true,
                subNavTitle: 'Trade Book',
                pageHeader:{
                    subTitle: 'Business',
                    title:'Trade Book',
                    headerAnchor: [
                        {
                            text: 'Add New Transaction',
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
                },
                resolve:{
                    pageType: function(){
                        return 'tradeBook';
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
                        return tradeBook.getTransactionDetail($stateParams.id, true).then(function(response){
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
                }
            })
            .state('dashboard.internationalTradeAnalytics', {
                url:'/tradeAnalytics',
                title: 'Business Analytics',
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/tradeBook/businessAnalytics/businessAnalytics.html',
                        controller: 'TradeBusinessAnalytics as vm'
                    }
                },
                pageHeader:{
                    title: 'International Trade',
                    subTitle: 'Business Analytics',
                    goBack: true
                }
            })
            .state('dashboard.transactionList', {
                url:'/tradeReport/:reportType',
                title: 'Trade',
                resolve: {
                    reportType: function($stateParams){
                        return $stateParams.reportType;
                    },
                    data: function(tradeBook,loaderModal, $stateParams){
                        loaderModal.open();
                        return tradeBook.getTransactionList({}, $stateParams.reportType).then(function(res){
                            loaderModal.close();
                            return res
                        });
                    }

                },
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/tradeBook/tradeList.html',
                        controller: 'TradeList as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'File No',
                    goBack: true
                },
            })

        ;

    }

}());
