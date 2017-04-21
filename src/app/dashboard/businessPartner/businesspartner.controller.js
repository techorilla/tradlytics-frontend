/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BusinessPartner
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.businessPartner')
        .controller('BusinessPartner', BusinessPartner);

    /* @ngInject */
    function BusinessPartner(fileReader, $state, $stateParams, $q, businessPartner, dropDownConfig, $filter,
                             deModal, $scope, allBusiness, toastr, loaderModal){
        var vm = this;
        init();

        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.businessPartner.controller:BusinessPartner
         * @description
         * My Description rules
         */
        function init(){
            vm.showForm = false;
            vm.selectedBPTypes = [];
            vm.selectedOrigin = [];
            vm.bpToRemove = [];
            vm.searchBusinessPartner = '';
            vm.countryConfig = {};
            vm.bankCountryConfig = {};
            vm.countryOptions = {};
            vm.stateConfig = {};
            vm.cityConfig = {};
            vm.bpTypeConfig = {};
            vm.bpTypeOptions = {};
            vm.contactTypeConfig = {};
            vm.contactTypeOptions = {};
            vm.allBusiness = allBusiness;

            vm.cancel = cancel;
            vm.onBpTypesSelectedChanged = onBpTypesSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;

            vm.addBusinessPartner = addBusinessPartner;
            vm.editBusinessPartner = editBusinessPartner;
            vm.addBusinessContact = addBusinessContact;
            vm.addBusinessBank = addBusinessBank;
            vm.addContactPerson = addContactPerson;
            vm.addBusinessAddress = addBusinessAddress;
            vm.isPrimaryChange = isPrimaryChange;

            vm.removeBusinessLocation = removeBusinessLocation;
            vm.removeBusinessBank = removeBusinessBank;
            vm.removeContactPerson = removeContactPerson;
            vm.removeBusinessContact = removeBusinessContact;
            vm.removeBusinessBank = removeBusinessBank;

            vm.onCountryDropDownChange = onCountryDropDownChange;

            vm.uploadBusinessLogo = uploadBusinessLogo;
            vm.removeBusinessLogo = removeBusinessLogo;
            vm.getFile = getFile;

            vm.tableHeadings = [
                {name: 'Name', stSort:'', stPlaceholder:''},
                {name:'Contact Person', stSort:'bp_Cont_fullName', stPlaceholder:''},
                {name:'Origin', stSort:'bp_Cont_fullName', stPlaceholder:''},
                {name:'Type', stSort:'bp_Cont_fullName', stPlaceholder:''},
                {name:'Last Transaction On', stSort:'bp_Cont_fullName', stPlaceholder:''},
                {name:'Actions'}
            ];
            dropDownConfig.prepareByTypesDropDown(vm.bpTypeConfig, vm.bpTypeOptions);
            dropDownConfig.prepareContactNumberTypeDropDown(vm.contactTypeConfig, vm.contactTypeOptions);
            dropDownConfig.prepareCountryDropDown(vm.countryConfig, vm.countryOptions, onCountryDropDownChange, 1);
            dropDownConfig.prepareCountryDropDown(vm.bankCountryConfig, vm.countryOptions, onBankCountryDropDownChange, 1);
            dropDownConfig.prepareRegionDropDown(vm.stateConfig, null, null, onRegionDropDownChange);
            dropDownConfig.prepareCityDropDown(vm.cityConfig, null, null, null, 1);
            vm.saveBusiness = saveBusiness;
            vm.onSaveBusinessCallBack = onSaveBusinessCallBack;
            vm.onSaveBusinessBank = onSaveBusinessBank;
            vm.saveBusinessLocations = saveBusinessLocations;
            vm.saveBusinessContactPersons = saveBusinessContactPersons;
            vm.saveBusinessContactNumbers = saveBusinessContactNumbers;
            vm.saveBusinessBanks = saveBusinessBanks;
            vm.onBpTypesSelectedChanged = onBpTypesSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;

        }

        function onSaveBusinessBank(response){
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }

        function onSaveBusinessCallBack(response){
            vm.business.bpId = response.bpId;
        }

        function saveBusiness(imagesData, business, form){
            if(!business.bpId){
                return businessPartner.addBusinessBasic(imagesData, business);
            }
            else{
                return businessPartner.updateBusinessBasic(imagesData, business);
            }
        }

        function saveBusinessLocations(business){
            var locations = angular.copy(business.locations);
            angular.forEach(locations, function(value, key){
                delete value['stateOptions'];
                delete value['cityOptions'];
            });
            if(business.locations.length === 0){
                toastr.error('Business must have atleast one locations');
                var promise =  $q.defer();
                return promise.promise;
            }
            return businessPartner.saveBusinessLocations(business.bpId, locations)
        }

        function saveBusinessContactPersons(business){
            var contactPersons = angular.copy(business.contactPersons);
            return businessPartner.saveBusinessContactPersons(business.bpId, contactPersons)
        }

        function saveBusinessContactNumbers(business){
            var contacts = angular.copy(business.contacts);
            return businessPartner.saveBusinessContacts(business.bpId, contacts)
        }

        function saveBusinessBanks(business){
            var banks = angular.copy(business.banks);
            return businessPartner.saveBusinessBanks(business.bpId, banks);
        }

        function onRegionDropDownChange(value){
            if(value){
                angular.forEach(vm.business.locations, function(location, key){
                    if(location.state === value){
                        if(value === ''){
                           location.city = null;
                        }
                        else{
                            dropDownConfig.prepareCityDropDown(null,  location.cityOptions, location.country, value);
                        }
                    }
                });
            }
        }

        function onBankCountryDropDownChange(value){
            if(value){
                angular.forEach(vm.business.banks, function(bank, key){
                    if(bank.country === value){
                        bank.cityOptions.list = [];
                        if(value === ''){
                            bank.city = null;
                        }
                        else{
                            dropDownConfig.prepareCityDropDown(null,  bank.cityOptions, value, null);
                        }
                    }
                });
            }
        }

        function onCountryDropDownChange(value){
            if(value){
                angular.forEach(vm.business.locations, function(location, key){
                    if(location.country === value){
                        location.stateOptions.list = [];
                        if(value === ''){
                            location.state = null;
                        }
                        else{
                            dropDownConfig.prepareRegionDropDown(null,  location.stateOptions, value, null);
                            dropDownConfig.prepareCityDropDown(null,  location.cityOptions, value, null);
                        }

                    }
                });
            }
            else{
                location.state = '';
            }
        }

        function isPrimaryChange(list, row, value, attr){
            if(!value){
                toastr.error('One instance must be primary');
                row[attr] = true;
            }
            else{
                if(value){
                    angular.forEach(list, function(obj, key){
                        obj[attr] = false;
                    });
                    row[attr] = true;
                }
            }
        }


        function addBusinessAddress(business){
            business.locations.push(businessPartner.getNewBusinessAddressObj(business));
        }

        function addBusinessBank(business){
            business.banks.push(businessPartner.getNewBusinessBankObj());
        }

        function addContactPerson(business){
            business.contactPersons.push(businessPartner.getNewBusinessContactPersonObj());
        }

        function addBusinessContact(business){
            business.contacts.push(businessPartner.getNewBusinessContactObj());
        }

        function removeBusinessLocation(locations, location){
            var index = locations.indexOf(location);
            locations.splice(index,1);
            if(locations.length == 1){
                locations[0].isPrimary = true;
            }
        }

        function removeContactPerson(contactPersons, contactPerson){
            var index = contactPersons.indexOf(contactPerson);
            contactPersons.splice(index,1);
            if(contactPersons.length == 1){
                contactPersons[0].isPrimary = true;
            }
        }

        function removeBusinessContact(contacts, contact){
            var index = contacts.indexOf(contact);
            contacts.splice(index,1);
        }

        function removeBusinessBank(banks, bank){
            var index = banks.indexOf(bank);
            banks.splice(index,1);
        }

        function onBpTypesSelectedChanged(selectedList){
            vm.selectedBPTypes = _.map(selectedList, 'id');
            filterChanged();
        }

        function onCountrySelectedChanged(selectedList){
            vm.selectedOrigin = _.map(selectedList, 'code');
            filterChanged();
        }

        function filterChanged(){
            vm.businessToRemove = [];
            angular.forEach(vm.allBusiness,function(business,key){
                var intersection = _.intersection(vm.selectedBPTypes, business.bpTypeId);
                var removeBusiness = false;
                removeBusiness = removeBusiness || (intersection.length == 0);
                removeBusiness = removeBusiness || (vm.selectedOrigin.indexOf(business.countryCode)<=-1);
                if(removeBusiness){
                    vm.businessToRemove.push(business.bpId);
                }
            });
        }

        function uploadBusinessLogo(){
            var fileInput = document.getElementById('uploadBusinessLogo');
            fileInput.click();
        }

        function removeBusinessLogo(){
            vm.business.logo = null;
            vm.imagesData = null;
            vm.businessLogo = $filter('businessLogo')(vm.business.logo);
        }

        function getFile(picture){
            fileReader.readAsDataUrl(picture, $scope)
                .then(function (result) {
                    deModal.openImageCropper(result, 1, [{w:100, h:100}, {w: 200,h: 200}], {width:100, height:100},
                        function(imagesData){
                            vm.businessLogo = imagesData.croppedImages[1].dataURI;
                            console.log(imagesData);
                            vm.imagesData = imagesData;
                        });
                    // vm.picture = result;
                });
        }




        function addBusinessPartner(){
            vm.showForm = true;
            vm.business = businessPartner.getNewBusinessObj();
            vm.businessLogo = $filter('businessLogo')(vm.business.logo);
        }

        function editBusinessPartner(business){
            loaderModal.open();
            businessPartner.getBusinessComplete(business.bpId).then(function(res){
                vm.business = angular.copy(res.business);
                vm.showForm = true;
                loaderModal.close();
                console.log(vm.business.logo);
                vm.businessLogo = $filter('businessLogo')(vm.business.logo);
            });
        }

        function cancel(){
            loaderModal.open();
            businessPartner.getBusinessPartnerList().then(function(res){
                loaderModal.close();
                vm.showForm = false;
                vm.allBusiness = res.businessList;
            });

        }


    }

}());
