
(function() {

    'use strict';

    angular
        .module('app.dashboard.products')
        .factory('shipping', shipping);

    /* @ngInject */
    function shipping(Restangular, apiEndPoints, utilities) {
        var shippingAPI = Restangular.all(apiEndPoints.shipping.main);
        var port = {
            list:[]
        };

        return {
            getShippingPortList: getShippingPortList,
            deleteShippingPort: deleteShippingPort,
            addShippingPort: addShippingPort,
            updateShippingPort: updateShippingPort,
            getPortItemObj: getPortItemObj,
            getNewPortItemObj: getNewPortItemObj,
            shippingPortList: shippingPortList,
            setShippingPortList: setShippingPortList,
            addPortToPortList: addPortToPortList
        };

        function addPortToPortList(portObj){
            port.list.push(portObj)
        }

        function setShippingPortList(portList){
            port.list = portList;
        }

        function shippingPortList(){
            return port.list;
        }

        function getPortItemObj(portId){
            return shippingAPI.customGET(apiEndPoints.shipping.ports+'/'+portId);
        }

        function addShippingPort(portObj){
            return shippingAPI.customPOST({'portObj':portObj},apiEndPoints.shipping.ports);
        }

        function updateShippingPort(portObj){
            return shippingAPI.customPUT({'portObj': portObj}, apiEndPoints.shipping.ports);
        }


        function getNewPortItemObj(){
            return {
                'name': null,
                'loCode': null,
                'contactNo': null,
                'website': null,
                'country': null,
                'countryCode': null
            }
        }

        function getShippingPortList(){
            return shippingAPI.customGET(apiEndPoints.shipping.ports+'/list');
        }

        function deleteShippingPort(portId){
            return shippingAPI.customDELETE(apiEndPoints.shipping.ports+'/'+portId);
        }
    };

})();

