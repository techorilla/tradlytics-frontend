/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BpBankDetails
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.dashboard.businessPartner')
		.controller('BpBankDetails', BpBankDetails);

  /* @ngInject */
	function BpBankDetails(originConfig, bp, businessPartner, toastr, navigation){
		var vm = this;
        init();
        function init(){
            vm.businessPartner = bp;
            vm.singleConfig = originConfig;
            vm.showBankDetailForm = (vm.businessPartner.bank.length === 0);
            vm.addBankDetails = addBankDetails;
            vm.subBankDetails = subBankDetails;
            vm.saveBankDetails = saveBankDetails;
            vm.deleteBusinessPartnerBankDetails = deleteBusinessPartnerBankDetails;
            vm.editBusinessPartnerBankDetails = editBusinessPartnerBankDetails;
            if(vm.businessPartner.bank.length === 0){
                addBankDetails();
            }
        }

        function addBankDetails(){
            vm.businessPartner.newBankDetails = {
                bankName:'',
                accountTitle:'',
                accountNumber:'',
                accountCountry:'',
                branchAddress:''
            };
            vm.showBankDetailForm = true;
        }

        function subBankDetails(updated){
            if(vm.editingBankDetails){
                if(updated){
                    vm.businessPartner.bank.push(updated);
                }
                else{
                    vm.businessPartner.bank.push(vm.currentlyEditingBank);
                }
                vm.currentlyEditingBank = vm.businessPartner.newBankDetails = {};
                vm.editingBankDetails = false;
            }
            else{
                vm.businessPartner.newBankDetails = {};
            }
            navigation.resetFormValidation(vm.bankDetailsForm);
            vm.showBankDetailForm = false;
            vm.editingBankDetails = false;
        }

        function saveBankDetails(){
            if(vm.bankDetailsForm.$valid){
                if(!vm.editingBankDetails){
                    vm.businessPartner.newBankDetails.bp_ID = vm.businessPartner.gen[0].bp_ID;
                    businessPartner.addNewBankAccount(vm.businessPartner.newBankDetails).then(function(res){
                        if (res.data.success) {
                            vm.businessPartner.newBankDetails.bankDetails_ID = res.data.bankId;
                            vm.businessPartner.bank.push(vm.businessPartner.newBankDetails);
                            subBankDetails();
                        }
                    });
                }
                else{
                    businessPartner.editBankAccount(vm.businessPartner.newBankDetails).then(function(res){
                        if (res.data.success) {
                            subBankDetails(vm.businessPartner.newBankDetails);
                        }
                        else{
                            subBankDetails();
                        }
                    },function(){
                        subBankDetails();
                    });
                }

            }
            else{
                toastr.error('Incomplete or invalid bank account form', "Error");
            }
        }

        function deleteBusinessPartnerBankDetails(bpName, accountTitle, accountNumber, id, index){
            businessPartner.deleteBusinessPartnerBankDetail(bpName, accountTitle, accountNumber, id,function(response){
                if (response.success) {
                    vm.businessPartner.bank.splice(index,1);
                    if(vm.businessPartner.bank.length === 0){
                        subBankDetails();
                        vm.addBankDetails();
                    }
                }
            });
        }

        function editBusinessPartnerBankDetails(index){
            vm.editingBankDetails = true;
            vm.currentlyEditingBank = angular.copy(vm.businessPartner.bank[index]);
            vm.businessPartner.newBankDetails = vm.businessPartner.bank[index];
            vm.businessPartner.bank.splice(index,1);
            vm.showBankDetailForm = true;
        }
	}

}());
