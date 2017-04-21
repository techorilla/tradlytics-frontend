/**
 * @ngdoc overview
 * @name app.authentication
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.authentication', [])
        .config(configuration)
        .config(authentication);

    function authentication($authProvider){
        $authProvider.google({
            clientId: '146379198005-916tvuu5tgv19rpink6m0i8gmlgtinbn.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/analytics.readonly',
            responseType: 'code',
            url:'/api/auth/google_analytics/',
            redirectUri: window.location.origin
        });
    }

    /* @ngInject */
    function configuration($stateProvider){
        $stateProvider
            .state('login', {
                    url:'/login',
                    bgBackgroundClass: 'loginBackground',
                    views:{
                        '@': {
                            templateUrl:'app/authentication/auth.html',
                            controller:'Authentication as vm'
                        }
                    }
                }
            );
    }

}());
