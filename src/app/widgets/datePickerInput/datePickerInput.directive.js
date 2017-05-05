/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('datePickerInput', datePickerInput);

    /** @ngInject */
    function datePickerInput() {
        return {
            restrict: 'E',
            link: link,
            templateUrl: 'app/widgets/datePickerInput/datePickerInput.html',
            replace:true,
            scope:{
                date: '=',
                name: '@'

            }
        };
    }

    function link(scope, elem, attrs){
       scope.isOpen = false;
       if(!scope.date){
           scope.date = new Date();
       }
       scope.open = function(){
           scope.isOpen = !scope.isOpen;
       }
    }
})();