/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BpContactNumbers
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.dashboard.businessPartner')
		.controller('BpContactNumbers', BpContactNumbers);

  /* @ngInject */
	function BpContactNumbers(toastr,bp,$stateParams,businessPartner,dropDownConfig){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:BpContactNumbers
     * @description
     * My Description rules
     */

        function init(){
            vm.businessPartner = bp;
            if(vm.businessPartner.contNum.length === 0){
                addContactNumber();
            }
            vm.contactTypeConfig = dropDownConfig.contactTypeConfig();
            vm.addContactNumber = addContactNumber;
            vm.subContactNumber = subContactNumber;
            vm.saveContactNumber = saveContactNumber;
            vm.deleteBusinessPartnerContactNumber = deleteBusinessPartnerContactNumber;
            vm.showContactForm = false;
            vm.showbpContactNumbers = false;
            vm.addingContactNumber = false;
        }

        function addContactNumber(){
            vm.businessPartner.newContactNumber = {
                contactNumber:'',
                contactType:''
            };
            vm.addingContactNumber = true;
        }

        function subContactNumber(){
            vm.businessPartner.newContactNumber = {};
            vm.addingContactNumber = false;
        }

        function saveContactNumber(){

            if(vm.addContactNumberForm.$valid){
                vm.businessPartner.newContactNumber.bp_ID = $stateParams.id;
                businessPartner.addBusinessPartnerContact(vm.businessPartner.newContactNumber).then(function(res){

                    if (res.data.success) {
                        vm.businessPartner.contNum = (vm.businessPartner.contNum) ? vm.businessPartner.contNum : [];
                        vm.businessPartner.newContactNumber.ph_ID = res.data.conNumID;
                        vm.businessPartner.contNum.push(vm.businessPartner.newContactNumber);
                        subContactNumber();
                    }
                });
            }
            else{
                toastr.error('Incomplete or invalid bank account form', "Error");
            }
        }

        function deleteBusinessPartnerContactNumber(bpName, contactNumber, contactType, id, index){
            businessPartner.deleteBusinessPartnerContactNumber(bpName, contactNumber, contactType, id,function(response){
                if (response.success) {
                    vm.businessPartner.contNum.splice(index,1);
                    if(vm.businessPartner.contNum.length === 0){
                        vm.addContactNumber();
                    }
                }
            });
        };


    }

}());
