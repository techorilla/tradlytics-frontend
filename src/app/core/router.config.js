/**
 * @ngdoc overview
 * @name app.core
 * @description Configuration block for routing
 */

(function(){

    'use strict';

    angular.module('app.core')
        .config(configuration)
        .run(routingEvents);

    /* @ngInject */
    function configuration($urlRouterProvider){
        $urlRouterProvider.otherwise('/login');
    }

    /* @ngInject */
    function routingEvents($rootScope, $uibModalStack){
        //on routing error
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
            //do some logging and toasting
        });

        //on routing error
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            $uibModalStack.dismissAll();
            //do some title setting
            $rootScope.pageTitle = toState.title || 'Doni Enterprises';
            $rootScope.bgBackgroundClass = toState.bgBackgroundClass || '';
            if(toState.pageHeader){
                if(toState.pageHeader.title){
                    $rootScope.headerTitle = toState.pageHeader.title;
                }
                if(toState.pageHeader.subTitle){
                    $rootScope.headerSubTitle = toState.pageHeader.subTitle;
                }
                $rootScope.headerAnchor = (toState.pageHeader.headerAnchor) ? toState.pageHeader.headerAnchor : [];
                $rootScope.goBack = toState.pageHeader.goBack || false;
            }
            else{
                $rootScope.headerAnchor = [];
                $rootScope.goBack = false;
            }
            fromState.wentTo = toState.name;
            toState.params = toParams;
            if(toState.wentTo !== fromState.name){

                toState.prevState = fromState.name;
                toState.prevParam = fromParams;
            }
        });
    }

}());
