(function () {

    'use strict';

    angular.module('app.core')
        .run(restInterceptors);



    function restInterceptors(Restangular, httpStatus, $state) {

        Restangular.setErrorInterceptor(errorInterceptor);
        Restangular.addResponseInterceptor(responseInterceptor);


        function responseInterceptor(response,deffered,responseHandler){
            return response;
        }

        function errorInterceptor(response, deferred, responseHandler){
            if(response.status === httpStatus.FORBIDDEN) {
                $state.go('login');
                return false;
            }
            return true;
        }

    }


}());