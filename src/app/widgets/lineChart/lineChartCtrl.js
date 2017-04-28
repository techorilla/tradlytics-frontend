/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.widgets')
      .controller('LineChartCtrl', lineChartCtrl);

  /** @ngInject */
  function lineChartCtrl($scope, baConfig, layoutPaths, baUtil, utilities) {
    var chartType = ($scope.chartType) ? $scope.chartType : 'column';
    var layoutColors = baConfig.colors;
    var chartColors = utilities.chartColors();
    var graphColor = baConfig.theme.blur ? '#21b799' : layoutColors.primary;
    
    var chart = makeChart();

    $scope.$watch('chartData', function(){
      console.log($scope.chartData);
      chart = makeChart();
    });




    function makeChart(){
      var graphs = [];
      angular.forEach($scope.chartValues, function(val, key){
        console.log(val);
        graphs.push({
          id: 'g'+key,
          bullet: 'none',
          useLineColorForBulletBorder: true,
          lineColor: chartColors[key],
          lineThickness: 1,
          negativeLineColor: layoutColors.danger,
          type: chartType,
          valueField: val,
          fillAlphas: 1,
          fillColorsField: 'lineColor'
        });
      });

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
        graphs: graphs,
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