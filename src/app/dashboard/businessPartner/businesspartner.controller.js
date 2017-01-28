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
	function BusinessPartner(businessPartner,routing,crud){
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
            routing.addRecentlyViewItems('Business Partner Directory');
            vm.selectedBPTypes = [];
            vm.selectedOrigin = [];
            vm.allBusinessPartner = {};
            vm.allBusinessPartner.data = [];
            vm.bpToRemove = [];
            vm.searchBusinessPartner = '';

            vm.onBpTypesSelectedChanged = onBpTypesSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;

            vm.allBusinessPartner.tableHeadings = [
                {name: 'Name', stSort:'', stPlaceholder:''},
                {name:'Contact Person', stSort:'bp_Cont_fullName', stPlaceholder:''},
                {name:'Origin', stSort:'bp_Cont_fullName', stPlaceholder:''},
                {name:'Type', stSort:'bp_Cont_fullName', stPlaceholder:''},
                {name:'Rating', stSort:'bp_Cont_fullName', stPlaceholder:''},
                {name:'Last Transaction On', stSort:'bp_Cont_fullName', stPlaceholder:''}
            ];
            vm.headerAnchor = [
                {
                    text: 'Add new Business Partner',
                    state: 'shell.businessPartner.addBusinessPartner({operation:'+ crud.CREATE +' })'
                }
            ];
            businessPartner.getBusinessPartnerList().then(function(response){
                console.log(response);
                vm.allBusinessPartner.data = response.businessPartners;
            });

            function onBpTypesSelectedChanged(selectedList){
                vm.selectedBPTypes = _.map(selectedList, 'model');
                filterChanged();
            }

            function onCountrySelectedChanged(selectedList){
                vm.selectedOrigin = _.map(selectedList, 'origin_name');
                filterChanged();
            }

            function filterChanged(){
                vm.bpToRemove = [];
                angular.forEach(vm.allBusinessPartner.data,function(bp,key){
                    var removeBp = false;
                    var bpShowByType = false;
                    angular.forEach(vm.selectedBPTypes,function(val){
                        bpShowByType = bpShowByType || (bp[val] === true);
                    });
                    removeBp = removeBp || ((vm.selectedOrigin.indexOf(bp.bp_country))<=-1);
                    if(removeBp ||!bpShowByType){
                        vm.bpToRemove.push(bp.bp_ID);
                    }
                });
            }
        }
	}

}());
