(function(){

    'use strict';

    angular
        .module('app.widgets')
        .directive('vesselCard', vesselCard);

    /* @ngInject */
    function vesselCard($state, utilities, $filter, appConstants){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/vesselCard/vesselCard.template.html',
            scope: {
                vessel:'=',
                colSize: '@'
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){
                scope.editVesselDetails = editVesselDetails;
                scope.appConstants = appConstants;
            }

            function editVesselDetails(id){
                
            }

        }
    }

}());