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
        .directive('productCard', productCard);

    /* @ngInject */
    function productCard($state, utilities, $filter, appConstants){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/productCard/productCard.html',
            scope: {
                productItem:'=',
                colSize:'@'
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){
                scope.colSize = scope.colSize ?  scope.colSize  : '4';
                scope.appConstants = appConstants;
                scope.productImage = $filter('productPicture')(scope.productItem.image);
                console.log(scope.business);
            }

        }
    }

}());
