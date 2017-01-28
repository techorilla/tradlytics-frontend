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
        .directive('deAccordian', deAccordian);

    /* @ngInject */
    function deAccordian($state, utilities){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/deAccordian/deAccordian.html',
            scope: {
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){
                scope.tabs = utilities.getStatesForAccordian($state.current);
                scope.tabClicked = tabClicked;
            }
            function tabClicked(event,tab, parentTab, index){
                if(!tab.hasAccordianDropDown){
                    tab.active=index;
                    if(parentTab){
                        parentTab.active=index;
                    }
                    console.log(tab.name);
                    $state.go(tab.name);
                }
                else{
                    event.stopPropagation();
                }
            }
        }
    }

}());
