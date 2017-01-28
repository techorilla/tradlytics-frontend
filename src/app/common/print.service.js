(function () {
    'use strict';
    angular
        .module('app.common')
        .service('printPage', printPage);

    /* @ngInject */
    function printPage($window) {
        function print() {
            $('#body-wrap').addClass('print-preview');
            $window.print();
        }

        (function () {
            var beforePrint = function () {
                //console.log('Functionality to run before printing.');
            };
            var afterPrint = function () {
                $('#body-wrap').removeClass('print-preview');
            };

            if (window.matchMedia) {
                var mediaQueryList = window.matchMedia('print');
                mediaQueryList.addListener(function (mql) {
                    if (mql.matches) {
                        beforePrint();
                    } else {
                        afterPrint();
                    }
                });
            }

            window.onbeforeprint = beforePrint;
            window.onafterprint = afterPrint;
        }());
        return {
            print: print
        };
    }

}());
