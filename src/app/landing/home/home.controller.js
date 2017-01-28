(function () {
    'use strict';
    angular.module('app.landing')
        .controller('homeCtrl', homeCtrl);

    function homeCtrl(){
        var vm = this;
        _init();

        function _init(){
            vm.slides = [
                {
                   image: 'http://10pearls.com/wp-content/themes/10pearls-2014/images/slider2016-intro-art.png'
                },
                {
                    image: 'http://10pearls.com/wp-content/themes/10pearls-2014/images/slider2016-staff-acceleration.jpg'
                }
            ]
        }
    }

})();
