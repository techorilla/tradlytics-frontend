(function () {
    'use strict';

    angular
        .module('app.dashboard.localTradeBook', [])
        .config(configuration);

    function configuration(){
        $stateProvider
            .state('dashboard.internalTradeBook', {
                url:'/tradeBook',
                subNav: true,
                subNavTitle: 'Internal Trade Book',
                pageHeader:{
                    subTitle: 'Business',
                    title:'Internal Trade',
                    headerAnchor: [
                        {
                            text: 'Add New Internal Trade',
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
