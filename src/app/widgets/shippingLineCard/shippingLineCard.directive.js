(function(){

    'use strict';

    angular
        .module('app.widgets')
        .directive('shippingLineCard', shippingLineCard);

    /* @ngInject */
    function shippingLineCard($state, utilities, $filter, appConstants, shipping,toastr){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'app/widgets/shippingLineCard/shippingLineCard.template.html',
            scope: {
                shippingLine:'=',
                colSize: '@',
                delete: '&'
            },
            replace: true
        };

        /////////////////////

        function link(scope, elem, attrs){
            _init();
            function _init(){
                scope.hide=false;
                scope.appConstants = appConstants;
                scope.editShippingLine = editShippingLine;
                scope.deleteShippingLine = deleteShippingLine;
                scope.logo = $filter('shippingLineLogo')(scope.shippingLine.logo);
            }

            function editShippingLine(id){
                $state.go('dashboard.shipping.lines.form', {id:id })
            }

            function deleteShippingLine(id){
                shipping.deleteShippingLine(id).then(function(res){
                    if(res.success){
                        toastr.success(res.message, 'Shipping Line Deleted');
                        console.log(scope.delete);
                        scope.delete({id: id});
                    }
                    else{
                        toastr.error(res.message, 'Delete Failed')
                    }
                })
            }

        }
    }

}());