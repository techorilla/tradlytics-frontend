(function () {
    'use strict';
    angular.module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard(completeReport, $state, baSidebarService, $timeout, $filter) {
        var vm = this;
        _init();

        function _init(){
            vm.completeReport=completeReport;
            vm.shipmentTracking = completeReport.trackingData;
            vm.allArrived = _.filter(vm.shipmentTracking , function(ship) { return ship.destinationReached; });
            vm.refreshCurrentDollarRate = refreshCurrentDollarRate;
            vm.goToCurrencyDashboard = goToCurrencyDashboard;
            vm.invertSideBar = invertSideBar;
            prepareDashboard();
        }

        function prepareDashboard(){

        }

        function refreshCurrentDollarRate(){

        }

        function invertSideBar(collapse){
            console.log('hello');
            baSidebarService.setMenuCollapsed(collapse);
        }

        function goToCurrencyDashboard(currencyIn, currencyOut){
            $state.go('dashboard.currencyExchange.dashboard',  {'currencyIn': currencyIn, 'currencyOut': currencyOut});
        }

        function initialize() {


            L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/dist/images';
            var map = L.map(document.getElementById('leaflet-map'),  {
                zoomControl:true
            }).setView([24.8, 67.0], 2);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            _.forEach(vm.shipmentTracking, function(ship){
                console.log(ship);
                var latitude = $filter('latLong')(ship.latitude);
                var longitude = $filter('latLong')(ship.longitude);
                L.marker([longitude, latitude]).addTo(map)
                    .bindPopup('<div class="cursor-pointer" onclick="goToTransactionView('+ship.fileId+')"><div class="fileId">File Id <a>'+ship.fileId+'</a></div>' +
                        '<div class="contractId">Contract Id <a>'+ship.contractId+'</a></div>' +
                        '<div class="seller">Seller <a>'+ ship.seller +'</a></div></div>'+
                        '<div class="seller">Product <a>'+ ship.product +'</a></div></div>'+
                        '<div class="buyer">Buyer <a>'+ ship.buyer +'</a></div></div>'+
                        '<div class="blNo">Shipping Line <a>'+(ship.shippingLine ? ship.shippingLine : 'NA')+'</a></div>'+
                        '<div class="blNo">B/L No. <a>'+(ship.bl ? ship.bl : 'NA')+'</a></div>'+
                        '<div class="vessel">Vessel Name <a>'+(ship.vesselName ? ship.vesselName : 'NA')+'</a></div></div>'+
                        '<div class="dest">Destination <a>'+ ship.portDestination +'</a></div></div>'+
                        '<div class="cont">Containers <a>'+ ship.containers +'</a></div></div>');
            })

        }


        $timeout(function(){
            initialize();
        }, 100);
    }

})();

function goToTransactionView(fileId){
    var win = window.open(window.location.origin+'/#!/dashboard/tradeView/'+fileId, '_blank');
    win.focus();
}
