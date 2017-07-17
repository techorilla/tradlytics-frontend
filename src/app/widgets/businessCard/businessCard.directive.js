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
        .directive('businessCard', businessCard);

    /* @ngInject */
    function businessCard($state, utilities, $filter, appConstants){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/businessCard/businessCard.html',
            scope: {
                colSize:'@',
                business:'=',
                businessType: '@'
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){
                scope.colSize = scope.colSize ? scope.colSize : '4';
                scope.appConstants = appConstants;
                scope.businessLogo = $filter('businessLogo')(scope.business ? scope.business.logo : null);
            }

        }
    }

}());
