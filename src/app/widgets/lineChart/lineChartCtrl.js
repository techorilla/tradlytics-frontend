/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.widgets')
      .controller('LineChartCtrl', lineChartCtrl);

  /** @ngInject */
  function lineChartCtrl($scope, baConfig, layoutPaths, baUtil) {
    var layoutColors = baConfig.colors;
    var graphColor = baConfig.theme.blur ? '#21b799' : layoutColors.primary;
    
    var chart = makeChart();

    $scope.$watch('chartData', function(){
      var chart = makeChart();
    });


    function makeChart(){
      return AmCharts.makeChart('amchart', {
        type: 'serial',
        theme: 'blur',
        marginTop: 15,
        marginRight: 15,
        dataProvider: $scope.chartData,
        categoryField: 'date',
        categoryAxis: {
          parseDates: true,
          gridAlpha: 0,
          color: layoutColors.defaultText,
          axisColor: layoutColors.defaultText
        },
        valueAxes: [
          {
            minVerticalGap: 50,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText
          }
        ],
        graphs: [
          {
            id: 'g0',
            bullet: 'none',
            useLineColorForBulletBorder: true,
            lineColor: baUtil.hexToRGB(graphColor, 0.3),
            lineThickness: 1,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'quantity',
            fillAlphas: 1,
            fillColorsField: 'lineColor'
          }
          // {
          //   id: 'g1',
          //   bullet: 'none',
          //   useLineColorForBulletBorder: true,
          //   lineColor: baUtil.hexToRGB(graphColor, 0.5),
          //   lineThickness: 1,
          //   negativeLineColor: layoutColors.danger,
          //   type: 'smoothedLine',
          //   valueField: 'value',
          //   fillAlphas: 1,
          //   fillColorsField: 'lineColor'
          // }
        ],
        chartCursor: {
          categoryBalloonDateFormat: 'DD MMM YYYY',
          categoryBalloonColor: '#684D61',
          categoryBalloonAlpha: 0.7,
          cursorAlpha: 0,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          valueLineAlpha: 0.5
        },
        dataDateFormat: 'DD MMM YYYY',
        export: {
          enabled: true
        },
        creditsPosition: 'bottom-right',
        zoomOutButton: {
          backgroundColor: '#fff',
          backgroundAlpha: 0
        },
        zoomOutText: '',
        pathToImages: layoutPaths.images.amChart
      });
    }


    function zoomChart() {
      chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
    }

    chart.addListener('rendered', zoomChart);
    zoomChart();
    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
})();