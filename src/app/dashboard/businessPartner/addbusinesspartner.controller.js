/**
 * @ngdoc controller
 * @name app.businessPartner.controller:AddBusinessPartner
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.dashboard.businessPartner')
		.controller('AddBusinessPartner', AddBusinessPartner);

  /* @ngInject */
	function AddBusinessPartner(toastr,$stateParams,bpTypes,contractTypes, originConfig, businessPartner, $state, appFormats){
		var vm = this;
        init();

        function init(){
            vm.appFormats = appFormats;
            vm.possibleBPTypes= bpTypes;
            vm.buyerContractTypes=contractTypes;
            vm.businessPartner = {};
            vm.editMode = false;
            vm.singleConfig = originConfig;
            vm.saveBusinessPartner = saveBusinessPartner;
            vm.updateBusinessPartner = updateBusinessPartner;
            initializeBusinessPartner();



        }

        function initializeBusinessPartner(){
            if($stateParams.operation){
                if(businessPartner.getBusinessPartner()){
                    vm.businessPartner.general=businessPartner.getBusinessPartner().gen[0];
                    vm.editMode = true;
                }
                else{
                    $state.go('shell.businessPartner.view',{id:$stateParams.id});
                }
            }
            else{
                vm.businessPartner.general = {
                    bp_Name:'',
                    bp_website:'',
                    bp_isBuyer:false,
                    bp_isSupplier:false,
                    bp_isBroker:false,
                    bp_isShipper:false,
                    bp_onDoniContact:false,
                    bp_credibilityIndex:0,
                    bp_country:'',
                    bp_address: ''
                };
            }
        }

        function saveBusinessPartner(){
            if(!vm.businessPartnerForm.$invalid){
                var bp = vm.businessPartner.general;
                console.log(bp);
                if(!(bp.bp_isBroker || bp.bp_isShipper || bp.bp_isBuyer || bp.bp_isSeller)){
                    toastr.error('Business partner should have one type', 'Error');
                    return;
                }
                businessPartner.addBusinessPartner(vm.businessPartner.general,function(response){
                    if (response.success) {
                        $state.go('shell.businessPartner.view',{id:response.data});
                    }
                });
            }
            else{
                toastr.error("Incorrect fields entered", 'Error');
            }

        }

        function updateBusinessPartner(){
            if(!vm.businessPartnerForm.$invalid){
                var bp = vm.businessPartner.general;
                console.log(bp);
                if(!(bp.bp_isBroker || bp.bp_isShipper || bp.bp_isBuyer || bp.bp_isSeller)){
                    toastr.error('Business partner should have one type', 'Error');
                    return;
                }
                businessPartner.updateBusinessPartner(vm.businessPartner.general,function(response){
                    if (response.success) {
                        $state.go('shell.businessPartner.view',{id:vm.businessPartner.general.bp_ID});
                    }
                });
            }
            else{
                toastr.error("Incorrect fields entered", 'Error');
            }
        }







    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:AddBusinessPartner
     * @description
     * My Description rules
     */

	}

}());
