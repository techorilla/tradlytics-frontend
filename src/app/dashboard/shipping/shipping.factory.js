
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
            //shipping port
            getShippingPortList: getShippingPortList,
            deleteShippingPort: deleteShippingPort,
            addShippingPort: addShippingPort,
            updateShippingPort: updateShippingPort,
            getPortItemObj: getPortItemObj,
            getNewPortItemObj: getNewPortItemObj,
            shippingPortList: shippingPortList,
            setShippingPortList: setShippingPortList,
            addPortToPortList: addPortToPortList,

            //shipping vessel

            getShippingVesselList: getShippingVesselList,

            //shipping line

            getShippingLineList: getShippingLineList,
            addShippingLine: addShippingLine,
            updateShippingLine: updateShippingLine,
            deleteShippingLine: deleteShippingLine,
            getNewShippingLineObj: getNewShippingLineObj,
            getShippingLineObj: getShippingLineObj

        };

        function getNewShippingLineObj(){
            return {
                'id': null,
                'codeName': '',
                'name': '',
                'website': '',
                'trackingWebsite': '',
                'logo': null,
            }

        }

        function prepareShippingLine(lineObj, imagesData){
            var body = new FormData();
            if(imagesData){
                var file = new File([imagesData.resultBlob], lineObj.name+'.png');
                body.append('logo', file);
            }
            body.append('lineData', JSON.stringify(lineObj));
            return body
        }

        function updateShippingLine(lineObj, imagesData){
            return shippingAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPUT(
                prepareShippingLine(lineObj, imagesData),
                apiEndPoints.shipping.shippingLine,
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function deleteShippingLine(lineId){
            return shippingAPI.customDELETE(apiEndPoints.shipping.shippingLine+'/'+lineId);
        }

        function addShippingLine(lineObj, imagesData){
            return shippingAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPOST(
                prepareShippingLine(lineObj, imagesData),
                apiEndPoints.shipping.shippingLine,
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function getShippingLineObj(shippingLineId){
            console.log(shippingLineId);
            return shippingAPI.customGET(apiEndPoints.shipping.shippingLine,
                {'shippingLineId': shippingLineId});
        }

        function getShippingLineList(){
            return shippingAPI.customGET(apiEndPoints.shipping.shippingLine+'/list');
        }


        function getShippingVesselList(){
            return shippingAPI.customGET(apiEndPoints.shipping.shippingVessel+'/list');
        }


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

