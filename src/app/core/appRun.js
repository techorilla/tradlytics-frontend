
(function () {

    'use strict';

    angular.module('app.core')
        .run(onApplicationRun);


    function onApplicationRun(){
        Selectize.define('no-delete', function(options) {
            this.deleteSelection = function() {};
        });
    }

}());
