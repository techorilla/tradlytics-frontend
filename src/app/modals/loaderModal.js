(function () {
    'use strict';

    angular.module('app.dashboard.modals')
        .factory('loaderModal', loaderModal);


    /** @ngInject */
    function loaderModal($uibModal) {
        var methods = {};
        var progress = 0;
        var max = 100;
        var opened = false;

        return {
            setProgress: function (value) {
                if (value > max) {
                    throw Error('Progress can\'t be greater than max');
                }
                progress = value;
            },
            getProgress: function () {
                return progress;
            },
            open: function() {
                if (!opened) {
                    methods = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/modals/modalTemplates/loaderModal.html',
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static'
                    });
                    opened = true;
                } else {
                    // throw Error('Progress modal opened now');
                }

            },
            close: function() {
                if (opened) {
                    methods.close();
                    opened = false;
                } else {
                    // throw Error('Progress modal is not active');
                }

            }
        };
    }

})();