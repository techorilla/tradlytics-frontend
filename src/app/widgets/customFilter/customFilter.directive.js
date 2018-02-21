/**
 * @ngdoc directive
 * @name app.widgets.directive:customFilter
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
      .directive('customFilter', customFilter);

  /* @ngInject */
  function customFilter(tabFilter, apiEndPoints, appConstants){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'app/widgets/customFilter/customFilter.template.html',
      scope: {
        page: '@',
        title:'@',
        endPoint: '@',
        heading: '@',
        subheading: '@',
        onSelectedValuesChanged:'&'
      },
      replace:true
    };

    /////////////////////



    function link(scope, elem, attrs){
      scope.dropDownValues = [];
      scope.intialized = true;
      console.log('is loading False');
      function onFilterSuccessCallBack(response){
        scope.appConstants = appConstants;
        scope.apiEndPoints = apiEndPoints;
        scope.noneSelected = response.list;
        scope.allSelected = angular.copy(scope.noneSelected);
        angular.forEach(scope.allSelected, function(value, key){
          value.selected = true;
        });
        scope.dropDownValues = angular.copy(scope.allSelected);
        scope.selectedValues = angular.copy(scope.dropDownValues);
        scope.onSelectedValuesChanged({selectedList:scope.selectedValues, initialized: scope.intialized});
        console.log('is loading False');
        scope.isLoading = false;
        scope.intialized = false;
      }

      initiateFilterType(scope.title);

      function initiateFilterType(title){
        scope.isLoading = true;
        if(scope.endPoint === apiEndPoints.dropDown.business){
          return tabFilter.getTabFilters(scope.endPoint, {'type': title, 'page': scope.page}).then(onFilterSuccessCallBack);
        }
        else{
          return tabFilter.getTabFilters(scope.endPoint).then(onFilterSuccessCallBack);
        }
      }


      scope.dropDownCallBack = function(res){
        if(res.success === false ){
          toastr.error(res.message,'Error '+bpType);
        }
      };


      scope.onSelectAll = onSelectAll;
      scope.onSingleSelectChange = onSingleSelectChange;
      scope.selectAll = true;
      scope.showOptions = false;
      scope.dropDownValues={};
      scope.textFilter = '';
      scope.selectedValues = [];
      scope.invertShowOptions = function(){
        scope.showOptions = !scope.showOptions;
      };
      scope.closeFilter = function(){
        if(scope.showOptions){
          scope.showOptions = false;
          scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
        }
      };



      function onSelectAll(selectAll){
        if(selectAll){
          scope.dropDownValues = angular.copy(scope.allSelected);
          scope.selectedValues = angular.copy(scope.dropDownValues);
        }
        else{
          scope.dropDownValues = angular.copy(scope.noneSelected);
          scope.selectedValues = [];

        }
      }

      function onSingleSelectChange(value,change,property){
        scope.selectAll = false;
        if(change){
          scope.selectedValues.push(value);
        }
        else{
          _.remove(scope.selectedValues, function(obj){
            return (obj[property]==value[property]);
          });
        }
      }

    }
  }

}());
