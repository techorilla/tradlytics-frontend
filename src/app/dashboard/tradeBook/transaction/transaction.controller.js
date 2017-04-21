(function () {
    'use strict';
    angular.module('app.dashboard.tradeBook')
        .controller('Transaction', transaction);

    function transaction(){
        console.log('hello');
        var vm = this;
        _init();

        function _init(){
            console.log('hello')
        }


    }

})();
