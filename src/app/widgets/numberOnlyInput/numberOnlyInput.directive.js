/**
 * @ngdoc directive
 * @name app.widgets.directive:numberOnlyInput
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
        .directive('numberOnlyInput', numberOnlyInput);

    /* @ngInject */
    function numberOnlyInput ($filter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/widgets/numberOnlyInput/numberOnlyInput.template.html',
            scope: {
                required: '=',
                inputValue: '=',
                inputName: '@',
                inputPlace: '@',
                noBorder: '=',
                currency: '='
            },
            link: function (scope) {

                scope.onFocus = function(){
                    scope.oldValue = scope.inputValue;
                };

                scope.onBlur = function(){
                    if(scope.inputValue === ''){
                        scope.inputValue = 0.00
                    }
                    else if(/[a-zA-Z!@#$%^&*()_+=/\\,]/i.test(scope.inputValue)){
                        scope.inputValue = scope.oldValue;
                    }
                };


            }
        };
    }


}());
