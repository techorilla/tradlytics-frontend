(function () {
    'use strict';
    angular.module('app.dashboard.settings')
        .controller('appDropDown', appDropDown);

    function appDropDown(appFormats, list, endPoint, page, settings, crud, $state, deModal){
        var vm = this;
        _init();

        function _init(){
            vm.appFormats = appFormats;
            vm.page = page;
            vm.list = list;
            vm.endPoint = endPoint;
            vm.title = $state.current.title;
            vm.addDropDown = addDropDown;
            vm.openAddDropDownModal = openAddDropDownModal;
            vm.modalController = modalController;
        }

        function openAddDropDownModal(title, endPoint, page, size, controller){
            var resolve = {
                endPoint: function() {
                    return endPoint;
                },
                title: function(){
                    return title;
                }
            };
            deModal.openModal(page, size, controller, resolve);
        }

        function modalController($scope, title, endPoint){
            $scope.title = title;
            $scope.endPoint = endPoint;
            $scope.name;
            $scope.addDropDown = addDropDown
        }

        function addDropDown(endPoint, name){
            settings.dropDown[crud.CREATE](endPoint, name).then(function(response){
                vm.list.push(response.obj);
                // deModal.dismiss();
            }, function(error){
                // deModal.dismiss();
            });
        }


    }

})();