/**
 * @ngdoc directive
 * @name app.widgets.directive:pageHeader
 * @scope true
 * @param {object} test test object
 * @restrict E
 *
 * @description < description placeholder >
 *
 */

(function(){

    'use strict';

    angular
        .module('app.widgets')
        .directive('pageHeader', pageHeader);

    /* @ngInject */
    function pageHeader($state, $rootScope){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/pageHeader/pageHeader.template.html',
            scope: {
                subHeading: '@',
                heading: '@',
                buttonList: '=',
                goBack:'='
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){

            _init();
            function _init(){
                scope.rootScope = $rootScope;
            }
            scope.goToBack = function(){
                if($state.current.prevState){
                    $state.go($state.current.prevState,$state.current.prevParam);
                }
                else{
                    try{
                        $state.go('^');
                    }
                    catch(err){
                        $state.go('dashboard.main');
                    }

                }
            };
        }
    }

}());
