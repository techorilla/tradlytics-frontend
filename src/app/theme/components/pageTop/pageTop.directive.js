/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.theme.components')
      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop(authentication, $state, $timeout, dashboard) {
    return {
      restrict: 'E',
      replace: true,
      link: link,
      templateUrl: 'app/theme/components/pageTop/pageTop.html'
    };

    function link(scope, elem, attrs){
      _init();

      function _init(){

        scope.loading=false;
        scope.searchResults = [];
        scope.resultType = '';
        scope.searchOptions = [
          {name: 'International Trade By File Id', id: 'int_trade_file_id'},
          {name: 'International Trade By BL/No.', id: 'int_trade_bl_no'},
          {name: 'International Trade By Contract Number', id: 'int_trade_contract_id'}
          // {name: 'International Trade By Invoice No.', id: 'int_trade_invoice_no'}
        ];
        scope.searchObj = {
          query: '',
          queryType: 'int_trade_file_id'
        };
        scope.lastSearch = {
          query:''
        };
        scope.searchQuery = searchQuery;
        scope.goToSearchItem = goToSearchItem;


      }


      
      function goToSearchItem(stateName, stateParams){
        scope.searchResults = [];
        scope.searchObj.query='';
        $state.go(stateName, stateParams);
      }

      function searchQuery(searchObj, lastSearch){
        $timeout(function () {
          if (searchObj.query.length >= 4) {
              lastSearch.query = searchObj.query;
              scope.loading = true;
              dashboard.searchQueryPageTop(searchObj).then(function(res){
                scope.loading = false;
                scope.searchResults = res.resultList;
                scope.resultType = res.resultType
              });
          }
          else{
            scope.searchResults = [];
          }
        }, 500);
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