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
                name: '@',
                blank: '='

            }
        };
    }

    function link(scope, elem, attrs){
       scope.isOpen = false;
       scope.dateFormat = 'dd-MMMM-yyyy';
       if(!scope.date && !scope.blank){
           scope.date = new Date();
       }
       else if((typeof scope.date)==='string'){
           scope.date = new Date(scope.date);
       }
       scope.open = function(){
           scope.isOpen = !scope.isOpen;
       }
    }
})();