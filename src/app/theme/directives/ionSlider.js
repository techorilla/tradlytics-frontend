/**
 * @author a.demeshko
 * created on 22.12.2015
 */
(function () {
  'use strict';

  angular.module('app.theme')
      .directive('ionSlider', ionSlider);

  /** @ngInject */
  function ionSlider($timeout) {
    return {
      restrict: 'EA',
      template: '<div></div>',
      replace: true,
      scope: {
        ngModel: '=',
        min: '=',
        max: '=',
        type: '@',
        prefix: '@',
        maxPostfix: '@',
        prettify: '=',
        prettifySeparator: '@',
        grid: '=',
        gridMargin: '@',
        postfix: '@',
        step: '@',
        hideMinMax: '@',
        hideFromTo: '@',
        from: '=',
        to: '=',
        disable: '=',
        onChange: '=',
        onFinish: '=',
        values: '=',
        timeout: '@'
      },
      link: function ($scope, $element) {

        $element.ionRangeSlider({
          min: $scope.min,
          max: $scope.max,
          type: $scope.type,
          prefix: $scope.prefix,
          maxPostfix: $scope.maxPostfix,
          prettify_enabled: $scope.prettify,
          prettify_separator: $scope.prettifySeparator,
          grid: $scope.grid,
          gridMargin: $scope.gridMargin,
          postfix: $scope.postfix,
          step: $scope.step,
          hideMinMax: $scope.hideMinMax,
          hideFromTo: $scope.hideFromTo,
          from: $scope.from,
          to: $scope.to,
          disable: $scope.disable,
          onChange: function(data){
            console.log('change',data);
            $scope.ngModel = data.from;
          },
          onFinish: function(data){
            var scope = $element.scope();
            scope.$apply(function(){
              scope.ngModel = data.from;
            });
          },
          values: $scope.values
        });



        $scope.$watch('min', function (value) {
          $timeout(function () {
            $element.data("ionRangeSlider").update({min: value});
          });
        }, true);
        $scope.$watch('max', function (value) {
          $timeout(function () {
            $element.data("ionRangeSlider").update({max: value});
          });
        });
        $scope.$watch('from', function (value) {
          $timeout(function () {
            $element.data("ionRangeSlider").update({from: value});
          });
        });
        $scope.$watch('to', function (value) {
          $timeout(function () {
            $element.data("ionRangeSlider").update({to: value});
          });
        });
        $scope.$watch('disable', function (value) {
          $timeout(function () {
            $element.data("ionRangeSlider").update({disable: value});
          });
        });
      }
    };
  }

})();