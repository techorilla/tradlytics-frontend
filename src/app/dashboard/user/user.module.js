(function () {
    'use strict';

    angular.module('app.dashboard.user', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('dashboard.user', {
                url: '/user',
                abstract:true,
                title:'User Management',
                views: {
                    'content@dashboard':{
                        template:'<div ui-view="content"></div>'
                    }
                }
            })
            .state('dashboard.user.list',{
                url:'/all',
                pageHeader:{
                    subTitle: 'Manage',
                    title:'Users'
                },
                views:{
                    'content@dashboard.user':{
                        templateUrl:'app/dashboard/user/allUsers.html',
                        controller: 'User as vm'

                    }
                },
                resolve:{
                    allUsers: function(user){
                        return user.getAllUserProfile().then(function(response){
                            console.log(response);
                            return response.list;
                        })
                    }
                }
            })
            .state('dashboard.user.profile', {
                url: '/profile/:id',
                title:'User Profile',
                views: {
                    'content@dashboard.user':{
                        templateUrl:'app/dashboard/user/profile/profile.html',
                        controller:'ProfilePage as vm'
                    }
                },
                resolve:{
                    userProfile: function(user, $stateParams){
                        if($stateParams.id === 'new'){
                            return user.getNewUserObj()
                        }
                        else{
                            return user.getUserProfile($stateParams.id).then(function(response){
                                return response.user;
                            })
                        }
                    }
                }
            });

            $urlRouterProvider.when('/user','/user/all');
    }

})();
