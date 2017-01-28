/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BpContactPersons
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.dashboard.businessPartner')
		.controller('BpContactPersons', BpContactPersons);

  /* @ngInject */
	function BpContactPersons(bp, businessPartner, toastr, navigation){
        var vm = this;
        init();
        function init(){
            vm.businessPartner = bp;
            vm.showContactPersonForm = (vm.businessPartner.contPers.length === 0);
            vm.addContactPerson = addContactPerson;
            vm.subContactPerson = subContactPerson;
            vm.saveContactPerson = saveContactPerson;
            vm.editBusinessPartnerContact = editBusinessPartnerContact;
            vm.deleteBusinessPartnerContact = deleteBusinessPartnerContact;
            if(vm.businessPartner.contPers.length === 0){
                addContactPerson();
            }
        }

        function deleteBusinessPartnerContact(bpName,contactName,id,index){
            businessPartner.deleteBusinessPartnerContact(bpName,contactName, id,function(response){
                if (response.success) {
                    vm.businessPartner.contPers.splice(index,1);
                    if(vm.businessPartner.contPers.length === 0){
                        vm.addContactPerson();
                    }
                }
            });
        }

        function editBusinessPartnerContact(index){
            vm.editingContact = true;
            vm.currentlyEditingContact = angular.copy(vm.businessPartner.contPers[index]);
            vm.businessPartner.newContactPerson = vm.businessPartner.contPers[index];
            vm.businessPartner.contPers.splice(index,1);
            vm.showContactPersonForm = true;
        }

        function saveContactPerson(){
            if(vm.contactPersonForm.$valid){
                if(!vm.editingContact){
                    vm.businessPartner.newContactPerson.bp_ID = vm.businessPartner.gen[0].bp_ID;
                    businessPartner.addNewBusinessPartnerContact(vm.businessPartner.newContactPerson).then(function(res){
                        if (res.data.success) {
                            vm.businessPartner.newContactPerson.bp_cont_ID = res.data.conPerId;
                            vm.businessPartner.contPers.push(vm.businessPartner.newContactPerson);
                            subContactPerson();
                        }
                        else{
                            subContactPerson();
                        }
                    });
                }
                else{
                    businessPartner.editBusinessPartnerContact(vm.businessPartner.newContactPerson).then(function(res){
                        if(res.data.success){
                            subContactPerson(vm.businessPartner.newContactPerson);
                        }
                        else{
                            subContactPerson();
                        }
                    },function(){
                        subContactPerson();
                    });

                }

            }
            else{
                toastr.error('Incomplete or invalid contact person form', "Error");
            }

        }

        function addContactPerson(){
            vm.businessPartner.newContactPerson = {
                bp_cont_id:'',
                bp_ID:'',
                bp_Cont_IsPrimary:false,
                bp_Cont_designation:'',
                bp_Cont_Email:'',
                bp_Cont_PrimaryNumber:'',
                bp_Cont_SecondryNumber:'',
                bp_Cont_fullName:''
            };
            vm.showContactPersonForm = true;
        }

        function subContactPerson(updated){
            if(!vm.editingContact){
                vm.businessPartner.newContactPerson = {};
            }
            else{
                if(updated){
                    vm.businessPartner.contPers.push(updated);
                }
                else{
                    vm.businessPartner.contPers.push(vm.currentlyEditingContact);
                }
                vm.currentlyEditingContact = vm.businessPartner.newContactPerson = {};
            }
            navigation.resetFormValidation(vm.contactPersonForm);
            vm.showContactPersonForm = false;
            vm.editingContact = false;

        }

	}

}());
