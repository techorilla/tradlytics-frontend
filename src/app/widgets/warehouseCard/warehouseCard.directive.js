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
        .directive('warehouseCard', warehouseCard);

    /* @ngInject */
    function warehouseCard($state, utilities, $filter, baConfig, inventory){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/warehouseCard/warehouseCard.html',
            scope: {
                warehouse:'=',
                colSize:'@'
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){
                scope.dashboardColors = baConfig;
                scope.openWarehouseProductStockReport = inventory.openWarehouseProductStockReport;
                scope.openWarehouseBusinessStockReport = inventory.openWarehouseBusinessStockReport;
            }

        }


    }

}());