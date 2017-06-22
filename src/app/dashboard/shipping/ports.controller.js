(function () {
    'use strict';
    angular.module('app.dashboard.shipping')
        .controller('Ports', Ports);

    function Ports($state, shipping, toastr, loaderModal, dropDownConfig, $stateParams) {
        var vm = this;
        _init();


        function deletePort(portItem, portList){
            var index = portList.indexOf(portItem);
            shipping.deleteShippingPort(portItem.id).then(function(response){
                if(response.success){
                    portList.splice(index,1);
                    toastr.success(response.message);
                }
            })
        }

        function editPortItem(){

        }

        function goToShipmentPortForm(state, portId){
            $state.go(state, {'id':portId});
        }

        function _init(){
            vm.portsList = [];
            vm.heading = [
                'LO Code',
                'Name',
                'Country',
                'Contact No',
                'website',
                'Added By',
                'Actions'
            ];

            vm.countryOptions = {};
            vm.countryConfig = {};
            vm.portObj = {};

            if($state.current.name==='dashboard.shipping.ports'){
                vm.portsList = shipping.shippingPortList();
                // if(vm.portsList.length===0){
                loaderModal.open();
                shipping.getShippingPortList().then(function(res){
                    shipping.setShippingPortList(res.allPorts);
                    vm.portsList = res.allPorts;
                    loaderModal.close();
                });
                // }
            }
            else{
                dropDownConfig.prepareCountryDropDown(vm.countryConfig, vm.countryOptions, null, 1);
                if($stateParams.id === 'new'){
                    vm.portObj = shipping.getNewPortItemObj();
                }
                else{
                    shipping.getPortItemObj($stateParams.id).then(function(res){
                        vm.portObj = res.portObj;
                    })
                }

            }

            vm.addPort = addPort;
            vm.updatePort = updatePort;
            vm.deletePort = deletePort;
            vm.goToShipmentPortForm = goToShipmentPortForm;
            vm.cancel = cancel;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;
        }

        function filterChanged(){
            vm.portsToRemove = [];
            angular.forEach(vm.portsList, function(portItem,key){
                var removePort = false;
                removePort = (vm.selectedCountry.indexOf(portItem.country)<=-1);
                if(removePort){
                    vm.portsToRemove.push(portItem.id);
                }
            });
        }

        function onCountrySelectedChanged(selectedList, initialized){
            vm.selectedCountry = _.map(selectedList, 'name');
            if(!initialized) {
                filterChanged();
            }
        }

        function addPort(portForm, portObj){
            if(portForm.$valid){
                shipping.addShippingPort(portObj).then(function(res){
                    if(res.success){
                        // shipping.addPortToPortList(res.portObj);
                        toastr.success(res.message);
                        $state.go('dashboard.shipping.ports');
                    }
                    else{

                        toastr.error(res.message);
                    }
                });
            }
        }

        function updatePort(portForm, portObj){
            if(portForm.$valid){
                shipping.updateShippingPort(portObj).then(function(res){
                    if(res.success){
                        toastr.success(res.message);
                        $state.go('dashboard.shipping.ports');
                    }
                    else{

                        toastr.error(res.message);
                    }
                })
            }

        }

        function cancel(){
            $state.go('dashboard.shipping.ports')
        }
    }

})();

