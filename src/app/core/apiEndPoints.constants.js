/**
 * @ngdoc object
 * @name app.core.constant:httpStatus
 * @description Commonly consumed HTTP Request Codes exposed as an injectable object
 * @example
 <pre>
 angular.module("someModule", [])
 .controller("some", controller);

 function controller(httpStatus, someService){
  var vm = this;
  someService.get().then(function(res){
    if(res.status === httpStatus.OK){
      vm.users = res.data;
    }
   })
  };
 </pre>
 */

(function(){

    'use strict';

    var apiEndPoints = {
        login: 'login',
        logout: 'logout',
        user:'user',
        bp:{
            main:'bp_partner',
            basic:'basic',
            bank:'bank',
            location:'location',
            contactPerson:'contact_person',
            contactNumber:'contact_number',
            product:'product'
        },
        bpBasic: 'businessPartner/basic',
        bpBank: 'businessPartner/bank',
        bpProducts: 'businessPartner/product',
        bpContactPerson: 'businessPartner/contact/person',
        bpContactNumber: 'businessPartner/contact/number',
        transactionBasic: 'transactions/basic',
        transactionCommission: 'transactions/commission',
        transactionContract: 'transactions/contract',
        transactionDocument: 'transactions/document',
        transactionNote: 'transactions/note',
        transactionSecondary: 'transactions/secondary',
        tabFilters: 'tabFilters',
        dropDown:{
            main: 'dropDown',
            businessType: 'business_type',
            contactType: 'contact_type',
            contractType: 'contract_type',
            designation: 'designation',
            productQuality: 'product_quality',
            transactionStatus: 'transaction_status'
        },
        product: 'product'

    };

    angular
        .module('app.core')
        .constant('apiEndPoints', apiEndPoints)

}());


