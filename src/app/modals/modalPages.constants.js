(function(){

    'use strict';
    var modalTemplates = {
        CR_UP_BASIC_DROP_DOWN: 'app/modals/modalTemplates/basicDropDown.html',
        IMAGE_CROP_WINDOW: 'app/modals/modalTemplates/imageCropper.html',
        PRODUCT_SPECS: 'app/dashboard/tradeBook/transaction/templates/productSpecs.html',
        WRAPPER: 'app/modals/modalTemplates/basicWrapper.html',
        TRADE_COMMISSION_FLOW: 'app/modals/modalTemplates/transactionCashFlow.html',
        TRADE_COMPLETION: 'app/modals/modalTemplates/transactionComplete.html',
        LOCAL_PAYMENT: 'app/modals/modalTemplates/localPayment.html'
    };

    angular
        .module('app.dashboard.modals')
        .constant('modalTemplates', modalTemplates);

}());
