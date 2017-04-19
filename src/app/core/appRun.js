
(function () {

    'use strict';

    angular.module('app.core')
        .config(['$qProvider', '$injector', function($qProvider, $injector){
            $injector.invoke(['$qProvider', function($qProvider) {
                $qProvider.errorOnUnhandledRejections(false);
            }]);
        }])
        .run(onApplicationRun);


    function onApplicationRun(){
        Selectize.define('no-delete', function(options) {
            this.deleteSelection = function() {};
        });
    }

}());
