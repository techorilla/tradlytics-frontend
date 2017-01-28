/**
 * @ngdoc controller
 * @name app.modal.controller:AlertModal
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.modal')
		.controller('AlertModal', AlertModal);

  /* @ngInject */
	function AlertModal($modalInstance, name, type, action){
		var vm = this;
        vm.confirm = false;
        vm.name = name;
        vm.type = type;
        vm.action = action;
		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.modal.controller:AlertModal
     * @description
     * My Description rules
     */
    vm.ok = function () {
        vm.confirm = true;
        $modalInstance.close(vm.confirm);
    };

    vm.cancel = function () {
        vm.confirm = false
        $modalInstance.close(vm.confirm);
    };
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
