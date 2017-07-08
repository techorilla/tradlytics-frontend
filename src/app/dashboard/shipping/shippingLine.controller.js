(function () {
    'use strict';
    angular.module('app.dashboard.shipping')
        .controller('ShippingLine', ShippingLine);

    function ShippingLine($state, shipping, toastr, loaderModal, dropDownConfig, $stateParams) {
        var vm = this;
        _init();

        function _init() {
            vm.shippingLineList = [];
            vm.deleteCallback = deleteCallback;
            getShippingLineList();
        }

        function deleteCallback(id){
            var index = _.findIndex(vm.shippingLineList, function(line) { return line.id === id; });
            vm.shippingLineList.splice(index,1);
        }

        function getShippingLineList(){
            loaderModal.open();
            shipping.getShippingLineList().then(function(res){
                if(res.success){
                    vm.shippingLineList = res.list;
                    loaderModal.close();
                }
            })
        }
    }
})();
