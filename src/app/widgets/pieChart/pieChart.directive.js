
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
      .directive('pieChart', pieChart);

  /* @ngInject */
  function pieChart($state, $rootScope, utilities, baConfig, layoutPaths){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'app/widgets/pieChart/pieChart.template.html',
      scope: {
        id: '@',
        data: '=',
        valueField: '@'
      },
      replace: true
    };

    /////////////////////

    function link(scope, elem, attrs){
      _init();
      function _init(){
        var layoutColors = baConfig.colors;
        var id = elem[0].getAttribute('id');

        var pieChart = AmCharts.makeChart(id, {
          type: 'pie',
          startDuration: 0,
          theme: 'blur',
          addClassNames: true,
          color: layoutColors.defaultText,
          labelTickColor: layoutColors.borderDark,
          legend: {
            position: 'right',
            marginRight: 100,
            autoMargins: false
          },
          innerRadius: '40%',
          defs: {
            filter: [
              {
                id: 'shadow',
                width: '200%',
                height: '200%',
                feOffset: {
                  result: 'offOut',
                  in: 'SourceAlpha',
                  dx: 0,
                  dy: 0
                },
                feGaussianBlur: {
                  result: 'blurOut',
                  in: 'offOut',
                  stdDeviation: 5
                },
                feBlend: {
                  in: 'SourceGraphic',
                  in2: 'blurOut',
                  mode: 'normal'
                }
              }
            ]
          },
          dataProvider: scope.data,
          valueField: scope.valueField,
          titleField: 'transaction__product__name',
          export: {
            enabled: true
          },
          creditsPosition: 'bottom-left',
          autoMargins: false,
          marginTop: 10,
          alpha: 0.8,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          pullOutRadius: 0,
          pathToImages: layoutPaths.images.amChart,
          responsive: {
            enabled: true,
            rules: [
              // at 900px wide, we hide legend
              {
                maxWidth: 900,
                overrides: {
                  legend: {
                    enabled: false
                  }
                }
              },

              // at 200 px we hide value axis labels altogether
              {
                maxWidth: 200,
                overrides: {
                  valueAxes: {
                    labelsEnabled: false
                  },
                  marginTop: 30,
                  marginBottom: 30,
                  marginLeft: 30,
                  marginRight: 30
                }
              }
            ]
          }
        });

        pieChart.addListener('init', handleInit);

        pieChart.addListener('rollOverSlice', function (e) {
          handleRollOver(e);
        });

        function handleInit() {
          pieChart.legend.addListener('rollOverItem', handleRollOver);
        }

        function handleRollOver(e) {
          var wedge = e.dataItem.wedge.node;
          wedge.parentNode.appendChild(wedge);
        }
      }

    }
  }

}());
