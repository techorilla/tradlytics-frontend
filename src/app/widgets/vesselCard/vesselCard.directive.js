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
                if(scope.shippingLine){
                    scope.logo = $filter('shippingLineLogo')(scope.shippingLine.logo);
                }
                else{
                    scope.logo = $filter('shippingLineLogo')(scope.shippingLine)
                }

            }

            function editVesselDetails(id){
                $state.go('dashboard.shipping.vessel.form', {'id': id})
            }

        }
    }

}());