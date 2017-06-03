(function () {
    'use strict';
    angular.module('app.dashboard.manifest')
        .controller('ManifestDashboard', manifestDashboard);

    function manifestDashboard($state, $timeout, baConfig, manifest, utilities, loaderModal) {
        var vm = this;
        _init();

        function _init() {
            vm.graphData = [];
            vm.chartValues = ['quantity'];
            vm.selectedBuyerID = [];
            vm.selectedSellerID = [];
            vm.selectedProductID = [];
            vm.dateRange = utilities.lastThirtyDaysDateRange();
            vm.transparent = baConfig.theme.blur;
            vm.dashboardColors = baConfig;
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.goToManifestItems = goToManifestItems;
            vm.onBuyersSelectedChanged = onBuyersSelectedChanged;
            vm.onSellersSelectedChanged = onSellersSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            onDateRangeChanged(vm.dateRange);

        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round'
                });
            });
        }

        function onBuyersSelectedChanged(selectedList, initialized){
            vm.selectedBuyerID = _.map(selectedList, 'id');
            if(!initialized){
                getManifestAnalytics(vm.dateRange, vm.selectedBuyerID, vm.selectedSellerID, vm.selectedProductID);
            }
        }

        function onSellersSelectedChanged(selectedList, initialized){
            vm.selectedSellerID = _.map(selectedList, 'id');
            if(!initialized) {
                getManifestAnalytics(vm.dateRange, vm.selectedBuyerID, vm.selectedSellerID, vm.selectedProductID);
            }
        }

        function onProductsSelectedChanged(selectedList, initialized){
            vm.selectedProductID = _.map(selectedList, 'id');
            if(!initialized) {
                getManifestAnalytics(vm.dateRange, vm.selectedBuyerID, vm.selectedSellerID, vm.selectedProductID);
            }
        }

        function goToManifestItems(){
            $state.go('dashboard.manifest');
        }

        function onDateRangeChanged(dateRange){
            vm.dateRange = dateRange;
            getManifestAnalytics(dateRange, vm.selectedBuyerID, vm.selectedSellerID, vm.selectedProductID);

        }

        function getManifestAnalytics(dateRange, selectedBuyerId, selectedSellerId, selectedProductId){
            loaderModal.open();
            vm.showCharts = false;
            manifest.getManifestDashboardReport(dateRange, selectedBuyerId, selectedSellerId, selectedProductId).then(function(res){
                vm.graphData = utilities.prepareGraphData(res.graphData);
                vm.sumData = res.sumData;
                vm.showCharts = true;
                $timeout(function () {
                    loadPieCharts();
                }, 100);
                loaderModal.close();
            });
        }
    }

})();