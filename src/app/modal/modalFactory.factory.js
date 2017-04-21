/**
 * @ngdoc service
 * @name app.modal.alertModalFactory
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.modal')
		.factory('modalFactory', modalFactory);

  /* @ngInject */
  function modalFactory($uibModal){
		return {
            alertModal: alertModal,
            changePassword: changePassword
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.modal.alertModalFactory#testFunction
     * @methodOf app.modal.alertModalFactory
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * alertModalFactory.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

        function changePassword(userId){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'src/setup/changePassword/changePassword.template.html',
                controller: 'ChangePasswordModal as vm',
                size: 'md',
                windowClass: 'marginTopPlus150px',
                resolve:{
                    userId: function(){
                        return userId;
                    }
                }

            });
        }
		function alertModal(name, type, action){
            var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'src/modal/alertmodal.template.html',
                    controller: 'AlertModal as vm',
                    size: 'sm',
                    windowClass: 'marginTopPlus150px',
                    resolve: {
                        name: function () {
                            return name;
                        },
                        type: function(){
                            return type
                        },
                        action: function(){
                           return action
                        }

                    }
                });
            return modalInstance.result.then(function (confirm) {
                return confirm;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }

	}

}());
