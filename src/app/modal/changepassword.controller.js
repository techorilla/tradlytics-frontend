/**
 * @ngdoc controller
 * @name app.modal.controller:ChangePassword
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.modal')
		.controller('ChangePasswordModal', ChangePassword);

  /* @ngInject */
	function ChangePassword(userId, $modalInstance, inputFields,setup){
		var vm = this;
        init();
        function init(){
            vm.passwordDetails = {
                newPassword: '',
                confirmPassword: '',
                userId: userId
            };
            vm.inputFields = inputFields;
            vm.submitChangePassword = submitChangePassword
        }

        function submitChangePassword(form){
            console.log(form);
            if(form.$valid){

                setup.changePasswordForUser(vm.passwordDetails).then(function(res){
                    if(res.data.success){

                    }
                    $modalInstance.close();
                });
            }
        }



		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.modal.controller:ChangePassword
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
