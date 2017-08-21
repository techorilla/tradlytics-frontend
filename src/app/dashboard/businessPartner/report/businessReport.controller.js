/**
 * @ngdoc controller
 * @name app.businessPartner.controller:AddBusinessPartner
 * @description < description placeholder >
 */

(function() {

    'use strict';

    angular
        .module('app.dashboard.businessPartner')
        .controller('BusinessReport', BusinessReport);

    /* @ngInject */
    function BusinessReport(toastr, businessPartner, $state, appFormats, businessReport) {
        var vm = this;
        _init();

        function _init(){
            console.log(businessReport);
        }
    }
})();
