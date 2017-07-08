(function() {
  'use strict';

  angular.module('app.theme.components')
    .directive('baWizardStep', baWizardStep);

  /** @ngInject */
  function baWizardStep(toastr) {
    return {
      restrict: 'E',
      transclude: true,
      require: '^baWizard',
      scope: {
        form: '=',
        submitButtonTitle: '@',
        skip: '=',
        onNext: '&',
        onNextCallback: '&'
      },
      templateUrl:  'app/theme/components/baWizard/baWizardStep.html',
      link: function($scope, $element, $attrs, wizard) {
        $scope.selected = true;

        var tab = {
          onSubmitCallback: $scope.onNextCallback ? $scope.onNextCallback : null,
          title: $attrs.title,
          submitButtonTitle: $scope.submitButtonTitle,
          select: select,
          submit: submit,
          isComplete: isComplete,
          isAvailiable: isAvailiable,
          prevTab: undefined,
          setPrev: setPrev
        };

        wizard.addTab(tab);

        function select(isSelected) {
          if(isSelected) {
            $scope.selected = true;
          } else {
            $scope.selected = false;
          }
        }

        function submit() {
          console.log('hello');
          $scope.form && $scope.form.$setSubmitted(true);
          if($scope.form && $scope.form.$valid){
            return $scope.onNext({form: $scope.form});
          }
          else if($scope.form){
            toastr.error('Please enter missing fields', 'Invalid Form')
          }
        }

        function isComplete() {
          return $scope.form ? $scope.form.$valid : true;
        }

        function isAvailiable() {
          return tab.prevTab ? tab.prevTab.isComplete() : true;
        }

        function setPrev(pTab) {
          tab.prevTab = pTab;
        }
      }
    };
  }
})();