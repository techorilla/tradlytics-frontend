/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.widgets')
      .directive('blogCard', blogCard);

  /** @ngInject */
  function blogCard(appFormats) {
    return {
      restrict: 'E',
      templateUrl: 'app/widgets/blogCard/blogCard.html',
      scope:{
        researchId:'=',
        imageUrl: '=',
        canEdit:'=',
        canDelete:'=',
        isDraft: '=',
        displayWeb: '=',
        onDisplayWeb: '&',
        onDelete:'&',
        title:'=',
        createdOn: '=',
        comments: '=',
        reads: '=',
        userPic: '=',
        author:'=',
        onEdit:'&',
        visitors: '='
      },
      link: link
    };

    function link(scope){
      scope.edit = function(researchId){
        scope.onEdit({'researchId': researchId});
      };
      scope.changeWebDisplay = function(researchId){
        scope.onDisplayWeb({'researchId': researchId})
      };
      scope.delete=function(researchId){
        scope.onDelete({'researchId': researchId});
      };
      scope.appFormats = appFormats;
    }
  }
})();