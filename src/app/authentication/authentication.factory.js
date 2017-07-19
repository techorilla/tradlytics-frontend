





/**
 * @ngdoc service
 * @name app.authentication.authentication
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.authentication').factory('authentication', authentication);


    function authentication(Restangular, apiEndPoints, $state, $http, $cookies, toastr, httpStatus, utilities,
                            $auth, localStorageService, loaderModal){
        var authAPI = Restangular.all(apiEndPoints.authentication.basic);
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

        function authenticate(provider, callback){
            loaderModal.open();
            $auth.authenticate(provider).then(function(res){
                if(res.data.success){
                    toastr.success(res.message);
                    callback();
                }
                else{
                    toastr.error(res.data.message);
                }
                loaderModal.close();
            }, function(err){
                toastr.error('Unable to save your google analytics token');
            }).finally(function(){
                loaderModal.close();
            });
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
                userData.data = response['userData'];
                $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
                $http.defaults.headers.put['X-CSRFToken'] = $cookies.get('csrftoken');
                var lastPage = localStorageService.get('lastState');
                if(lastPage && lastPage.stateOnLogin && lastPage.stateOnLogin !== "login"){
                    $state.go(lastPage.stateOnLogin,lastPage.stateParamsOnLogin);
                }
                else{
                    $state.go('dashboard.main');
                }

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
                    var lastState = {
                        stateOnLogin: $state.current.name,
                        stateParamsOnLogin: $state.params
                    };
                    localStorageService.set('lastState',lastState);
                    $state.go('login')
                }
            });
        }
    }
}());
