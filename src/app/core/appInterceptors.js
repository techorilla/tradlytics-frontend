(function () {

    'use strict';

    angular.module('app.core')
        .config(corsHandler)
        .run(restInterceptors);


    function corsHandler($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.interceptors.push(function($cookies) {
            return {
                'request': function(config) {
                    config.headers['X-CSRFToken'] = $cookies.get('csrftoken');
                    return config;
                }
            };
        });
    }

    function restInterceptors(Restangular, httpStatus, $state, loaderModal) {

        Restangular.setErrorInterceptor(errorInterceptor);
        Restangular.addResponseInterceptor(responseInterceptor);
        Restangular.addFullRequestInterceptor(requestInterceptor);

        function requestInterceptor(element, operation, route, url, headers, params, httpConfig){
            var today = new Date();
            var timezoneHourDifference = (today.getTimezoneOffset()/60);
            console.log(element, operation, route, url, headers, params, httpConfig);
            var extendedHeader = {
                'Hour-Difference': timezoneHourDifference
            };
            return angular.extend(headers, extendedHeader);
        }


        function responseInterceptor(response,deffered,responseHandler){
            return response;
        }

        function errorInterceptor(response, deferred, responseHandler){
            if(response.status === httpStatus.FORBIDDEN) {
                loaderModal.close();
                $state.go('login');
                return false;
            }
            return true;
        }

    }


}());