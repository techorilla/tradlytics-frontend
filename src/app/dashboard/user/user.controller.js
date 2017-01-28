(function () {
    'use strict';
    angular.module('app.dashboard.user')
        .controller('User', User);

    function User(allUsers, appFormats){
        var vm = this;
        _init();

        function _init(){
            vm.allUsers = allUsers;
            vm.appFormats = appFormats;
        }
    }

})();
