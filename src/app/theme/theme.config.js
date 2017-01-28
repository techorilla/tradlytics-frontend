/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
    'use strict';

    angular.module('app.theme')
        .config(config);

    /** @ngInject */
    function config(baConfigProvider, colorHelper) {
        baConfigProvider.changeTheme({blur: true});

        baConfigProvider.changeColors({
            default: '#4e4e55',
            defaultText: '#e2e2e2',
        });
    }
})();
