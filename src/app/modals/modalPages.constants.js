(function(){

    'use strict';
    var modalTemplates = {
        CR_UP_BASIC_DROP_DOWN: 'app/modals/modalTemplates/basicDropDown.html',
        IMAGE_CROP_WINDOW: 'app/modals/modalTemplates/imageCropper.html'
    };

    angular
        .module('app.dashboard.modals')
        .constant('modalTemplates', modalTemplates);

}());
