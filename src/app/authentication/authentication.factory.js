





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
                            $auth, localStorageService, loaderModal, baSidebarService){
        var authAPI = Restangular.all(apiEndPoints.authentication.basic);
        var loginApi = Restangular.all(apiEndPoints.login);
        var logOutApi = Restangular.all(apiEndPoints.logout);
        var userData = {};
        var sideBarDynamic = {
            userManagement: {
                title: 'User Management',
                icon: 'ion-android-contacts',
                stateRef: 'dashboard.user.list'
            },
            simpleTradeBook: {
                title: 'Trade Book',
                icon: 'ion-social-usd',
                stateRef: 'dashboard.tradeDashboard',
                priority: 7
            },
            optionTradeBook:{
                title: 'Trade Book',
                icon: 'ion-social-usd',
                priority: 7,
                subMenu: [
                    {
                        title: 'Dashboard',
                        stateRef: 'dashboard.tradeDashboard'
                    },
                    {
                        title: 'Business Analytics',
                        stateRef: 'dashboard.internationalTradeAnalytics'
                    },
                    {
                        title: 'Trade Book',
                        stateRef: 'dashboard.tradeBook'
                    }
                ]
            }


        }

        return {
            login: login,
            logout: logout,
            getUserData: getUserData,
            setUserData: setUserData,
            getUserBusinessId: getUserBusinessId,
            authenticate: authenticate,
            currentUserIsSuperUser: currentUserIsSuperUser,
            hasBusinessAnalyticsAccess: hasBusinessAnalyticsAccess
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

        function hasBusinessAnalyticsAccess(){
            return getUserData().data.rights.businessAnalytics
        }

        function currentUserIsSuperUser(){
            return getUserData().data.isSuperuser
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
            var userManagement = data.rights.userManagement;
            var businessAnalytics = data.rights.businessAnalytics;
            if(userManagement){
                baSidebarService.addStaticItem({
                    title: 'User Management',
                    icon: 'ion-android-contacts',
                    stateRef: 'dashboard.user.list'
                });
            }
            if(!businessAnalytics){
                var alreadyAdded = baSidebarService.itemAlreadyInItems(sideBarDynamic['simpleTradeBook']);
                if(!alreadyAdded){
                    baSidebarService.addStaticItem(sideBarDynamic['simpleTradeBook']);
                }
            }
            else{
                var alreadyAdded = baSidebarService.itemAlreadyInItems(sideBarDynamic['optionTradeBook']);
                if(!alreadyAdded){
                    baSidebarService.addStaticItem(sideBarDynamic['optionTradeBook']);
                }
            }
        }

        function login(form, username, password){
            loginApi.post({
                'username':username,
                'password': password
            }).then(function(response){
                setUserData(response['userData']);
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
