(function () {
    'use strict';
    angular.module('app.dashboard.user')
        .controller('User', User);

    function User(allUsers, appFormats, $state){
        var vm = this;
        _init();

        function _init(){
            vm.showForm = false;
            vm.allUsers = allUsers;
            vm.appFormats = appFormats;
            vm.addNewUser = addNewUser;
            vm.editUser = editUser;

        }

        function editUser(userId){
            $state.go('dashboard.user.profile', {id:userId})
        }

        function addNewUser(){
           $state.go('dashboard.user.profile', {id: 'new'})
        }
    }

})();
