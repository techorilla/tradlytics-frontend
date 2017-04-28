/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('mapBubbles', lineChart);

    /** @ngInject */
    function lineChart() {
        return {
            restrict: 'E',
            controller: 'MapBubblePageCtrl',
            templateUrl: 'app/widgets/mapBubbles/mapBubbles.html',
            scope:{
                chartData: '=',
                chartValues: '=',
                heading: '@',
                mapChartData: '='
            }
        };
    }
})();