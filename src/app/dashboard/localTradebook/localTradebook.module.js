(function () {
    'use strict';

    angular
        .module('app.dashboard.localTradeBook', [])
        .config(configuration);

    function configuration(){
        $stateProvider
            .state('dashboard.localTradeBook', {
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
    }

})();
