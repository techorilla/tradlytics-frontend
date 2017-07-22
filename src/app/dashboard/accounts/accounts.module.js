(function () {
    'use strict';

    angular.module('app.dashboard.accounts', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('dashboard.accounts', {
                url: '/accounts',
                abstract: true,
                title: 'Accounts',
                views: {
                    'content@dashboard': {
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
            .state('dashboard.accounts.main', {
                url: '/accounts',
                title: 'Accounts',
                views:{
                    'content@dashboard.accounts':{
                        templateUrl:'app/dashboard/accounts/dashboard.html',
                        controller: 'AccountDashboard as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Accounts',
                    title:'Dashboard',
                    headerAnchor: [
                        {
                            text: 'Commission Flow',
                            state: 'dashboard.accounts.taccounts'
                        },
                        {
                            text: 'Invoices',
                            state: 'dashboard.accounts.invoice'
                        }
                    ]
                }
            })

            .state('dashboard.accounts.invoice',{
                url:'/invoice',
                views:{
                    'content@dashboard.accounts':{
                        templateUrl:'app/dashboard/accounts/invoice/invoice.html',
                        controller: 'Invoice as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Invoices',
                    title:'Manager',
                    back: true
                }
            })

            .state('dashboard.accounts.invoiceForm',{
                url:'/:fileId/:invoiceId',
                views:{
                    'content@dashboard.accounts':{
                        templateUrl:'app/dashboard/accounts/invoice/invoiceForm.html',
                        controller: 'InvoiceForm as vm'
                    }
                },
                pageHeader:{
                    goBack: true
                },
                resolve:{
                    invoice: function(accounts, $stateParams, loaderModal, $rootScope){
                        loaderModal.open();
                        return accounts.getInvoiceObj($stateParams.fileId, $stateParams.invoiceId).then(function(response){
                            loaderModal.close();
                            if($stateParams.invoiceId === 'new'){
                                $rootScope.headerTitle = 'New Invoice';
                                $rootScope.headerSubTitle = 'File Id ' + $stateParams.fileId ;

                            }
                            else{
                                $rootScope.headerSubTitle = 'File Id ' + $stateParams.fileId ;
                                $rootScope.headerTitle = 'Invoice No. ' + $stateParams.invoiceId;
                            }

                            return response.invoiceObj;
                        });
                    }
                },
            })

            .state('dashboard.accounts.taccounts',{
                url:'/commissionFlow',
                views:{
                    'content@dashboard.accounts':{
                        templateUrl:'app/dashboard/accounts/taccounts/taccounts.html',
                        controller: 'TAccounts as vm'
                    }
                }
            });
    }
})();