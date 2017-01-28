/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BusinessPartnerInfo
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.businessPartner')
        .controller('BusinessPartnerInfo', BusinessPartnerInfo);

    /* @ngInject */
    function BusinessPartnerInfo(routing,modalFactory, originConfig, businessPartner, $state,toastr, bp, crud, navigation){
        var vm = this;
        init();

        function init(){
            vm.businessPartner = bp;
            routing.addRecentlyViewItems(vm.businessPartner.gen[0].bp_Name);
            vm.singleConfig = originConfig;
            vm.editBusinessPartnerBasic = editBusinessPartnerBasic;
            vm.deleteBusinessPartner = deleteBusinessPartner;
        }

        /////////////////////

        /**
         * @ngdoc method
         * @name deleteBusinessPartner
         * @param {number} num number is the number of the number
         * @methodOf app.businessPartner.controller:BusinessPartnerInfo
         * @description
         * My Description rules
         */

        function deleteBusinessPartner(name, id){
            businessPartner.deleteBusinessPartner(name, id,function(response){
                if (response.success) {
                    $state.go('shell.businessPartner');
                }
            });
        }

        /**
         * @ngdoc method
         * @name editBusinessPartnerBasic
         * @param {number} num number is the number of the number
         * @methodOf app.businessPartner.controller:BusinessPartnerInfo
         * @description
         * My Description rules
         */

        function editBusinessPartnerBasic(){
            businessPartner.setBusinessPartner(vm.businessPartner);
            $state.go('shell.businessPartner.addBusinessPartner',{operation: crud.UPDATE, id:vm.businessPartner.gen[0].bp_ID});
        }
    }

}());
