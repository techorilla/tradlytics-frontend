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
        .directive('sparkLine', sparkLine);

    /* @ngInject */
    function sparkLine($rootScope){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/sparklines/sparkline.template.html',
            scope: {
                chartData:'='
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){
                prepareSparkLine();
            }

            function prepareSparkLine(){
                scope.chartData[scope.chartData.length-1]['bullet'] = 'round';
                AmCharts.makeChart( "line1", {
                    "type": "serial",
                    "theme": "light",
                    "dataProvider": scope.chartData,
                    "categoryField": "date",
                    "autoMargins": false,
                    "marginLeft": 0,
                    "marginRight": 5,
                    "marginTop": 0,
                    "marginBottom": 0,
                    "graphs": [ {
                        "valueField": "rate",
                        "bulletField": "bullet",
                        "showBalloon": false,
                        "lineColor": "greenyellow",
                        "lineThickness":5
                    } ],
                    "valueAxes": [ {
                        "gridAlpha": 0,
                        "axisAlpha": 0
                    } ],
                    "categoryAxis": {
                        "gridAlpha": 0,
                        "axisAlpha": 0,
                        "startOnAxis": true
                    }
                } );
            }
        }
    }

}());



