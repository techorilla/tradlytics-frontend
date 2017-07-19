/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.theme.components')
      .controller('MsgCenterCtrl', MsgCenterCtrl);

  /** @ngInject */
  function MsgCenterCtrl($scope, $sce, dashboard, $state) {

    _init();

    function _init(){
      $scope.notificationObj={};
      getUnReadNotificationList(true);
    }

    function getUnReadNotificationList(markRead){
      dashboard.getUnReadNotificationList(markRead).then(function(res){
        angular.forEach(res.unread_list, function(val, key){
          val.data = JSON.parse(val.data)
        });
        console.log(res);
        $scope.notificationObj = {
          count: res.unread_count,
          list: res.unread_list
        }
      })
    }

    $scope.goToState = function(state, stateParams){
      $state.go(state, stateParams);
    };


    $scope.getMessage = function(msg) {
      var text = msg.template;
      if (msg.userId || msg.userId === 0) {
        text = text.replace('&name', '<strong>' + $scope.users[msg.userId].name + '</strong>');
      }
      return $sce.trustAsHtml(text);
    };
  }
})();