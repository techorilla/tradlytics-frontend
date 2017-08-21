/**
 * @ngdoc service
 * @name app.businessPartner.businessPartner
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.businessPartner')
        .factory('businessPartner', businessPartner);

    /* @ngInject */
    function businessPartner(Restangular, apiEndPoints, modalFactory){

        var businessPartner = {};
        var businessPartnerListIndex = { index: 'A'};
        var bpAPI = Restangular.all(apiEndPoints.bp.main);

        return {
            getBusinessPartnerListIndex: getBusinessPartnerListIndex,
            setBusinessPartnerListIndex: setBusinessPartnerListIndex,
            addBusinessBasic: addBusinessBasic,
            deleteBusinessPartner: deleteBusinessPartner,
            updateBusinessBasic: updateBusinessBasic,
            deleteBusiness: deleteBusiness,
            saveBusinessLocations: saveBusinessLocations,
            saveBusinessContactPersons: saveBusinessContactPersons,
            saveBusinessContacts: saveBusinessContacts,
            saveBusinessBanks: saveBusinessBanks,


            setBusinessPartner: setBusinessPartner,
            addBPContactPerson: addBPContactPerson,
            addNewBankAccount: addNewBankAccount,
            addBusinessPartnerContact: addBusinessPartnerContact,
            addBusinessPartnerProduct: addBusinessPartnerProduct,
            editBPContactPerson: editBPContactPerson,
            editBankAccount: editBankAccount,

            getBusinessPartner: getBusinessPartner,
            getBusinessPartnerList: getBusinessPartnerList,
            getBusinessComplete: getBusinessComplete,
            getBusinessPartnerLocation: getBusinessPartnerLocation,


            deleteBusinessPartnerContact: deleteBusinessPartnerContact,
            deleteBusinessPartnerBankDetail: deleteBusinessPartnerBankDetail,
            deleteBusinessPartnerContactNumber: deleteBusinessPartnerContactNumber,

            getNewBusinessObj: getNewBusinessObj,
            getNewBusinessBankObj: getNewBusinessBankObj,
            getNewBusinessAddressObj: getNewBusinessAddressObj,
            getNewBusinessContactObj: getNewBusinessContactObj,
            getNewBusinessContactPersonObj: getNewBusinessContactPersonObj,

            saveBusinessSettings: saveBusinessSettings,
            getBusinessSettings: getBusinessSettings,
            getBusinessReport: getBusinessReport


        };

        function getBusinessReport(businessId){
            console.log(businessId);
            return bpAPI.one(apiEndPoints.bp.report, businessId).customGET();
        }

        function getBusinessPartnerListIndex(){
            return businessPartnerListIndex.index;
        }

        function setBusinessPartnerListIndex(index){
            return businessPartnerListIndex.index = index
        }



        function getBusinessSettings(){
            return bpAPI.customGET(apiEndPoints.bp.self)
        }

        function saveBusinessSettings(obj){
            return bpAPI.customPOST(obj, apiEndPoints.bp.self)
        }

        // Business Location

        function saveBusinessLocations(businessId, locations){
            return bpAPI.customPOST({
                'locations': locations,
                'bpId': businessId
            }, apiEndPoints.bp.location);
        }

        // Business Contact Person

        function saveBusinessContactPersons(businessId, contactPersons){
            return bpAPI.customPOST({
               'contactPersons': contactPersons,
                'bpId': businessId
            }, apiEndPoints.bp.contactPerson);
        }

        // Business Contacts

        function saveBusinessContacts(businessId, contacts){
            return bpAPI.customPOST({
                'contacts': contacts,
                'bpId': businessId
            }, apiEndPoints.bp.contactNumber);
        }

        // Business Banks

        function saveBusinessBanks(businessId, banks){
            return bpAPI.customPOST({
                'banks': banks,
                'bpId': businessId
            }, apiEndPoints.bp.bank);
        }


        // Business Basic

        function getNewBusinessAddressObj(business){

            return {
                'address': '',
                'city': '',
                'state': '',
                'country': '',
                'isPrimary': (business.locations.length === 0)
            }
        }

        function getNewBusinessObj(){
            var businessObj = {
                'name': '',
                'website': '',
                'databaseId': '',
                'ntn': '',
                'bpType': [],
                'banks': [],
                'locations': [],
                'contacts': [],
                'contactPersons': []
            };
            businessObj.banks.push(getNewBusinessBankObj());
            businessObj.locations.push(getNewBusinessAddressObj(businessObj));
            businessObj.contacts.push(getNewBusinessContactObj());
            businessObj.contactPersons.push(getNewBusinessContactPersonObj());
            return businessObj;
        }

        function getNewBusinessBankObj(){
            return {
                'accountTitle': '',
                'accountNumber': '',
                'accountCountry': '',
                'accountCity': '',
                'accountAddress': '',
                'bankName': ''
            }
        }

        function getNewBusinessContactObj(){
            return {
                'contactNumber': '',
                'contactType': ''
            }
        }

        function getNewBusinessContactPersonObj(){
            return {
                'isPrimary': false,
                'fullName': '',
                'designation': '',
                'email': null,
                'primaryNumber': '',
                'secondaryNumber': ''
            }
        }

        ////////////////////

        /**
         * @ngdoc
         * @name app.businessPartner.businessPartner#testFunction
         * @methodOf app.businessPartner.businessPartner
         *
         * @description < description placeholder >
         * @example
         * <pre>
         * businessPartner.testFunction(id);
         * </pre>
         * @param {int} entity id
         */
        function setBusinessPartner(bp){
            businessPartner = bp;
        }

        function getBusinessPartner(){
            return businessPartner;
        }



        function deleteBusinessPartnerContact(bpName, contactName, id, callback){
            modalFactory.alertModal(bpName,'Contact Person ' + contactName + 'Contact Person of Business Partner', 'Delete').then(function(res){
                if(res){
                    bpAPI.remove({'contact_id':id}).then(callback);
                }
            });
        }

        function deleteBusinessPartnerBankDetail(bpName, accountTitle, accountNumber, id, callback){
            modalFactory.alertModal(bpName,'Bank Account ' + accountNumber + ' of title ' +accountTitle + ' of Business Partner ' , 'Delete').then(function(res){
                if(res){
                    bpAPI.remove({'bank_id':id}).then(callback);
                }
            });
        }

        function deleteBusinessPartnerContactNumber(bpName, contactNumber, contactType, id, callback){
            modalFactory.alertModal(bpName, contactType + ' Number ' + contactNumber + ' of Business Partner' , 'Delete').then(function(res){
                if(res){
                    bpAPI.remove({'cont_num_id':id}).then(callback);
                }
            });
        }

        function addNewBankAccount(bankDetails){
            return bpAPI.customPOST({bankDetails: bankDetails});
        }

        function editBankAccount(bankDetails){
            return bpAPI.customPUT({bankDetails: bankDetails})
        }

        function addBusinessPartnerContact(contact){
            return bpAPI.customPOST({contact: contact});
        }

        function addBPContactPerson(contactPerson){
            return bpAPI.customPOST({contactPerson: contactPerson});
        }

        function editBPContactPerson(contactPerson){
            return bpAPI.customPUT({contactPerson: contactPerson});
        }


        function addBusinessPartnerProduct(bpProduct)
        {
            return bpAPI.customPOST({bpProduct: bpProduct});
        }

        function deleteBusinessPartnerProduct(bpProduct)
        {
            return bpAPI.customPUT({bpProduct: bpProduct});
        }


        // Business Partner Basic

        function getBusinessComplete(id){
            return bpAPI.customGET(apiEndPoints.bp.basic, {'bpId': id});
        }


        function deleteBusinessPartner(businessId){
            return bpAPI.customDELETE(apiEndPoints.bp.basic+'/'+businessId)
        }

        function addBusinessBasic(imagesData, business){
            var body = new FormData();
            if(imagesData){
                var file = new File([imagesData.resultBlob], "logo.png");
                body.append('logo', file);
            }
            body.append('data', JSON.stringify({
                'name': business.name,
                'website': business.website,
                'ntn': business.ntn,
                'bpType': business.bpType,
                'databaseId': business.databaseId
            }));

            return bpAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPOST(
                body,
                apiEndPoints.bp.basic,
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function updateBusinessBasic(imagesData, business){
            var body = new FormData();
            if(imagesData){
                var file = new File([imagesData.resultBlob], "logo.png");
                body.append('logo', file);
            }
            body.append('data', JSON.stringify({
                'bpId': business.bpId,
                'name': business.name,
                'website': business.website,
                'ntn': business.ntn,
                'bpType': business.bpType,
                'databaseId': business.databaseId
            }));

            return bpAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPUT(
                body,
                apiEndPoints.bp.basic,
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function deleteBusiness(name, id ,callback){
            modalFactory.alertModal(name,'Business Partner', 'Delete').then(function(res){
                if(res){
                    bpAPI.remove({'bp_id':id}, apiEndPoints.bp.basic).then(callback);
                }
            });
        }

        function getBusinessPartnerList(alpha){
            return bpAPI.customGET(apiEndPoints.bp.list, {
                'alpha': alpha
            });
        }

        function getBusinessPartnerLocation(query){
            return bpAPI.customGET(apiEndPoints.bp.location,{'q':query})
        }

    }

}());
