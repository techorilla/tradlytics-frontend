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
        .directive('docCard', docCard);

    /* @ngInject */
    function docCard($state, utilities){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/docCard/docCard.html',
            scope: {
                docInfo:'='
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){

            }

        }
    }

}());
