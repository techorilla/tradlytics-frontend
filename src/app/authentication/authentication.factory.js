





/**
 * @ngdoc service
 * @name app.authentication.authentication
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.authentication').factory('authentication', authentication);


    function authentication(Restangular, apiEndPoints, $state, $http, $cookies, toastr, httpStatus, utilities, $auth){

        var loginApi = Restangular.all(apiEndPoints.login);
        var logOutApi = Restangular.all(apiEndPoints.logout);
        var userData = {};

        return {
            login: login,
            logout: logout,
            getUserData: getUserData,
            setUserData: setUserData,
            getUserBusinessId: getUserBusinessId,
            authenticate: authenticate
        };

        function authenticate(provider){
            $auth.authenticate(provider);s
        }

        function getUserBusinessId(){
            return getUserData().data.businessId
        }

        function getUserData(update){
            if(_.isEmpty(userData) || update){
                return loginApi.customGET().then(function(response){
                    setUserData(response.userData);
                    return getUserData();
                });
            }
            return userData;
        }

        function setUserData(data){
            userData.data = data;
        }

        function login(form, username, password){
            loginApi.post({
                'username':username,
                'password': password
            }).then(function(response){
                console.log(response);
                userData.data = response['userData'];
                $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
                $http.defaults.headers.put['X-CSRFToken'] = $cookies.get('csrftoken');
                $state.go('dashboard.main');
            }, function(error){
                if(error['data']==='INVALID_CREDENTIALS' && error['status'] === httpStatus.NOT_FOUND){
                    toastr.error('You username or password seems to be incorrect!','Invalid Credentials')
                }
                console.log(error);
            }).finally(function(){
                utilities.resetFormValidation(form)
            });
        }

        function logout(){
            logOutApi.post().then(function(response){
                if(response['success']){
                    $state.go('login')
                }
            });
        }
    }
}());
