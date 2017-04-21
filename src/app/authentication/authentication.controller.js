/**
 * @ngdoc controller
 * @name app.authentication.controller:Authentication
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.authentication')
        .controller('Authentication', Authentication);

    /* @ngInject */
    function Authentication(authentication,$state){
        var vm = this;
        init();
        function init(){
            vm.username = '';
            vm.password = '';
            vm.login = login;
        }

        function login(form, username, password){
            if(form.$valid){
                authentication.login(form, username, password);
            }
        }
    }

}());
