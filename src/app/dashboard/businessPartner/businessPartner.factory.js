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
        var bpAPI = Restangular.all(apiEndPoints.bp.main);

        var bpBasicAPI = Restangular.all(apiEndPoints.bpBasic);
        var bpBankAPI = Restangular.all(apiEndPoints.bpBank);
        var bpProductsAPI = Restangular.all(apiEndPoints.bpProducts);
        var bpContactPersonAPI = Restangular.all(apiEndPoints.bpContactPerson);
        var bpContactNumberAPI = Restangular.all(apiEndPoints.bpContactPerson);

        return {

            setBusinessPartner: setBusinessPartner,
            addBusinessPartner: addBusinessPartner,
            addBPContactPerson: addBPContactPerson,
            addNewBankAccount: addNewBankAccount,
            addBusinessPartnerContact: addBusinessPartnerContact,
            addBusinessPartnerProduct: addBusinessPartnerProduct,


            updateBusinessPartner:updateBusinessPartner,
            editBPContactPerson: editBPContactPerson,
            editBankAccount: editBankAccount,

            getBusinessPartner: getBusinessPartner,
            getBusinessPartnerList: getBusinessPartnerList,
            getBusinessPartnerComplete: getBusinessPartnerComplete,
            getBusinessPartnerLocation: getBusinessPartnerLocation,

            deleteBusinessPartner: deleteBusinessPartner,
            deleteBusinessPartnerContact: deleteBusinessPartnerContact,
            deleteBusinessPartnerBankDetail: deleteBusinessPartnerBankDetail,
            deleteBusinessPartnerContactNumber: deleteBusinessPartnerContactNumber,
            deleteBusinessPartnerProduct: deleteBusinessPartnerProduct,



        };

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
                    bpContactPersonAPI.remove({'contact_id':id}).then(callback);
                }
            });
        }

        function deleteBusinessPartnerBankDetail(bpName, accountTitle, accountNumber, id, callback){
            modalFactory.alertModal(bpName,'Bank Account ' + accountNumber + ' of title ' +accountTitle + ' of Business Partner ' , 'Delete').then(function(res){
                if(res){
                    bpBankAPI.remove({'bank_id':id}).then(callback);
                }
            });
        }

        function deleteBusinessPartnerContactNumber(bpName, contactNumber, contactType, id, callback){
            modalFactory.alertModal(bpName, contactType + ' Number ' + contactNumber + ' of Business Partner' , 'Delete').then(function(res){
                if(res){
                    bpContactNumberAPI.remove({'cont_num_id':id}).then(callback);
                }
            });
        }

        function addNewBankAccount(bankDetails){
            return bpBankAPI.customPOST({bankDetails: bankDetails});
        }

        function editBankAccount(bankDetails){
            return bpBankAPI.customPUT({bankDetails: bankDetails})
        }

        function addBusinessPartnerContact(contact){
            return bpContactNumberAPI.customPOST({contact: contact});
        }

        function addBPContactPerson(contactPerson){
            return bpContactPersonAPI.customPOST({contactPerson: contactPerson});
        }

        function editBPContactPerson(contactPerson){
            return bpContactPersonAPI.customPUT({contactPerson: contactPerson});
        }


        function addBusinessPartnerProduct(bpProduct)
        {
            return bpProductsAPI.customPOST({bpProduct: bpProduct});
        }

        function deleteBusinessPartnerProduct(bpProduct)
        {
            return bpProductsAPI.customPUT({bpProduct: bpProduct});
        }


        // Business Partner Basic

        function getBusinessPartnerComplete(id){
            return bpBasicAPI.get({'bpId': id});
        }

        function deleteBusinessPartner(name, id ,callback){
            modalFactory.alertModal(name,'Business Partner', 'Delete').then(function(res){
                if(res){
                    bpBasicAPI.remove({'bp_id':id}).then(callback);
                }
            });
        }

        function addBusinessPartner(businessPartner,callback){
            return bpBasicAPI.customPOST({businessPartner: businessPartner}).then(callback);
        }

        function updateBusinessPartner(businessPartner,callback){
            return bpBasicAPI.customPUT({businessPartner: businessPartner}).then(callback);
        }




        function getBusinessPartnerList(){
            return bpBasicAPI.get('all');
        }




        function getBusinessPartnerLocation(businessId, query){
            return bpAPI.customGET(businessId+'/location',{'q':query})
        }

    }

}());
