/**
 * @ngdoc overview
 * @name app.authentication
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.authentication', [])
    .config(configuration);

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
