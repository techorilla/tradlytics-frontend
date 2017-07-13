/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.theme.components')
      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop(authentication, $state, dropDownConfig) {
    return {
      restrict: 'E',
      link: link,
      templateUrl: 'app/theme/components/pageTop/pageTop.html'
    };

    function link(scope, elem, attrs){
      _init();

      function _init(){
        scope.searchOptions = [
          {name: 'International Trade By File Id', id: 'int_trade_file_id'},
          {name: 'International Trade By BL/No.', id: 'int_trade_bl_no'},
          {name: 'International Trade By Contract Number', id: 'int_trade_contract_id'},
          {name: 'International Trade By Invoice No.', id: 'int_trade_invoice_no'}
        ];
        vm.searchObj = {
          query: '',


        }
        scope.searchTypeConfig = dropDownConfig.getBasicDropDownConfig(false);
      }

      scope.goToSettings = function(){
        $state.go('dashboard.settings.transactionStatus');
      };
      scope.userData = authentication.getUserData();
      scope.logout = function(){
        authentication.logout();
      }
    }
  }

})();