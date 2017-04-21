(function() {
  'use strict';

  angular.module('app.theme.components')
    .controller('baWizardCtrl', baWizardCtrl);

  /** @ngInject */
  function baWizardCtrl($scope, toastr) {
    var vm = this;

    vm.tabs = [];

    vm.tabNum = 0;
    vm.progress = 0;

    vm.addTab = function(tab) {
      tab.setPrev(vm.tabs[vm.tabs.length - 1]);
      vm.tabs.push(tab);
      vm.tabNum = 0;
      vm.tabs.forEach(function (t, tIndex) {
        tIndex == 0 ? t.select(true) : t.select(false);
      });
    };

    vm.onCancel = function(){
      $scope.onCancel({});
    };

    $scope.$watch(angular.bind(vm, function () {return vm.tabNum;}), calcProgress);

    vm.selectTab = function (tabNum) {
      vm.tabs[vm.tabNum].submit().then(function(res){
        if(res.success){
          if(vm.tabs[vm.tabNum].onSubmitCallback){
            vm.tabs[vm.tabNum].onSubmitCallback({'response':res});
          }
          if (vm.tabs[tabNum].isAvailiable()) {
            vm.tabNum = tabNum;
            vm.tabs.forEach(function (t, tIndex) {
              tIndex == vm.tabNum ? t.select(true) : t.select(false);
            });
          }
          toastr.success(res.message);
        }
        else{
          toastr.error(res.message);
        }
      });
    };

    vm.isFirstTab = function () {
      return vm.tabNum == 0;
    };

    vm.isLastTab = function () {
      return vm.tabNum == vm.tabs.length - 1 ;
    };

    vm.nextTab = function () {
      vm.selectTab(vm.tabNum + 1)
    };

    vm.previousTab = function () {
      vm.selectTab(vm.tabNum - 1)
    };

    function calcProgress() {
      vm.progress = ((vm.tabNum + 1) / vm.tabs.length) * 100;
    }
  }
})();

