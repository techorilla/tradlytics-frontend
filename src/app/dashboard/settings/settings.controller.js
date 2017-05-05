(function () {
    'use strict';
    angular.module('app.dashboard.settings')
        .controller('settings', settings);

    function settings($state, user, inputFields, utilities, toastr, settings, appFormats, modalTemplates, crud, deModal,
                      apiEndPoints, businessPartner, loaderModal){
        var vm = this;
        _init();

        function _init(){
            vm.inputFields = inputFields;
            vm.passwordDetails = settings.getChangePasswordObj();
            vm.changePasswordSubmit = changePasswordSubmit;
            vm.appFormats = appFormats;
            vm.page = modalTemplates.CR_UP_BASIC_DROP_DOWN;
            vm.appDropDownList = [];
            vm.title = $state.current.title;
            vm.addDropDown = addDropDown;
            vm.openDropDownModal = openDropDownModal;
            vm.modalController = modalController;
            vm.getDropDownList = getDropDownList;
            vm.saveBusinessSettings = saveBusinessSettings;
            vm.getBusinessSettings = getBusinessSettings;
            vm.appDropDowns = [
                {
                    'title': 'Business Partner Type',
                    'endPoint': apiEndPoints.dropDown.businessType
                },
                {
                    'title': 'Contract Type',
                    'endPoint': apiEndPoints.dropDown.contractType
                },
                {
                    'title': 'Contact Type',
                    'endPoint': apiEndPoints.dropDown.contactType
                },
                {
                    'title': 'Designation',
                    'endPoint': apiEndPoints.dropDown.designation
                },
                {
                    'title': 'Transaction Status',
                    'endPoint': apiEndPoints.dropDown.transactionStatus
                },
                {
                    'title': 'Packaging',
                    'endPoint': apiEndPoints.dropDown.packaging
                },
                {
                    'title': 'Commission Type',
                    'endPoint': apiEndPoints.dropDown.commissionType
                }
            ];

            getDropDownList(vm.appDropDowns[0]);
        }

        function changePasswordSubmit(passwordForm, passwordObj){
            if(passwordForm.$valid){
                user.changePassword(passwordObj).then(function(res){
                    if(res.success){
                        toastr.success(res.message);
                        vm.passwordDetails = settings.getChangePasswordObj();
                        utilities.resetFormValidation(passwordForm);
                    }
                    else{
                        toastr.error(res.message);
                        vm.passwordDetails = settings.getChangePasswordObj();
                        utilities.resetFormValidation(passwordForm);
                    }
                })
            }
        }

        function getDropDownList(dropDown){
            vm.activedropDown = dropDown;
            return settings.dropDown[crud.READ](dropDown.endPoint).then(function(response){
                dropDown.list =  response.list;
            });
        }

        function openDropDownModal(title, endPoint, page, size, controller, name, id){
            var resolve = {
                endPoint: function() {
                    return endPoint;
                },
                title: function(){
                    return title;
                },
                name: function(){
                    return name;
                },
                id: function(){
                    return id
                }
            };
            vm.dropDownModal = deModal.openModal(page, size, controller, resolve);
        }

        function modalController($scope, title, endPoint, name, id){
            $scope.title = title;
            $scope.endPoint = endPoint;
            $scope.name = name;
            $scope.id = id;
            $scope.saveDropDown = ($scope.id) ? editDropDown : addDropDown;
        }

        function editDropDown(endPoint, name, id){
            settings.dropDown[crud.UPDATE](endPoint, name, id).then(function(response){
                if(response.success){
                    toastr.success(response.message);
                    var dropdown = _.find(vm.activedropDown.list,function(item){
                        return item.id = id;
                    });
                    dropdown.name = name;
                    deModal.dismissModal(vm.dropDownModal);
                }
                else{
                    toastr.error(response.message);
                    deModal.dismissModal(vm.dropDownModal);
                }
            });
        }

        function addDropDown(endPoint, name, id){
            settings.dropDown[crud.CREATE](endPoint, name).then(function(response){
                if(response.success){
                    toastr.success(response.message);
                    vm.activedropDown.list.push(response.obj);
                    deModal.dismissModal();
                }
                else{
                    toastr.error(response.message);
                    deModal.dismissModal();
                }
            });
        }

        function getBusinessSettings(){
            loaderModal.open();
            businessPartner.getBusinessSettings().then(function(response){
                vm.businessSettings = response.business
                loaderModal.close();
            })

        }

        function saveBusinessSettings(form, obj){
            if(form.$valid){
                loaderModal.open();
                businessPartner.saveBusinessSettings(obj).then(function(response){
                   if(response.success){
                       toastr.success(response.message);
                       loaderModal.close()
                   }
                   else{
                       toastr.error(response.message);
                       loaderModal.close();
                   }
                });
            }
            else{
                toastr.error('Please enter form correctly', 'Invalid Form')
            }
        }


    }

})();