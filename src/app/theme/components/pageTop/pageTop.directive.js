/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.theme.components')
      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop(authentication) {
    return {
      restrict: 'E',
      link: link,
      templateUrl: 'app/theme/components/pageTop/pageTop.html'
    };

    function link(scope, elem, attrs){
      scope.userData = authentication.getUserData();
      scope.logout = function(){
        authentication.logout();
      }
    }
  }

})();