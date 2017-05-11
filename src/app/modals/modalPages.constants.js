(function(){

    'use strict';
    var modalTemplates = {
        CR_UP_BASIC_DROP_DOWN: 'app/modals/modalTemplates/basicDropDown.html',
        IMAGE_CROP_WINDOW: 'app/modals/modalTemplates/imageCropper.html',
        PRODUCT_SPECS: 'app/dashboard/tradeBook/transaction/templates/productSpecs.html',
        WRAPPER: 'app/modals/modalTemplates/basicWrapper.html'
    };

    angular
        .module('app.dashboard.modals')
        .constant('modalTemplates', modalTemplates);

}());
